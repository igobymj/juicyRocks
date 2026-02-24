# JuiceCanvas - Project Guide

## Overview

JuiceCanvas is a web-based Asteroids clone built to demonstrate "juice" - the particles, screen shake, color flashes, and other effects that make games feel responsive and alive. It features an interactive UI for toggling and tweaking juice effects in real-time.

The project separates a reusable **engine** (`engine/`) from the **Asteroids game** (`game/`). The engine provides generic managers, game object types, effects, and a plugin-friendly session/loop architecture. The Asteroids game extends the engine with game-specific managers, sounds, and juice settings.

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

`public/scripts/index.js` - p5.js sketch with setup() and draw() loop. Creates an `AsteroidsSession` (extends engine `GameSession`).

### Engine Singletons (in `engine/`)

| Class | File | Purpose |
|-------|------|---------|
| `GameSession` | `engine/GameSession.js` | Base session hub; creates engine-level managers; extensible via `registerManager()` |
| `GameLoop` | `engine/GameLoop.js` | Base update/render loop with `addUpdateSystem()`/`addRenderSystem()` |
| `JuiceSettings` | `engine/JuiceSettings.js` | Base juice config; extensible via `createDefaultContainer()`/`createDefaultParticleSystems()` |
| `JuiceEventManager` | `engine/Managers/JuiceEventManager.js` | Factory for creating/managing juice effects |

### Game-Specific Classes (in `game/`)

| Class | File | Purpose |
|-------|------|---------|
| `AsteroidsSession` | `game/AsteroidsSession.js` | Extends GameSession; registers game managers and sounds |
| `AsteroidsGameLoop` | `game/AsteroidsGameLoop.js` | Extends GameLoop; registers systems, handles thrust trail and silly colors |
| `AsteroidsJuiceSettings` | `game/AsteroidsJuiceSettings.js` | Extends JuiceSettings with Asteroids-specific events |

### Engine Manager Classes (in `engine/Managers/`)

All inherit from `Manager.js` base class:
- `TimeManager` - Scaled/unscaled/fixed delta time
- `InputManager` - Keyboard state
- `SoundManager` - Base mixer (mainMix, sfxMix, musicMix) with `registerSound()` API
- `SpriteManager` - Sprite loading
- `JuiceEventManager` - Effect factory and lifecycle
- `JuiceGuiManager` - Schema-driven UI generation, bridges controls to JuiceSettings

### Game-Specific Managers (in `game/Managers/`)

- `ShipManager` - Ship entity management
- `AsteroidManager` - Asteroid spawning and lifecycle
- `BulletManager` - Bullet spawning and lifecycle
- `ScoreManager` - Score tracking and display

### Game Objects (in `engine/`)

```
GameObject (base - position, rotation, collision)
├── VectorGameObject (vector-drawn shapes)
│   ├── Ship (game/)
│   ├── Asteroid (game/)
│   └── Bullet (game/)
├── SpriteGameObject
└── EllipseGameObject
```

### Particle Hierarchy (in `engine/Effects/ParticleEffects/`)

```
Particle (lightweight base — no GameObject inheritance)
├── VectorParticle (draws shapes via direct p5 calls)
└── SpriteParticle (draws sprite images via direct p5 calls)
```

### Juice/Effects System (in `engine/Effects/`)

```
engine/Effects/
├── ScreenShake/ScreenShakeEffector.js
├── ColorFlash/ColorFlashEffector.js, FlashColor.js
├── TimeEffects/TimeSlowEffector.js
├── Deconstruct/DeconstructEffector.js
├── Score/FloatingScoreEffector.js
└── ParticleEffects/ (Particle base, VectorParticle, SpriteParticle, VectorParticleEffect, ParticleSystem, ParticleSystemDefinitions)
```

Effects are created via `JuiceEventManager.newEventFactory()` which reads from `JuiceSettings`.

### Sound System

