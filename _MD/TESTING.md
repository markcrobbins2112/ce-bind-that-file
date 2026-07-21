---
title: TESTING
---

# TESTING
<!--
You can use this interactive test sheet directly with IDX inside VS Code to verify that all systems are fully functional. Put your cursor on these checkbox lines, and use our Quick Actions to mark them done!
-->

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
- ▪️[SPEC.md](SPEC.md)
- 🔸[TESTING.md](TESTING.md)

---
## 🔵 Setup & Environment Check
- [ ] Confirm `package.json` is configured correctly, referencing the raw `extension.js` module inside `"main"`.
- [ ] Install dev dependencies using `npm install` and verify that `npm run build` compiles into a valid installable package.
- [ ] Ensure that keybindings bypass integrations correctly by appending the bypass command `"bind-that-file.open"` to `"terminal.integrated.commandsToSkipShell"` inside user preferences.

## 🟢 Single File Actions
- [ ] Trigger `bind-that-file.open` passing a single string argument pointing to an existing file. Confirm that the editor instantly focuses the file.
- [ ] Trigger `bind-that-file.open` passing a single string pointing to a missing path (e.g., `"nested/non_existent.txt"`). Confirm the editor displays a picker with options: `Create File` and `Cancel`.
- [ ] Click `Create File` and verify that the nested directories and are structured perfectly on disk, and the blank file focuses cleanly.

## ⚡ Multi-File Group Menu Cycles
- [ ] Trigger the command passing an array argument of files. Confirm the multi-stage QuickPick window launches successfully.
- [ ] Verify that open tabs are categorized under `Open Files` separating items visually from non-open files grouped under `Existing Files`.
- [ ] Select any open tab item and ensure that the command redirects window focus to its existing column/viewport, preventing tab duplication.
- [ ] Select any closed file under `Existing Files` and verify that the editor launches and focuses the file tab successfully.

## 🕹️ Close & Create Subflow macros
- [ ] Under the multi-file Picker, click on `Close Files...` action header.
- [ ] Select checkboxes representing active files inside the multiselect checklist and hit Enter. Confirm that target editor tabs terminate instantly.
- [ ] Confirm that upon closing the checklist, the primary selector panel refreshes automatically, updating file groupings dynamically.
- [ ] Under the multi-file Picker, click on `X of uncreated files` action header.
- [ ] Check files on the list, press Enter, and verify that the extension structures parent folders recursively and loads the fresh documents.

## 🚀 Advanced Wildcard Globs
- [ ] Trigger the command passing glob wildcards (e.g., `"src/**/*.test.js"`). Verify that matching options are compiled.
- [ ] Confirm that standard ignore exclusions are respected (i.e. matches inside `node_modules` folders are avoided).
- [ ] Check multiple files inside the multiselect checkbox menu and hit Enter. Confirm all chosen file sheets load onto the workspace screen concurrently.
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
