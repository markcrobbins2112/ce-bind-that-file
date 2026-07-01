<!-- # TEMPLATE: README.template.md -->
<!-- 
# INSTRUCTIONS FOR THE HUMAN DEVELOPER:
# Any text bounded by double curly braces {{like this}} is a placeholder for you to fill out.
# Replace those placeholders with real paths, rules, and project constraints.
#
# INSTRUCTIONS FOR THE AI AGENT:
# This file tracks formal specifications, comparing originally requested guidelines 
# against actual implemented items. Document architectural challenges, optimization rules,
# compatibility constraints, and platform limits.
-->


<!-- markdownlint-disable MD013 -->
# Bind That File

An adaptive, terminal-resilient file navigation engine for VS Code and Cursor. Bind specific files, arrays of files, or wildcards to your favorite keyboard shortcuts without losing focus when working in the terminal.

![icon](icon.jpg)
[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/markcrobbins)

## 📑 AI Primary Files
- 🔹 [AGENTS.md](AGENTS.md)
- 🔹 [ARCHIVE.md](AIMD/ARCHIVE.md)
- 🔹 [BUILD.md](AIMD/BUILD.md)
- 🔹 [CODE.md](AIMD/CODE.md)
- 🔹 [DESIGN.md](AIMD/DESIGN.md)
- 🔹 [FEATURES.md](AIMD/FEATURES.md)
- 🔹 [LOG.md](AIMD/LOG.md)
- 🔹 [MANUAL.md](AIMD/MANUAL.md)
- 🔸 [README.md](README.md)
- 🔹 [SPEC.md](AIMD/SPEC.md)
- 🔹 [TASKS.md](AIMD/TASKS.md)
- 🔹 [TERMS.md](AIMD/TERMS.md)
- 🔹 [TESTING.md](AIMD/TESTING.md)
- 🔹 [VERSIONS.md](AIMD/VERSIONS.md)

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

## 🗺️ Project Layout Blueprint
[[#^toc-blueprint|TOC]]
- **`AGENTS.md`** ➔ System prompts and operational boundaries for AI teammates.
- **`AIMD/ARCHIVE.md`** ➔ Scriptorium for scrapped ideas and sunset components.
- **`AIMD/BUILD.md`** ➔ Compiler pipelines, flags, and packaging steps.
- **`AIMD/CODE.md`** ➔ Syntax style guidelines and error-handling mandates.
- **`AIMD/DESIGN.md`** ➔ Structural topology, design patterns, and data flows.
- **`AIMD/FEATURES.md`** ➔ Capability matrices and functional product roadmap.
- **`AIMD/LOG.md`** ➔ Chronological audit trail of development decisions.
- **`AIMD/MANUAL.md`** ➔ Installation, user runbooks, and diagnostic workflows.
- **`README.md`** ➔ Primary entry point and structural system abstract.
- **`AIMD/SPEC.md`** ➔ Technical constraints, parameters, and protocol definitions.
- **`AIMD/TASKS.md`** ➔ Dynamic task board and backlog management queue.
- **`AIMD/TERMS.md`** ➔ Technical glossary, definitions, and vocabulary indexes.
- **`AIMD/TESTING.md`** ➔ Automation suites, edge cases, and QA assertion routines.
- **`AIMD/VERSIONS.md`** ➔ Change trackers and version milestone evolution lists.

---

## ⚡ Quick Start for AI Developers
[[#^toc-quickstart|TOC]]

### 1. Verify Environment
```cmd
{{Command to test environment variables or prerequisites / e.g., echo %ENV_ROOT%}}
```

### 2. Compile & Run Tests
```cmd
{{High-level system execution command chain / e.g., run_build.bat && run_test.bat}}
```

---
## 🚀 Go to...
[[#^toc-goto|TOC]]
- 🔹 [AGENTS.md](AGENTS.md)
- 🔹 [ARCHIVE.md](AIMD/ARCHIVE.md)
- 🔹 [BUILD.md](AIMD/BUILD.md)
- 🔹 [CODE.md](AIMD/CODE.md)
- 🔹 [DESIGN.md](AIMD/DESIGN.md)
- 🔹 [FEATURES.md](AIMD/FEATURES.md)
- 🔹 [LOG.md](AIMD/LOG.md)
- 🔹 [MANUAL.md](AIMD/MANUAL.md)
- 🔸 [README.md](README.md)
- 🔹 [SPEC.md](AIMD/SPEC.md)
- 🔹 [TASKS.md](AIMD/TASKS.md)
- 🔹 [TERMS.md](AIMD/TERMS.md)
- 🔹 [TESTING.md](AIMD/TESTING.md)
- 🔹 [VERSIONS.md](AIMD/VERSIONS.md)

<!-- # TEMPLATE: README.template.md -->
