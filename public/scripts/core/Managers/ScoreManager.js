/*
ScoreManager

Tracks and renders the player score in the upper-right corner of the canvas.
Supports pulse animation on increment, slot machine count-up effect, and
triggers juice events (floating score numbers, particles at score location).

Score increment timing:
- Flying score ON:  score increments when the flying number reaches the corner
- Flying score OFF: score increments immediately on asteroid hit
Particles spawn from the score when all animation/incrementation is complete.

Created 2/10/26
*/

import Manager from "./Manager.js";

export default class ScoreManager extends Manager {

	constructor(gameSession) {
		if (ScoreManager.__instance) {
			return ScoreManager.__instance;
		}

		super(gameSession);
		ScoreManager.__instance = this;

		this.__score = 0;
		this.__displayScore = 0;
		this.__pulseScale = 1.0;
		this.__margin = 20;

		// Cached from render() so addScore() can compute edge positions
		// without calling p5 text functions during the update phase
		this.__cachedTextW = 0;
		this.__cachedFontSize = 32;

		// Queue of flying scores waiting to arrive: { points, arriveTime, scorePosition }
		this.__pendingFlying = [];

		if (this.gameSession.verbose === true) {
			console.log("score Manager created successfully");
		}
	}

	addScore(asteroid) {
		const juiceSettings = this.gameSession.juiceSettings;
		const juiceFxOn = juiceSettings.container.cheats.juiceFx;

		// Calculate multiplier (only when juice is on)
		const multiplier = juiceFxOn ? juiceSettings.container.cheats.score.multiplier : 1;
		const points = 1 * multiplier;

		// Score text bounding box center (uses cached measurements from render)
		const p = this.p5;
		const fontSize = this.__cachedFontSize;
		const hw = this.__cachedTextW / 2;
		const hh = fontSize / 2;
		const cx = this.gameSession.canvasWidth - this.__margin - hw;
		const cy = this.__margin + hh;

		const scoreCenter = p.createVector(cx, cy);

		// For flying score: find the edge of the score bbox facing the asteroid
		const ax = asteroid.position.x;
		const ay = asteroid.position.y;
		const dx = ax - cx;
		const dy = ay - cy;
		let edgePos = scoreCenter.copy();
		if (dx !== 0 || dy !== 0) {
			const sx = hw > 0 ? hw / Math.abs(dx || 1) : 1;
			const sy = hh > 0 ? hh / Math.abs(dy || 1) : 1;
			const s = Math.min(sx, sy);
			edgePos = p.createVector(cx + dx * s, cy + dy * s);
		}

		// Trigger flying score visual effect — target the nearest edge of the score
		this.gameSession.juiceEventManager.addNew("scoreIncrement", {
			position: p.createVector(ax, ay),
			velocity: p.createVector(0, 0),
			scorePosition: edgePos,
			scoreValue: points
		});

		// Check if flying score is active
		const flyingActive = juiceFxOn
			&& juiceSettings.container.scoreIncrement.floatingScore.active;

		if (flyingActive) {
			// Defer score increment until the flying number arrives
			const duration = juiceSettings.container.scoreIncrement.floatingScore.duration * 1000;
			this.__pendingFlying.push({
				points: points,
				arriveTime: this.gameSession.timeManager.time + duration,
				scorePosition: scoreCenter
			});
		} else {
			// No flying score — increment immediately
			this._applyPoints(points, scoreCenter);
		}
	}

	// Apply points to the actual score, fire particles, and trigger pulse
	_applyPoints(points, scorePosition) {
		const juiceSettings = this.gameSession.juiceSettings;
		const juiceFxOn = juiceSettings.container.cheats.juiceFx;

		this.__score += points;

		// Pulse fires when score actually increments
		if (juiceFxOn && juiceSettings.container.cheats.score.pulse) {
			this.__pulseScale = juiceSettings.container.cheats.score.pulseScale;
		}

		// Particles fire immediately when score increments
		this._fireArriveParticles(scorePosition);

		// If no slot machine, update display immediately
		if (!(juiceFxOn && juiceSettings.container.cheats.score.slotMachine)) {
			this.__displayScore = this.__score;
		}
	}

	update() {
		const juiceSettings = this.gameSession.juiceSettings;
		const juiceFxOn = juiceSettings.container.cheats.juiceFx;
		const now = this.gameSession.timeManager.time;

		// Decay pulse scale back toward 1.0
		if (this.__pulseScale > 1.0) {
			this.__pulseScale *= 0.92;
			if (this.__pulseScale < 1.005) {
				this.__pulseScale = 1.0;
			}
		}

		// Process pending flying scores that have arrived
		for (let i = this.__pendingFlying.length - 1; i >= 0; i--) {
			if (now >= this.__pendingFlying[i].arriveTime) {
				const pending = this.__pendingFlying.splice(i, 1)[0];
				this._applyPoints(pending.points, pending.scorePosition);
			}
		}

		// Slot machine: increment displayScore toward actual score one step per frame
		if (juiceFxOn && juiceSettings.container.cheats.score.slotMachine) {
			if (this.__displayScore < this.__score) {
				this.__displayScore++;
			}
		} else {
			// Keep display in sync when slot machine is off
			this.__displayScore = this.__score;
		}
	}

	render() {
		const p = this.p5;
		const baseFontSize = this.gameSession.juiceSettings.container.cheats.score.fontSize;
		const scoreText = String(this.__displayScore);

		p.push();
		p.resetMatrix();
		p.textFont('Hyperspace');
		p.textSize(baseFontSize);
		p.noStroke();
		p.fill(255);

		// Measure at base size to find the text center, and cache for addScore()
		const textW = p.textWidth(scoreText);
		this.__cachedTextW = textW;
		this.__cachedFontSize = baseFontSize;

		const cx = this.gameSession.canvasWidth - this.__margin - textW / 2;
		const cy = this.__margin + baseFontSize / 2;

		// Scale from the center of the text
		p.translate(cx, cy);
		p.scale(this.__pulseScale);
		p.textAlign(p.CENTER, p.CENTER);
		p.text(scoreText, 0, 0);
		p.pop();
	}

	_fireArriveParticles(scorePosition) {
		this.gameSession.juiceEventManager.addNew("scoreArrive", {
			position: scorePosition,
			velocity: this.p5.createVector(0, 0)
		});
	}

	get score() {
		return this.__score;
	}

	set score(score) {
		this.__score = score;
	}
}
