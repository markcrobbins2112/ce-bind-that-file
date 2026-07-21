---
title: BUILD
---

# BUILD

## Go to...
- ▪[AGENTS.md](AGENTS.md)
- ▪[AILOG.md](AILOG.md)
- ▪[AITASKS.md](AITASKS.md)
- 🔸[BUILD.md](BUILD.md)
- ▪[CODE.md](CODE.md)
- ▪[FEATURES.md](FEATURES.md)
- ▪[MANUAL.md](MANUAL.md)
- ▪[README.md](README.md)
- ▪[SPEC.md](SPEC.md)
- ▪[TESTING.md](TESTING.md)

---

## 🛠 Build Pipeline & Assembly

The **bind-that-file** project employs an ultra-low-overhead, pure JavaScript design. Because it does not use TypeScript for its runtime execution, there is no transpilation phase, eliminating build-time errors and reducing lag during developer iterations.

- **Primary Entrypoint**: `extension.js`
- **Compiler/Bundler**: None required. Node.js with VS Code standard bindings parses raw CommonJS modules natively.
- **Verification Engine**: Command correctness and runtime activation checks are validated using standard VS Code Extension APIs.

---

## 🛰 Actionable Packaging Scripts

The extension includes automated commands inside `package.json` to generate installable `.vsix` binaries:

- **Verification Phase**
  ```bash
  npm run vscode:prepublish
  ```
  Runs a fast check verifying repository fields and settings are configured correctly for shipping/publishing.

- **VSIX Packaging assembly**
  ```bash
  npm run build
  ```
  Runs package assembly via `vsce package` to bundle all runtime assets (e.g. icons, manifests, and documentation) into a deployment-ready `.vsix` binary.

- **Fast Dependency-Free Packaging**
  ```bash
  npm run build:no-deps
  ```
  Optimizes build speed by ignoring external node modules and packaging only key application code using `vsce package --no-dependencies`.

---
## Go back to...
- ▪[AGENTS.md](AGENTS.md)
- ▪[AILOG.md](AILOG.md)
- ▪[AITASKS.md](AITASKS.md)
- 🔸[BUILD.md](BUILD.md)
- ▪[CODE.md](CODE.md)
- ▪[FEATURES.md](FEATURES.md)
- ▪[MANUAL.md](MANUAL.md)
- ▪[README.md](README.md)
- ▪[SPEC.md](SPEC.md)
- ▪[TESTING.md](TESTING.md)