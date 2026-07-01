# Features

---
## Back to...
- ▪️[AGENTS.md](AGENTS.md)
- ▪️[AILOG.md](AILOG.md)
- ▪️[AITASKS.md](AITASKS.md)
- ▪️[BUILD.md](BUILD.md)
- ▪️[CODE.md](CODE.md)
- 🔸[FEATURES.md](FEATURES.md)
- ▪️[MANUAL.md](MANUAL.md)
- ▪️[README.md](README.md)
- ▪️[SPEC.md](SPEC.md)
- ▪️[TESTING.md](TESTING.md)

Welcome to **Bind That File**!
This guide details all the user-facing capabilities, UI patterns, and commands offered by the extension to optimize keyboard-driven file access.

## Feature Groups

### ⌨️ 1. Terminal-Safe Shortcuts & Arguments Routing
<a id="z202605310314316571" name="z.202605310314316571"></a>
Frees cursor access from terminal terminal traps. High-priority bindings bypass terminal shell captures to trigger instantly from any active panel.
- **[Terminal Whitelisting](#terminal-whitelisting)** - Bypasses integrated terminal intercepts to run actions instantly.
- **[Aesthetic Inputs Parsing](#flexible-arguments-parsing)** - Supports single relative paths, folders, array chains, and wildcard glob syntax.

### 📋 2. Stateful Tab & QuickPick Hub
<a id="z202605310314316572" name="z.202605310314316572"></a>
Integrates direct asset context indicators to categorize navigation targets logically.
- **[Contextual File Grouping](#contextual-file-grouping)** - Automatically segregates paths into "Open Files" vs. "Existing Files".
- **[Aesthetic File Icons](#aesthetic-file-icons)** - Pairs labels with neat VS Code icon stamps (e.g., `$(file)` vs. `$(file-code)`) depending on layout statuses.

### ⚡ 3. On-The-Fly Assembly & Cleanup Macros
<a id="z202605310314316573" name="z.202605310314316573"></a>
Direct action controls right inside the navigation picker to organize workspace layouts on demand.
- **[On-Demand Assembly Creator](#on-demand-assembly-creator)** - Instantly batch-creates and opens any uncreated path specifications.
- **[Refactoring Close sub-picker](#refactoring-close-sub-picker)** - Opens a multi-select checkmark list to quickly wipe unwanted files from editor columns.


## All Features

### Terminal Whitelisting
- Group: [Terminal-Safe Shortcuts & Arguments Routing](#z202605310314316571)
Traditional hotkeys are swallowed when an integrated terminal has focus. **Bind That File** registers a whitelisted bypass hook allowing developers to route key sequences globally. Typing keys inside active CLI panes immediately intercepts command triggers without dropping terminal sessions.

### Flexible Arguments Parsing
- Group: [Terminal-Safe Shortcuts & Arguments Routing](#z202605310314316571)
Supports arguments defined in diverse structures inside `keybindings.json`: raw relative string identifiers, object path bindings (`args.path` / `args.paths`), lists of explicit files, or generic wildcard patterns.

### Contextual File Grouping
- Group: [Stateful Tab & QuickPick Hub](#z202605310314316572)
Avoids losing your active file context. When evaluating path parameters, the navigation model matches paths against active visible editors and loaded tab groups to differentiate files that are already accessible from files currently stored on disk.

### Aesthetic File Icons
- Group: [Stateful Tab & QuickPick Hub](#z202605310314316572)
Presents clean, visual markers inside lists:
- `$(close) Close Files...` represents workspace layout cleanup triggers.
- `$(add) X of uncreated files` represents directory configuration prompts.
- `$(file)` represents files currently active in tab arrays.
- `$(file-code)` identifies existing localized file configurations waiting to be opened.

### On-Demand Assembly Creator
- Group: [On-The-Fly Assembly & Cleanup Macros](#z202605310314316573)
Allows developers to reference files that do not exist yet. Finding missing paths triggers an automatic creation prompt. Selecting it lets you select which files to create inside a sub-picker; the extension then runs recursive folder assembly on disk, initializes a blank text configuration, and focuses it.

### Refactoring Close sub-picker
- Group: [On-The-Fly Assembly & Cleanup Macros](#z202605310314316573)
Maintains editorial tidiness. Clicking 'Close Files...' opens a native multi-select checklist showing active documents. Checking targets and pressing enter targets their corresponding active viewports and shuts down editor tabs seamlessly.

---
## Go Back to...
- ▪️[AGENTS.md](AGENTS.md)
- ▪️[AILOG.md](AILOG.md)
- ▪️[AITASKS.md](AITASKS.md)
- ▪️[BUILD.md](BUILD.md)
- ▪️[CODE.md](CODE.md)
- 🔸[FEATURES.md](FEATURES.md)
- ▪️[MANUAL.md](MANUAL.md)
- ▪️[README.md](README.md)
- ▪️[SPEC.md](SPEC.md)
- ▪️[TESTING.md](TESTING.md)
