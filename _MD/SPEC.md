---
title: SPEC
---

# SPEC

This document compiles the user requirements and instructions from `AGENTS.md` and provides detailed documentation of how the extension was architected and built.

---
## Back to...
- ▪️[AGENTS.md](AGENTS.md)
- ▪️[AILOG.md](AILOG.md)
- ▪️[AITASKS.md](AITASKS.md)
- ▪️[BUILD.md](BUILD.md)
- ▪️[CODE.md](CODE.md)
- ▪️[FEATURES.md](FEATURES.md)
- ▪️[MANUAL.md](MANUAL.md)
- ▪️[README.md](README.md)
- 🔸[SPEC.md](SPEC.md)
- ▪️[TESTING.md](TESTING.md)

---

## 📋 Originally Requested Specifications

### 1. Application & Identification
- **Identifier name**: `bind-that-file`
- **Primary invocation**: `bind-that-file.open`
- **Design Goals**: Develop a lightning-fast, terminal-safe hotkey routing structure mapping specific keys directly to defined workspace resources without complex configuration.

### 2. File Arguments Specifications
The command arguments payload must gracefully handle multiple schema signatures:
- **String Format**: Single file mapping (`args: "relative.txt"`). Opens the target file directly or offers creation.
- **Array Format**: Direct array of path references (`args: ["pkg.json", "src/main.js"]`). Activates the multi-stage QuickPick selector interface.
- **Object Format**: Supports standard parameters passed via tasks or launcher panels, resolving inputs inside `args.path` or `args.paths` properties.
- **Glob Query Format**: Recognizes wildcard indicators (e.g. `*` or `**/*`) to trigger directory queries via editor workspace scanners.

### 3. Dynamic UI QuickPick Layout Specifications
When an array lists multiple paths, the UI must synthesize a multi-stage QuickPick panel structured as follows:
- **Macro Headers**: Prioritize macro links at the absolute top:
  - `$(close) Close Files...` - allows selective tab teardowns on the active workspace.
  - `$(add) X of uncreated files` - lets users select and instantly batch-create uncreated file paths.
- **Open Files Category**: Displays a visual list of target files currently active inside editor grids/rows, prefixed by `$(file)` indicators.
- **Existing Files Category**: Groups local system copies located on disk that are currently closed, prefixed by `$(file-code)` indicators.

### 4. Custom Terminal Whitelisting Rules & Contexts
To guarantee frictionless terminal usage, the extension requires setting the skip-shell bypass list:
- **Terminal Skip list**: Adding `"terminal.integrated.commandsToSkipShell": ["bind-that-file.open"]` inside VS Code settings prevents the integrated terminal input buffer from intercepting hotkey trigger parameters.

---

## 🛠️ Implementation Details (How We Built It)

### 1. Double-Layer Active Workspace Scanner
To prevent active files from opening as duplicate tab columns, the extension employs a double-layer scanner checking visible document spaces and hidden background tab containers:
- Visible scanner: Inspects `vscode.window.visibleTextEditors` focusing matching layout offsets instantly.
- Background groups scanner: Queries `vscode.window.tabGroups.all` checking active elements. Inspects uri states of active tab inputs, checking both `input.uri` and `input.modified` properties to capture unsaved text pages.

### 2. Multi-Stage Asynchronous Selector Loop
Instead of dropping out of menus when processing secondary file jobs (such as creating empty paths or closing tabs), the extension registers an asynchronous `while (running)` wrapper loop:
- Selecting action triggers (like `CLOSE_FLOW` or `CREATE_FLOW`) prompts secondary multiselect pickers.
- After processing selections, the state metrics are refreshed on disk, and the core Picker displays updated counts automatically without resetting user menus.

---

## 🎯 Implemented Technical Concerns & Optimization Features

- **Decentralized Performance**: Navigating to files is exceptionally lightweight ($O(1)$ memory foot) as it avoids launching heavy background watcher processes or disk-monitoring observers.
- **Robust IO creation boundaries**: Nested folder trees are reconstructed recursively via `fs.mkdirSync(..., { recursive: true })` securely, resolving parent structures safely across different client systems.
- **Multi-OS Normalization**: Strips parent routing (`./` / `.\\`) from relative definitions to normalize routing paths gracefully across Unix, macOS, and Windows.
---
## Go Back to...
- ▪️[AGENTS.md](AGENTS.md)
- ▪️[AILOG.md](AILOG.md)
- ▪️[AITASKS.md](AITASKS.md)
- ▪️[BUILD.md](BUILD.md)
- ▪️[CODE.md](CODE.md)
- ▪️[FEATURES.md](FEATURES.md)
- ▪️[MANUAL.md](MANUAL.md)
- ▪️[README.md](README.md)
- 🔸[SPEC.md](SPEC.md)
- ▪️[TESTING.md](TESTING.md)
