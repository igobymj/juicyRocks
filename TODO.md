# JuiceCanvas - TODO

## Phase 1: Deployment Preparation

- [x] **Convert absolute paths to relative paths**
  - [x] `index.html` - CSS links (`/styles/...` → `./styles/...`)
  - [x] `index.html` - JS scripts (`/scripts/...` → `./scripts/...`)
  - [x] Audit JS files for any hardcoded absolute paths
  - [x] Test locally to confirm nothing breaks

- [x] **Deploy to GitHub Pages**
  - [x] Push changes to main branch
  - [x] Enable GitHub Pages in repo settings (Settings → Pages → Source: main branch)
  - [x] Verify site loads at `https://igobymj.github.io/juicyRocks/`
  - [x] Test all functionality works in deployed version
  - [x] Document the live URL

---

## Phase 2: Architecture Fixes

- [x] **Fix circular dependencies**
  - [x] GameSession ↔ GameUpdate circular instantiation (GameUpdate now extends Manager)
  - [x] Audit other potential circular refs between managers
  - [x] Consider lazy initialization or dependency injection

- [x] **Address singleton overuse**
  - [x] Identify which singletons are truly necessary
  - [x] Fix InputManager singleton bug (`=` vs `===`)
  - [x] Add singleton to BulletManager, SpriteManager
  - [x] JuiceGuiManager replaces JuiceManager with proper singleton + data-driven UI

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
  - [x] Fix InputManager singleton bug (`=` vs `===`) (done in Phase 2)

- [x] **JuiceManager refactor**
  - [x] Abstract repetitive DOM event binding (replaced by JuiceGuiManager)
  - [x] Remove `gameSession` property from DOM elements (JuiceGuiManager uses schema)
  - [x] Consider data-driven approach for UI bindings (JuiceGuiManager uses schema)

---

## Notes

- Do not proceed to next phase until current phase is verified working
- Test in multiple browsers (Chrome, Firefox, Safari) before considering phase complete
- Keep commits atomic - one logical change per commit
