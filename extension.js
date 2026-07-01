const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const os = require('os');

function activate(context) {
    let disposable = vscode.commands.registerCommand('bind-that-file.open', async function (args) {
        let rawSpecs = [];
        
        // --- ADD THE EXPANSION LAYER HERE ---
        if (typeof args === 'string') {
            rawSpecs = [expandEnvironmentVariables(args)];
        } else if (Array.isArray(args)) {
            rawSpecs = args.map(arg => expandEnvironmentVariables(arg));
        } else if (args && args.path) {
            const pathArr = Array.isArray(args.path) ? args.path : [args.path];
            rawSpecs = pathArr.map(p => expandEnvironmentVariables(p));
        } else if (args && args.paths) {
            const pathsArr = Array.isArray(args.paths) ? args.paths : [args.paths];
            rawSpecs = pathsArr.map(p => expandEnvironmentVariables(p));
        }
        // ------------------------------------

        if (rawSpecs.length === 0) {
            vscode.window.showErrorMessage('Bind That File: No filespecs provided in args.');
            return;
        }

        // ... rest of your existing activation logic continues below

		let rootPath = '';
		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (workspaceFolders && workspaceFolders.length > 0) {
			rootPath = workspaceFolders[0].uri.fsPath || '';
		}

		if (!rootPath) {
			rootPath = os.homedir() || os.tmpdir();
			vscode.window.showWarningMessage(`Bind That File: No workspace folder open. Defaulting relative paths to: ${rootPath}`);
		}

		const normalizedSpecs = rawSpecs.map(spec => {
			if (typeof spec !== 'string') return '';
			if (spec.startsWith('./') || spec.startsWith('.\\')) {
				return spec.substring(2);
			}
			return spec;
		}).filter(Boolean);

		const directFiles = normalizedSpecs.filter(spec => !spec.includes('*'));
		const globPatterns = normalizedSpecs.filter(spec => spec.includes('*'));

		if (Array.isArray(args) || directFiles.length > 1) {
			await handleMultiFileArrayFlow(rootPath, directFiles);
		} else if (directFiles.length === 1) {
			await handleSingleDirectFile(rootPath, directFiles[0]);
		}

		if (globPatterns.length > 0) {
			await handleGlobPatterns(rootPath, globPatterns);
		}
	});

	context.subscriptions.push(disposable);
}

async function handleMultiFileArrayFlow(rootPath, relativePaths) {
	let running = true;

	while (running) {
		const openFilesMap = getOpenFilesMap();
		let openGroup = [];
		let existingGroup = [];
		let missingGroup = [];

		for (const relPath of relativePaths) {
			const absolutePath = path.resolve(rootPath, relPath);
			const exists = fs.existsSync(absolutePath);
			const isOpen = openFilesMap.has(absolutePath);
			const filePayload = { relative: relPath, absolute: absolutePath };

			if (isOpen) {
				openGroup.push(filePayload);
			} else if (exists) {
				existingGroup.push(filePayload);
			} else {
				missingGroup.push(filePayload);
			}
		}

		let items = [];

		if (openGroup.length > 0) {
			items.push({
				label: '$(close) Close Files...',
				description: 'Manage and close active open file tabs',
				action: 'CLOSE_FLOW'
			});
		}
		if (missingGroup.length > 0) {
			items.push({
				label: `$(add) ${missingGroup.length} of uncreated files`,
				description: 'Open picker to create and open missing paths',
				action: 'CREATE_FLOW'
			});
		}

		if (openGroup.length > 0) {
			items.push({ label: 'Open Files', kind: vscode.QuickPickItemKind.Separator });
			for (const file of openGroup) {
				items.push({
					label: `$(file) ${path.basename(file.absolute)}`,
					description: file.relative,
					absolute: file.absolute,
					action: 'OPEN_FILE'
				});
			}
		}

		if (existingGroup.length > 0) {
			items.push({ label: 'Existing Files', kind: vscode.QuickPickItemKind.Separator });
			for (const file of existingGroup) {
				items.push({
					label: `$(file-code) ${path.basename(file.absolute)}`,
					description: file.relative,
					absolute: file.absolute,
					action: 'OPEN_FILE'
				});
			}
		}

		if (items.length === 0) {
			vscode.window.showInformationMessage('Bind That File: No file entries matched.');
			break;
		}

		const selection = await vscode.window.showQuickPick(items, {
			placeHolder: 'Bind That File: Select a file to focus or an action choice'
		});

		if (!selection) {
			running = false;
			break;
		}

		if (selection.action === 'OPEN_FILE') {
			await openAndFocusFile(vscode.Uri.file(selection.absolute));
			running = false;
		} else if (selection.action === 'CLOSE_FLOW') {
			await handleCloseSubPicker(openGroup);
		} else if (selection.action === 'CREATE_FLOW') {
			await handleCreateSubPicker(missingGroup);
		}
	}
}

