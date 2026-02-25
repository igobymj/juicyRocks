# VectorShape — Structured Shape System Proposal

## Problem

The current `VectorGameObject` stores vertices as a flat array of `p5.Vector` points and draws them with `beginShape()`/`endShape()`. This works for simple outlines (asteroids, ships, bullets) but falls short for a 2D platformer where characters need:

- Articulated parts (body, head, limbs) that move independently
- Per-part squash/stretch on land/jump
- Rich primitives beyond polygons (ellipses, rects, beziers)
- Animation (walk cycles, idle, hit reactions)

## Core Idea

Separate **shape definition** (data) from **game object** (behavior). A shape is a tree of named parts, each with its own primitives, anchor point, and runtime transform.

## Shape Definition Format

Pure data, JSON-serializable:

```js
const playerShape = {
    anchor: { x: 0, y: 0 },        // root origin (feet)
    parts: {
        body: {
            anchor: { x: 0, y: -16 },
            primitives: [
                { type: "rect", x: -8, y: -12, w: 16, h: 24, rx: 3 }
            ],
            children: {
                head: {
                    anchor: { x: 0, y: -14 },
                    primitives: [
                        { type: "ellipse", cx: 0, cy: 0, rx: 7, ry: 8 }
                    ]
                },
                armL: {
                    anchor: { x: -8, y: -8 },
                    primitives: [
                        { type: "line", x1: 0, y1: 0, x2: -6, y2: 10 }
                    ]
                },
                armR: {
                    anchor: { x: 8, y: -8 },
                    primitives: [
                        { type: "line", x1: 0, y1: 0, x2: 6, y2: 10 }
                    ]
                }
            }
        },
        legs: {
            anchor: { x: 0, y: 0 },
            primitives: [
                { type: "line", x1: -4, y1: 0, x2: -6, y2: 12 },
                { type: "line", x1: 4, y1: 0, x2: 6, y2: 12 }
            ]
        }
    }
};
```

### Supported Primitive Types

- `rect` — x, y, w, h, optional rx (corner radius)
- `ellipse` — cx, cy, rx, ry
- `line` — x1, y1, x2, y2
- `polygon` — vertices array, optional closed flag
- `bezier` — 4 control points

## VectorShape Class

Owns the shape data, builds a flat lookup of parts by dot-path, renders the tree:

- `part(path)` — returns runtime state for a named part (e.g. `"body"`, `"body.head"`, `"body.armL"`)
- `render(x, y, rotation, scale, strokeColor, alpha)` — walks the part tree, applies per-part transforms
- Each part gets runtime transform state: `offsetX`, `offsetY`, `scaleX`, `scaleY`, `rotation`, `alpha`, `visible`

## Squash/Stretch Usage

```js
// On land:
player.shape.part("body").scaleX = 1.3;
player.shape.part("body").scaleY = 0.7;

// On jump:
player.shape.part("body").scaleX = 0.8;
player.shape.part("body").scaleY = 1.3;

// Lerp back to 1.0 each frame:
const s = part.scaleX;
part.scaleX += (1.0 - s) * 0.15;
```

Because the anchor is at the character's feet, the body squashes upward on landing and stretches upward on jump — correct visual behavior.

## GameObject Hierarchy

```
GameObject (position, rotation, collision)
├── VectorGameObject (existing — flat vertex array, simple shapes)
└── ShapedGameObject (NEW — owns a VectorShape, delegates rendering)
```

`VectorGameObject` stays for simple things (bullets, particles, asteroids). `ShapedGameObject` is for anything needing articulated parts. Collision uses a separate bounds definition (rect or capsule) rather than the visual primitives.

## Animation

Once named parts have transforms, animation is keyframes over those transforms:

```js
const walkCycle = {
    duration: 600, // ms
    loop: true,
    keyframes: {
        "body":      [{ t: 0, offsetY: 0 }, { t: 0.5, offsetY: -2 }, { t: 1, offsetY: 0 }],
        "body.armL": [{ t: 0, rotation: -0.3 }, { t: 0.5, rotation: 0.3 }, { t: 1, rotation: -0.3 }],
        "body.armR": [{ t: 0, rotation: 0.3 }, { t: 0.5, rotation: -0.3 }, { t: 1, rotation: 0.3 }],
        "legs":      [{ t: 0, rotation: 0.2 }, { t: 0.5, rotation: -0.2 }, { t: 1, rotation: 0.2 }]
    }
};
```

An `AnimationPlayer` class lerps between keyframes and writes to part runtime state. Juice effects (squash/stretch, hit reactions) layer on top of animation values.

## File Layout

| Layer | What | Where |
|-------|------|-------|
| Shape definitions | Pure data (JSON-serializable) | `engine/shapes/` or `game/shapes/` |
| `VectorShape` | Parses definitions, renders part trees, exposes `part()` API | `engine/VectorShape.js` |
| `ShapedGameObject` | Owns a VectorShape + collision bounds, extends GameObject | `engine/ShapedGameObject.js` |
| `AnimationPlayer` | Keyframe interpolation, writes to VectorShape parts | `engine/AnimationPlayer.js` |
| Squash/stretch juice | Effector that modifies scaleX/scaleY on a target part | `engine/Effects/` |

## Status

**Parked.** This is a design proposal for when the engine moves beyond Asteroids to a 2D platformer. No implementation yet.