```
engine/sounds/
├── SoundObject.js         # Base class (Tone.PanVol + Envelope)
├── SoundClass.js          # Container for multiple SoundObjects
└── SampleSoundObject.js   # Tone.Player wrapper

game/sounds/
├── BulletSound.js, DefaultBullet.js, AlternateBullet.js
├── ExplosionSound.js, DefaultExplosion.js
├── ThrusterSound.js, DefaultThruster.js
├── HeartbeatSound.js
└── MusicManager.js
```

## Key Patterns

### Singleton Pattern
Most managers use `if(ClassName.__instance) return ClassName.__instance` in constructor.

### Extensible Session Pattern
`GameSession` provides `registerManager(name, manager)` for games to add custom managers. `AsteroidsSession` uses this to register ShipManager, AsteroidManager, etc.

### System Registration Pattern
`GameLoop` provides `addUpdateSystem(name, system, priority)` and `addRenderSystem()` for games to define their update/render order.

### Factory Pattern
- `JuiceEventManager.newEventFactory()` creates effect instances
- `ParticleSystem.particleEffectFactory()` creates particles from definitions

### Update/Render Separation
All game objects and managers have separate `update()` and `render()` methods.

## File Structure

```
public/scripts/
├── index.js                 # p5.js entry point (creates AsteroidsSession)
├── engine/                  # Reusable engine
│   ├── Engine.js            # Barrel export
│   ├── GameSession.js       # Extensible session hub
│   ├── GameLoop.js          # Extensible update/render loop
│   ├── JuiceSettings.js     # Extensible juice config
│   ├── State.js             # Scene management
│   ├── GameObject.js        # Base game object
│   ├── VectorGameObject.js
│   ├── SpriteGameObject.js
│   ├── EllipseGameObject.js
│   ├── NullGameObject.js
│   ├── Collision.js
│   ├── HelperFunctions.js
│   ├── Managers/            # Engine managers
│   │   ├── Manager.js
│   │   ├── TimeManager.js
│   │   ├── InputManager.js
│   │   ├── SoundManager.js
│   │   ├── SpriteManager.js
│   │   ├── JuiceEventManager.js
│   │   └── JuiceGuiManager.js
│   ├── Effects/             # All effect implementations
│   │   ├── ScreenShake/
│   │   ├── ColorFlash/
│   │   ├── TimeEffects/
│   │   ├── Deconstruct/
│   │   ├── Score/
│   │   └── ParticleEffects/
│   └── sounds/              # Base sound classes
│       ├── SoundObject.js
│       ├── SoundClass.js
│       └── SampleSoundObject.js
├── game/                    # Asteroids-specific code
│   ├── AsteroidsSession.js  # Extends GameSession
│   ├── AsteroidsGameLoop.js # Extends GameLoop
│   ├── AsteroidsJuiceSettings.js
│   ├── Ship.js
│   ├── Asteroid.js
│   ├── Bullet.js
│   ├── gameplayConstants.js
│   ├── states/GameState.js
│   ├── Managers/
│   │   ├── ShipManager.js
│   │   ├── AsteroidManager.js
│   │   ├── BulletManager.js
│   │   └── ScoreManager.js
│   ├── sounds/
│   │   ├── BulletSound.js, DefaultBullet.js, AlternateBullet.js
│   │   ├── ExplosionSound.js, DefaultExplosion.js
│   │   ├── ThrusterSound.js, DefaultThruster.js
│   │   ├── HeartbeatSound.js
│   │   └── MusicManager.js
│   └── Effects/
│       └── Eyeballs.js
└── libs/                    # p5.js, Bootstrap
```

## Game Loop Flow

```
p5.draw()
├── TimeManager.update()
├── AsteroidsGameLoop.update()
│   ├── InputManager.update()
│   ├── BulletManager.update()
│   ├── AsteroidManager.update()
│   ├── Ship.update()
│   ├── Thrust Trail (particle spawning)
│   ├── JuiceEventManager.update()
│   └── ScoreManager.update()
├── p5.background()
└── AsteroidsGameLoop.render()
    ├── Silly Colors (color overrides)
    ├── BulletManager.render()
    ├── Ship.render()
    ├── AsteroidManager.render()
    ├── JuiceEventManager.render()
    └── ScoreManager.render()
```