async function handleCloseSubPicker(openFiles) {
	const items = openFiles.map(file => ({
		label: path.basename(file.absolute),
		description: file.relative,
		absolute: file.absolute
	}));

	const selections = await vscode.window.showQuickPick(items, {
		placeHolder: 'Select open file tabs to close (Space to select, Enter to confirm):',
		canPickMany: true
	});

	if (selections && selections.length > 0) {
		const pathsToClose = new Set(selections.map(s => s.absolute));

		for (const group of vscode.window.tabGroups.all) {
			for (const tab of group.tabs) {
				const fsPath = getFsPathFromTabInput(tab?.input);
				if (fsPath && pathsToClose.has(fsPath)) {
					await vscode.window.tabGroups.close(tab);
				}
			}
		}
	}
}

async function handleCreateSubPicker(missingFiles) {
	const items = missingFiles.map(file => ({
		label: path.basename(file.absolute),
		description: file.relative,
		absolute: file.absolute
	}));

	const selections = await vscode.window.showQuickPick(items, {
		placeHolder: 'Select uncreated files to build and open:',
		canPickMany: true
	});

	if (selections && selections.length > 0) {
		for (const selected of selections) {
			try {
				const parentDir = path.dirname(selected.absolute);
				if (!fs.existsSync(parentDir)) {
					fs.mkdirSync(parentDir, { recursive: true });
				}
				fs.writeFileSync(selected.absolute, '', 'utf8');
				await openAndFocusFile(vscode.Uri.file(selected.absolute));
			} catch (err) {
				vscode.window.showErrorMessage(`Bind That File: Path assembly fault. ${err.message}`);
			}
		}
	}
}

async function handleSingleDirectFile(rootPath, relativePath) {
	const absolutePath = path.resolve(rootPath, relativePath);
	const fileUri = vscode.Uri.file(absolutePath);

	if (fs.existsSync(absolutePath)) {
		await openAndFocusFile(fileUri);
	} else {
		const choice = await vscode.window.showQuickPick(['Create File', 'Cancel'], {
			placeHolder: `File does not exist: "${relativePath}". Create it?`
		});
		if (choice === 'Create File') {
			try {
				const parentDir = path.dirname(absolutePath);
				if (!fs.existsSync(parentDir)) {
					fs.mkdirSync(parentDir, { recursive: true });
				}
				fs.writeFileSync(absolutePath, '', 'utf8');
				await openAndFocusFile(fileUri);
			} catch (err) {
				vscode.window.showErrorMessage(`Bind That File: Fault writing asset. ${err.message}`);
			}
		}
	}
}

// A zero-dependency helper that translates standard wildcards (*, **) into a working RegExp
function globToRegex(pattern) {
	// Normalize all backward slashes to forward slashes first
	let normalized = pattern.replace(/\\/g, '/');
	
	// Escape regular expression special characters except our glob wildcards * and ?
	let escaped = normalized.replace(/[-/\\^$*+?.()|[\]{}]/g, (match) => {
		if (match === '*' || match === '?') return match;
		return '\\' + match;
	});

	// Convert ** into a broad multiline path traversal match
	escaped = escaped.replace(/\*\*/g, '.*');
	
	// Convert single * (without hitting a path boundary / separator)
	escaped = escaped.replace(/(?<!\.)\*/g, '[^/]*');
	
	// Force the expression to firmly check the entire string start-to-finish
	return new RegExp('^' + escaped + '$', 'i');
}

