# Manual

This guide describes the structural architecture, module layout, internal algorithms, optimization behaviors, and technical specifications of the **Bind That File** codebase.
---
## Back to...
- ▪️[AGENTS.md](AGENTS.md)
- ▪️[AILOG.md](AILOG.md)
- ▪️[AITASKS.md](AITASKS.md)
- ▪️[BUILD.md](BUILD.md)
- ▪️[CODE.md](CODE.md)
- ▪️[FEATURES.md](FEATURES.md)
- 🔸[MANUAL.md](MANUAL.md)
- ▪️[README.md](README.md)
- ▪️[SPEC.md](SPEC.md)
- ▪️[TESTING.md](TESTING.md)


## 🏗️ 1. Architecture Overview

The extension utilizes VS Code's extension architecture. Because it is written in pure JavaScript, it does not compile or bundle, enabling direct evaluation by the editor host sandbox.

The workflow path operates as follows:
- **HotKey Trigger**: Keybinding issues `bind-that-file.open` with custom arguments metadata.
- **Spec Resolver**: Evaluates and normalizes parameters, identifying file lists versus wildcard searches.
- **Workspace Tracker**: Queries active workspace paths, visible text editors, and hidden editor tab slots on screen.
- **Controller Loop**: Launches an interactive picker providing file jump states or assembly tools.

```
          [User Key Action]
                 |
                 v
      [Extension Command Handler]
                 |
                 +---> (Glob Patterns) -----> [Glob Match Selector] --> [Open File]
                 |
                 +---> (Explicit File List) -> [Grouping Scanner]
                                                     |
                                                     v
                                            [QuickPick Host Loop] <-------+
                                                     |                     |
                                       +-------------+-------------+       |
                                       |             |             |       |
                                       v             v             v       |
                                  [Open File]   [Close Flow]  [Create Flow] |
                                                     |             |       |
                                                     v             v       |
                                              [Tabs Closed]   [Blank Files] |
                                                     |             |       |
                                                     +-------------+-------+
```

## 🧠 2. Core Modules & Systems

### A. Parameter Parsing Engine
- Handles diverse input interfaces: parses single strings, plain arrays, nested object formats (`args.path` or `args.paths`), or wildcard expressions.
- Scrubs reference strings: cleans parent references `./` and `.\\` to resolve paths inside the workspace natively.

### B. Workspace Tracker & Tab State Engine (`getOpenFilesMap`)
- Inspects `vscode.window.visibleTextEditors` to spot visible file screens.
- Inspects `vscode.window.tabGroups.all` sequentially, scanning each individual tab's input context.
- Handles differences between tab item structures: decodes `input.uri.fsPath` for standard files and scans `input.modified.fsPath` to safely verify modified/dirty files without crashing.

### C. Multi-File Interactive Selector Hub (`handleMultiFileArrayFlow`)
- Executes an interactive picker wrap `while (running)` ensuring that managing files does not dump the user back out into workspace contexts.
- Updates layout categories reactively based on disk checks (`fs.existsSync`) and active trackers.
- Directs menu navigation: separates entries with visual line titles (`Open Files` vs. `Existing Files`) and couples states to target triggers (`OPEN_FILE`, `CLOSE_FLOW`, `CREATE_FLOW`).

### D. File IO & Cleanup Controller (`handleCloseSubPicker`, `handleCreateSubPicker`)
- **Assembly Operations**: Integrates recursive folder creation (`fs.mkdirSync(..., { recursive: true })`) in tandem with synchronous file creation (`fs.writeFileSync`) to configure missing paths with bullet-proof error recovery.
- **Tab Destroyer**: Iterates open tab groups and passes matching document targets to `vscode.window.tabGroups.close` directly.

### E. Deep Glob Search Module (`handleGlobPatterns`)
- Queries workspace directories asynchronously leveraging fast index searching: `vscode.workspace.findFiles(pattern, '**/node_modules/**')`.
- Displays results inside an overlay checkbox menu (`canPickMany: true`), enabling developers to pull complex systems onto the workspace with a single stroke.

## 🔎 3. Core Algorithm

### Intelligent Tab Reuse Jumps (`openAndFocusFile`)
Traditional open operations spawn messy duplicate editor rows if the target file is present in a background/adjacent row. To preserve window hygiene, **Bind That File** targets paths with the following prioritization:

1. **Active/Visible Check**: Scan `vscode.window.visibleTextEditors`. If a column already displays the target path, immediately focus it *in its existing column position* with `vscode.window.showTextDocument(editor.document, editor.viewColumn)`.
2. **Tab Group Seek**: Loop through the tab groups. If the tab input URI matches, pull the target tab directly using `vscode.window.showTextDocument(tab.input.uri, { viewColumn: group.viewColumn })`.
3. **Cold Disk Read**: If the file is completely hidden, trigger a disk read `vscode.workspace.openTextDocument(fileUri)` and introduce it to the active window focus.

This algorithm minimizes tab multiplication, preserving spatial predictability during fast navigation cycles.

## 🛰️ 4. Commands, Keybindings & Context Flags

- **Action Identifier**: `bind-that-file.open`
- **Contributory Arguments**: Accept:
  - String (relative to workspace folder).
  - Array of strings (launches the grouped multi-file QuickPick menu).
  - Glob filters matching standard folder query models.

## 🔧 5. Workspace Build & Configuration
The build stack is optimized for minimal overhead:
- **Transpilation**: None. Built as a pure ESM/CommonJS JavaScript application.
- **Verification Tools**: Verified locally via standard package lint tools.
---
## Go Back to...
- [AGENTS.md](AGENTS.md)
- [AILOG.md](AILOG.md)
- [AITASKS.md](AITASKS.md)
- [BUILD.md](BUILD.md)
- [CODE.md](CODE.md)
- [FEATURES.md](FEATURES.md)
- [MANUAL.md](MANUAL.md)
- [README.md](README.md)
- [SPEC.md](SPEC.md)
- [TESTING.md](TESTING.md)

---
## Go back to...
- ▪️[AGENTS.md](AGENTS.md)
- ▪️[AILOG.md](AILOG.md)
- ▪️[AITASKS.md](AITASKS.md)
- ▪️[BUILD.md](BUILD.md)
- ▪️[CODE.md](CODE.md)
- ▪️[FEATURES.md](FEATURES.md)
- 🔸[MANUAL.md](MANUAL.md)
- ▪️[README.md](README.md)
- ▪️[SPEC.md](SPEC.md)
- ▪️[TESTING.md](TESTING.md)
