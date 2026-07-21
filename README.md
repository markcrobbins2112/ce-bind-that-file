---
title: README
---

<!-- # TEMPLATE: README.template.md -->
<!-- 
# README
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
Bind That File

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

### 4. Mapping Absolute OS File System Paths
You can link directly to a file anywhere on your hard drive, completely independent of whatever project workspace folder you currently have open.
```json
[
  {
    "key": "ctrl+alt+h",
    "command": "bind-that-file.open",
    "args": "C:/_o/__/code-markdown-ai/templates/_/main.md"
  }
]
```

### 5. Mapping Dynamic System Environment Variables
Use local platform context keys to easily navigate right into your active application profiles, cache systems, or machine profile directories across different devices.
```json
[
  {
    "key": "shift+` c",
    "command": "bind-that-file.open",
    "description": "Open Global Settings via Windows Variable",
    "args": "%APPDATA%/Cursor/User/settings.json"
  },
  {
    "key": "shift+` m",
    "command": "bind-that-file.open",
    "description": "Open User Configuration via Mac/Linux Variable",
    "args": "\$HOME/Library/Application Support/Code/User/settings.json"
  }
]
```

### 6. Mapping Absolute Wildcard Glob Search Queries
Combine absolute paths or environment variables with multi-level pattern searches to quickly pull file pickers from folders outside of your open project workspace.
```json
[
  {
    "key": "shift+` a",
    "command": "bind-that-file.open",
    "args": "C:/_o/__/code-markdown-ai/templates/_/**/*.md"
  },
  {
    "key": "shift+` p",
    "command": "bind-that-file.open",
    "args": "%APPDATA%/Cursor/User/snippets/**/*.json"
  }
]
```

### 7. Mapping Object Properties (Alternative Multi-Path Pass)
If you are passing arguments programmatically from another automation script, or using alternative context mapping frameworks, the system natively handles structured objects containing single or multi-target paths.
```json
[
  {
    "key": "ctrl+alt+o",
    "command": "bind-that-file.open",
    "args": {
      "path": "src/services/api.js"
    }
  },
  {
    "key": "ctrl+alt+p",
    "command": "bind-that-file.open",
    "args": {
      "paths": ["package.json", "tsconfig.json"]
    }
  }
]
```

### 🖥️ Integrating with the Integrated Terminal

By default, when you click inside the integrated terminal panel in VS Code or Cursor, the active shell (like PowerShell, Bash, or Zsh) takes total control of your keyboard. This means pressing custom shortcuts while working in the terminal might accidentally send raw characters to your command line instead of triggering your file bindings.

To prevent this key-trapping issue, you can configure your shortcuts using the two methods below.

#### Method A: The Contextual Keybinding Approach (Recommended)
You can duplicate your keybinding in `keybindings.json` and append the `"when": "terminalFocus"` clause to the second block. This instructs the editor to intercept the key chord immediately and route it straight to the extension, even if the terminal is focused:

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

#### Method B: Global Terminal Override (The Bulletproof Solution)
If you prefer to define your shortcuts only once, or if you use complex chord patterns (like `shift+`` ` `a`) that your terminal shell still tries to swallow, you can give the extension absolute priority over the terminal. 

Open your global user `settings.json` file and add the command to the skip shell list:

```json
{
  "terminal.integrated.commandsToSkipShell": [
    "bind-that-file.open"
  ]
}
```

This guarantees that no matter what keyboard shortcut layout you use, the extension will instantly break out of the terminal pane and switch focus to your target files.


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