async function handleGlobPatterns(rootPath, patterns) {
	let allMatches = [];
	const openFilesMap = getOpenFilesMap();

	for (const pattern of patterns) {
		// Detect if the pattern is absolute (starts with a drive letter C:/ or root /)
		const isAbsolute = path.isAbsolute(pattern) || /^[a-zA-Z]:/.test(pattern);

		if (isAbsolute) {
			try {
				// Find where the wildcard symbols start so we can establish a base scan directory
				const wildcardIdx = pattern.search(/[*?{]/);
				let baseDir = wildcardIdx !== -1 ? pattern.substring(0, wildcardIdx) : pattern;
				baseDir = path.dirname(baseDir); // Safely back up to the nearest real folder on disk

				if (!fs.existsSync(baseDir)) continue;

				// Recursive function to sweep the local file system manually
				const walkSync = (dir) => {
					const files = fs.readdirSync(dir, { withFileTypes: true });
					let results = [];
					for (const file of files) {
						const resPath = path.join(dir, file.name);
						if (file.isDirectory()) {
							results.push(...walkSync(resPath));
						} else {
							results.push(resPath);
						}
					}
					return results;
				};

				const allFilesOnDisk = walkSync(baseDir);
				
				// Generate our native pure JS matching regular expression
				const regexMatcher = globToRegex(pattern);

				for (const fullPath of allFilesOnDisk) {
					const normalizedPath = fullPath.replace(/\\/g, '/');
					if (regexMatcher.test(normalizedPath)) {
						const fileUri = vscode.Uri.file(fullPath);
						if (!allMatches.some(existing => existing.fsPath === fileUri.fsPath)) {
							allMatches.push(fileUri);
						}
					}
				}
			} catch (err) {
				console.error(`Bind That File: Absolute glob failure: ${err.message}`);
			}
		} else {
			// Standard Relative Path Flow: Fallback safely to the native editor workspace engine
			const matchedUris = await vscode.workspace.findFiles(pattern, '**/node_modules/**');
			if (!matchedUris) continue;

			for (const uri of matchedUris) {
				if (uri && uri.fsPath && !allMatches.some(existing => existing.fsPath === uri.fsPath)) {
					allMatches.push(uri);
				}
			}
		}
	}

	if (allMatches.length === 0) {
		vscode.window.showWarningMessage(`Bind That File: No files matched patterns: ${patterns.join(', ')}`);
		return;
	}

	const pickerItems = allMatches.map(uri => {
		const relativePath = rootPath ? path.relative(rootPath, uri.fsPath) : uri.fsPath;
		const isOpen = openFilesMap.has(uri.fsPath);

		return {
			label: path.basename(uri.fsPath),
			description: relativePath + (isOpen ? ' [Open]' : ''),
			detail: isOpen ? '$(primitive-dot) This file is currently open in an editor tab' : '',
			uri: uri
		};
	});

	const selections = await vscode.window.showQuickPick(pickerItems, {
		placeHolder: 'Select wildcard matches to pull onto active window:',
		canPickMany: true
	});

	if (selections && selections.length > 0) {
		for (const selected of selections) {
			if (selected && selected.uri) {
				await openAndFocusFile(selected.uri);
			}
		}
	}
}

function getFsPathFromTabInput(input) {
	if (!input) return null;
	if (input.uri && typeof input.uri.fsPath === 'string') {
		return input.uri.fsPath;
	}
	if (input.modified && typeof input.modified.fsPath === 'string') {
		return input.modified.fsPath;
	}
	return null;
}

function getOpenFilesMap() {
	const openMap = new Map();
	try {
		if (vscode.window.visibleTextEditors) {
			for (const editor of vscode.window.visibleTextEditors) {
				if (editor?.document?.uri?.fsPath) {
					openMap.set(editor.document.uri.fsPath, true);
				}
			}
		}

		if (vscode.window.tabGroups?.all) {
			for (const group of vscode.window.tabGroups.all) {
				if (!group?.tabs) continue;
				for (const tab of group.tabs) {
					const fsPath = getFsPathFromTabInput(tab?.input);
					if (fsPath) {
						openMap.set(fsPath, true);
					}
				}
			}
		}
	} catch (e) {
		console.error(e);
	}
	return openMap;
}

async function openAndFocusFile(fileUri) {
	if (!fileUri || !fileUri.fsPath) return;
	const targetFsPath = fileUri.fsPath;

	if (vscode.window.visibleTextEditors) {
		for (const editor of vscode.window.visibleTextEditors) {
			if (editor?.document?.uri?.fsPath === targetFsPath) {
				await vscode.window.showTextDocument(editor.document, editor.viewColumn);
				return;
			}
		}
	}

	if (vscode.window.tabGroups?.all) {
		for (const group of vscode.window.tabGroups.all) {
			if (!group?.tabs) continue;
			for (const tab of group.tabs) {
				const fsPath = getFsPathFromTabInput(tab?.input);
				if (fsPath === targetFsPath && tab?.input?.uri) {
					await vscode.window.showTextDocument(tab.input.uri, { viewColumn: group.viewColumn });
					return;
				}
			}
		}
	}

	try {
		const document = await vscode.workspace.openTextDocument(fileUri);
		await vscode.window.showTextDocument(document);
	} catch (e) {
		vscode.window.showErrorMessage(`Bind That File: Error loading file tab. ${e.message}`);
	}
}

// Automatically swaps %VAR% or $VAR with real system values
function expandEnvironmentVariables(targetPath) {
    if (typeof targetPath !== 'string') return targetPath;

    let expanded = targetPath;

    // 1. Resolve Windows style variables: %APPDATA%
    expanded = expanded.replace(/%([^%]+)%/g, (_, name) => {
        return process.env[name] || `%${name}%`; // Fallback to literal if not found
    });

    // 2. Resolve Mac / Linux style variables: $HOME or ${HOME}
    expanded = expanded.replace(/\$([a-zA-Z_][a-zA-Z0-9_]*)/g, (_, name) => {
        return process.env[name] || `$${name}`;
    });
    expanded = expanded.replace(/\$\{([^}]+)\}/g, (_, name) => {
        return process.env[name] || `\${${name}}`;
    });

    return expanded;
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
};