## Known Technical Debt

1. ~~**Circular dependencies** - GameSession ↔ GameUpdate create each other~~ (resolved: GameSession.createGameLoop() factory method)
2. **Singleton overuse** - Most classes instantiate GameSession internally instead of DI
3. ~~**JuiceManager bloat** - 200+ lines of manual DOM event binding~~ (deleted; replaced by JuiceGuiManager)
4. ~~**Dead code** - `_old` suffix files, obsolete ParticleManager~~ (all removed)
5. ~~**Magic numbers** - Hardcoded values scattered throughout~~ (extracted to `game/gameplayConstants.js`)
6. ~~**DOM coupling** - JuiceManager attaches `gameSession` property to HTML elements~~ (deleted with JuiceManager)
7. ~~**Asteroid wrapping** - Wraps on center point, looks bad for large asteroids (`Asteroid.js`)~~ (margin-based wrapping using `diagonal/2`)
8. **Ship render override** - Ship.render() redundantly overrides VectorGameObject.render() (`Ship.js:125`)
9. **ColorFlash fade** - Missing exponential fade on color flash effector (`ColorFlashEffector.js:68`)
10. ~~**Particle system abstraction** - ExplosionSystem and SmokeTrailSystem need a shared configurable base class~~ (lightweight `Particle` base class created; VectorParticle/SpriteParticle extend it directly; dead particle files deleted)
11. ~~**Sound system disabled** - All SoundManager references commented out; sound classes have unimplemented dispose methods~~ (bullet sound re-enabled; frequency clamp, print() calls, and singleton order fixed; explosion/thruster sounds still disabled)
12. **SpriteManager brittleness** - No error handling for sprite loading (`SpriteManager.js:31`)
13. **SpriteGameObject collision** - Size passed as 0,0; needs manual width/height support
14. **GameSession state management** - `addState()` not safe for non-pre-existing states (`GameSession.js:99`)
15. **Particle definitions inline** - ParticleSystemDefinitions defaults should move to external JSON (`ParticleSystemDefinitions.js:19`)
16. ~~**`_old` suffix files** - Legacy VectorParticle_old.js still in codebase~~ (deleted VectorParticle_old.js and ParticleSystem_old.js)
17. **TimeManager game dependency** - TimeManager imports DEFAULT_FRAME_RATE/DEFAULT_FIXED_RATE from game/gameplayConstants.js; these engine-level constants should live in engine/

## Controls

- **Move:** Arrow Keys / WASD (rotate left/right, thrust forward)
- **Fire:** Enter / Shift

### Debug Keys (in index.js)

- `0` - Reset time scale to 1
- `=` - Increase time scale by 0.1
- `-` - Decrease time scale by 0.05

## Adding New Juice Effects

1. Create effector class in `engine/Effects/` with `update()`, `render()`, `finished()` methods
2. Add configuration to your game's JuiceSettings subclass (e.g. `AsteroidsJuiceSettings.js`)
3. Add case to `JuiceEventManager.newEventFactory()` (or register via the effectTypes map)
4. Add schema entry in `JuiceGuiManager.js`

## Building a New Game on the Engine

1. Create a session class extending `GameSession` (see `AsteroidsSession.js`)
2. Create a game loop extending `GameLoop` (see `AsteroidsGameLoop.js`)
3. Create juice settings extending `JuiceSettings` (see `AsteroidsJuiceSettings.js`)
4. Register your managers via `this.registerManager(name, manager)` in your session
5. Register your systems via `addUpdateSystem()`/`addRenderSystem()` in your game loop
6. Import your session class in `index.js` instead of `AsteroidsSession`

## Collision System

`Collision.js` provides static methods:
- `lineToLine()` - Line segment intersection
- `circleToCircle()` - Circle collision (cheap, use first)
- `pointToPolygon()` - Point-in-polygon test
- `polygonToPolygon()` - Full polygon intersection (expensive)

Optimize by checking circle collision before polygon collision.
