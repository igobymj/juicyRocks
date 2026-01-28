# JuiceCanvas - TODO

## Phase 1: Deployment Preparation

- [x] **Convert absolute paths to relative paths**
  - [x] `index.html` - CSS links (`/styles/...` → `./styles/...`)
  - [x] `index.html` - JS scripts (`/scripts/...` → `./scripts/...`)
  - [x] Audit JS files for any hardcoded absolute paths
  - [x] Test locally to confirm nothing breaks

- [ ] **Deploy to GitHub Pages**
  - [ ] Push changes to main branch
  - [ ] Enable GitHub Pages in repo settings (Settings → Pages → Source: main branch)
  - [ ] Verify site loads at `https://[username].github.io/juiceCanvas/`
  - [ ] Test all functionality works in deployed version
  - [ ] Document the live URL

---

## Phase 2: Architecture Fixes

- [ ] **Fix circular dependencies**
  - [ ] GameSession ↔ GameUpdate circular instantiation
  - [ ] Audit other potential circular refs between managers
  - [ ] Consider lazy initialization or dependency injection

- [ ] **Address singleton overuse**
  - [ ] Identify which singletons are truly necessary
  - [ ] Refactor classes that instantiate GameSession internally
  - [ ] Introduce proper dependency injection where appropriate
  - [ ] Reduce coupling between managers

---

## Phase 3: Project Debugging

- [ ] **Identify and document existing bugs**
  - [ ] Test gameplay thoroughly
  - [ ] Check browser console for errors/warnings
  - [ ] Review commented-out code for incomplete features

- [ ] **Code cleanup**
  - [ ] Remove `_old` suffix files if no longer needed
  - [ ] Remove or complete commented-out HTML sections
  - [ ] Extract magic numbers to constants
  - [ ] Fix InputManager singleton bug (`=` vs `===`)

- [ ] **JuiceManager refactor**
  - [ ] Abstract repetitive DOM event binding
  - [ ] Remove `gameSession` property from DOM elements
  - [ ] Consider data-driven approach for UI bindings

---

## Notes

- Do not proceed to next phase until current phase is verified working
- Test in multiple browsers (Chrome, Firefox, Safari) before considering phase complete
- Keep commits atomic - one logical change per commit
