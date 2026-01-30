# JuiceCanvas - Project Guide

## Overview

JuiceCanvas is a web-based Asteroids clone built to demonstrate "juice" - the particles, screen shake, color flashes, and other effects that make games feel responsive and alive. It features an interactive UI for toggling and tweaking juice effects in real-time.

## Tech Stack

- **p5.js** - Canvas rendering, vector drawing, input handling
- **Tone.js** - Web audio synthesis
- **Bootstrap** - UI framework for controls panel
- **Vanilla JS** - No build system, ES6 modules loaded directly

## Running the Project

Open `index.html` in a browser. No build step required. For local development, use a local server to avoid CORS issues with ES6 modules:
```bash
npx serve .
# or
python -m http.server 8000
```

## Architecture

### Three-Layer Structure

```
Presentation (p5.js + Bootstrap UI)
    ↓
Game Logic (Managers + Game Objects)
    ↓
Effects/Juice (JuiceEventManager + Effectors)
```

### Entry Point

`public/scripts/index.js` - p5.js sketch with setup() and draw() loop

### Core Singletons

| Class | File | Purpose |
|-------|------|---------|
| `GameSession` | `core/Managers/GameSession.js` | Central hub holding all manager references |
| `GameUpdate` | `core/GameUpdate.js` | Orchestrates update/render cycle |
| `JuiceSettings` | `core/JuiceSettings.js` | Configuration container for all juice effects |
| `JuiceEventManager` | `core/Managers/JuiceEventManager.js` | Factory for creating/managing juice effects |

### Manager Classes (all in `core/Managers/`)

All inherit from `Manager.js` base class:
- `TimeManager` - Scaled/unscaled/fixed delta time
- `InputManager` - Keyboard state
- `ShipManager`, `AsteroidManager`, `BulletManager` - Entity management
- `SoundManager` - Audio playback
- `JuiceGuiManager` - Schema-driven UI generation, bridges controls to JuiceSettings

### Game Objects (in `game/`)

```
GameObject (base - position, rotation, collision)
├── VectorGameObject (vector-drawn shapes)
│   ├── Ship
│   └── Asteroid
├── SpriteGameObject
└── EllipseGameObject
```

`Bullet` extends `GameObject` directly.

### Juice/Effects System (in `core/Effects/`)

```
core/Effects/
├── ScreenShake/ScreenShakeEffector.js
├── ColorFlash/ColorFlashEffector.js, FlashColor.js
├── TimeEffects/TimeSlowEffector.js
└── ParticleEffects/ (16 files - various particle types)
```

Effects are created via `JuiceEventManager.newEventFactory()` which reads from `JuiceSettings`.

## Key Patterns

### Singleton Pattern
Most managers use `if(ClassName.__instance) return ClassName.__instance` in constructor.

### Factory Pattern
- `JuiceEventManager.newEventFactory()` creates effect instances
- `ParticleSystem.particleEffectFactory()` creates particles from definitions

### Update/Render Separation
All game objects and managers have separate `update()` and `render()` methods.

## File Structure

```
public/scripts/
├── index.js              # p5.js entry point
├── core/
│   ├── Managers/         # 11 manager classes
│   ├── Effects/          # Juice effect implementations
│   ├── sounds/           # Sound wrapper classes
│   ├── GameObject.js     # Base game object
│   ├── VectorGameObject.js
│   ├── SpriteGameObject.js
│   ├── EllipseGameObject.js
│   ├── State.js          # Scene management
│   ├── Collision.js      # Collision utilities
│   ├── JuiceSettings.js  # Effect configuration
│   └── HelperFunctions.js
├── game/
│   ├── states/GameState.js
│   ├── gameplayConstants.js  # Tuning constants (speeds, timers, limits)
│   ├── Ship.js
│   ├── Asteroid.js
│   └── Bullet.js
└── libs/                 # p5.js, Bootstrap
```

## Game Loop Flow

```
p5.draw()
├── TimeManager.update()
├── GameUpdate.update()
│   ├── InputManager.update()
│   ├── BulletManager.update()
│   ├── AsteroidManager.update()
│   ├── Ship.update()
│   └── JuiceEventManager.update()
├── p5.background()
└── GameUpdate.render()
    ├── BulletManager.render()
    ├── Ship.render()
    ├── AsteroidManager.render()
    └── JuiceEventManager.render()
```

## Known Technical Debt

1. **Circular dependencies** - GameSession ↔ GameUpdate create each other
2. **Singleton overuse** - Most classes instantiate GameSession internally instead of DI
3. ~~**JuiceManager bloat** - 200+ lines of manual DOM event binding~~ (deleted; replaced by JuiceGuiManager)
4. ~~**Dead code** - `_old` suffix files, obsolete ParticleManager~~ (all removed)
5. ~~**Magic numbers** - Hardcoded values scattered throughout~~ (extracted to `game/gameplayConstants.js`)
6. ~~**DOM coupling** - JuiceManager attaches `gameSession` property to HTML elements~~ (deleted with JuiceManager)
7. ~~**Asteroid wrapping** - Wraps on center point, looks bad for large asteroids (`Asteroid.js`)~~ (margin-based wrapping using `diagonal/2`)
8. **Ship render override** - Ship.render() redundantly overrides VectorGameObject.render() (`Ship.js:125`)
9. **ColorFlash fade** - Missing exponential fade on color flash effector (`ColorFlashEffector.js:68`)
10. **Particle system abstraction** - ExplosionSystem and SmokeTrailSystem need a shared configurable base class
11. ~~**Sound system disabled** - All SoundManager references commented out; sound classes have unimplemented dispose methods~~ (bullet sound re-enabled; frequency clamp, print() calls, and singleton order fixed; explosion/thruster sounds still disabled)
12. **SpriteManager brittleness** - No error handling for sprite loading (`SpriteManager.js:31`)
13. **SpriteGameObject collision** - Size passed as 0,0; needs manual width/height support
14. **GameSession state management** - `addState()` not safe for non-pre-existing states (`GameSession.js:99`)
15. **Particle definitions inline** - ParticleSystemDefinitions defaults should move to external JSON (`ParticleSystemDefinitions.js:19`)
16. ~~**`_old` suffix files** - Legacy VectorParticle_old.js still in codebase~~ (deleted VectorParticle_old.js and ParticleSystem_old.js)

## Debug Keys (in index.js)

- `i` - Increase time scale
- `o` - Decrease time scale
- `q` - Reset time scale to 1

## Adding New Juice Effects

1. Create effector class in `core/Effects/` with `update()`, `render()`, `finished()` methods
2. Add configuration to `JuiceSettings.js`
3. Add case to `JuiceEventManager.newEventFactory()`
4. Add schema entry in `JuiceGuiManager.js`

## Collision System

`Collision.js` provides static methods:
- `lineToLine()` - Line segment intersection
- `circleToCircle()` - Circle collision (cheap, use first)
- `pointToPolygon()` - Point-in-polygon test
- `polygonToPolygon()` - Full polygon intersection (expensive)

Optimize by checking circle collision before polygon collision.
