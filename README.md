# Bind That File

An adaptive, terminal-resilient file navigation engine for VS Code and Cursor. Bind specific files, arrays of files, or wildcards to your favorite keyboard shortcuts without losing focus when working in the terminal.

![icon](icon.jpg)
## Key Features

* 🚀 **Terminal-Safe Shortcuts**: Explicit configuration bypasses terminal shell capture to trigger actions instantly from anywhere.
* 📦 **Flexible Arguments**: Accepts a single string, path arrays, or wildcard globs inside your keybindings file.
* 📑 **Intelligent Tab Management**: Automatically cycles open tab groups to reuse or focus visible assets instead of opening messy, duplicate editor groups.
* 🔄 **Stateful Multi-Stage Pickers**: Offers a cleanly organized, nested selection interface divided into clear context regions (**Open Files** vs. **Existing Files**).
* 🛠️ **On-the-Fly Assembly**: Top-level macro links make it easy to quickly close active groups or batch-create uncreated paths.

---

## Dynamic Menu Flow

When navigating custom multi-file path arrays, the extension organizes entries into separate categories separated by native visual markers:

1. **Quick Utility Toggles** (Placed at the top):
   * `Close Files...`: Opens a secondary checkmark list to quickly close open tabs.
   * `{X} of uncreated files`: Opens a sub-picker to batch-create and open missing paths instantly.
2. **Open Files**: Shows active workspace tabs with a `$(file)` icon indicator.
3. **Existing Files**: Lists valid local paths matching your argument mapping.

*Note: After closing open tabs or generating missing files, the previous menu refreshes automatically so you never lose your place.*

---

## Configuration & Usage

Open your global `keybindings.json` layout panel (`Ctrl+Shift+P` / `Cmd+Shift+P` ➡️ **Preferences: Open Keyboard Shortcuts (JSON)**) and add your custom shortcuts.

### 1. Mapping a Single Explicit File
```json
[
  {
    "key": "ctrl+alt+f",
    "command": "bind-that-file.open",
    "args": "relative.txt"
  },
  {
    "key": "ctrl+alt+f",
    "command": "bind-that-file.open",
    "when": "terminalFocus",
    "args": "relative.txt"
  }
]
```

### 2. Mapping a Complex Array Checklist (Triggers Group Logic)
```json
[
  {
    "key": "ctrl+alt+m",
    "command": "bind-that-file.open",
    "args": ["package.json", "./src/config.js", "docs/README.md"]
  },
  {
    "key": "ctrl+alt+m",
    "command": "bind-that-file.open",
    "when": "terminalFocus",
    "args": ["package.json", "./src/config.js", "docs/README.md"]
  }
]
```

### 3. Mapping Wildcard Glob Search Queries
```json
[
  {
    "key": "ctrl+alt+z",
    "command": "bind-that-file.open",
    "args": "src/**/*.test.js"
  }
]
```

### ⚙️ Important Terminal Whitelisting
To guarantee that the terminal releases your chosen hotkeys instantly, update your global editor `settings.json` file to include the extension command:

```json
"terminal.integrated.commandsToSkipShell": [
    "bind-that-file.open"
]
```

---

## Packaging and Local Installation

1. Install compiler workspace development dependencies:
   ```bash
   npm install
   ```
2. Build the production extension package:
   ```bash
   npm run build
   ```
3. Open the Extensions sidebar view inside your editor (`Ctrl+Shift+X` / `Cmd+Shift+X`).
4. Click the `...` three-dots context action bar at the top right, select **Install from VSIX...**, and load your compiled package.

---
## AI Primary Files
* ▪️[AGENTS.md](AGENTS.md)
* ▪️[AILOG.md](AILOG.md)
* ▪️[AITASKS.md](AITASKS.md)
* ▪️[BUILD.md](BUILD.md)
* ▪️[CODE.md](CODE.md)
* ▪️[FEATURES.md](FEATURES.md)
* ▪️[MANUAL.md](MANUAL.md)
* 🔸[README.md](README.md)
* ▪️[SPEC.md](SPEC.md)
* ▪️[TESTING.md](TESTING.md)
