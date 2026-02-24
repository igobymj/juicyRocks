import GameSession from "../engine/GameSession.js";
import AsteroidsGameLoop from "./AsteroidsGameLoop.js";
import AsteroidsJuiceSettings from "./AsteroidsJuiceSettings.js";
import ShipManager from "./Managers/ShipManager.js";
import AsteroidManager from "./Managers/AsteroidManager.js";
import BulletManager from "./Managers/BulletManager.js";
import ScoreManager from "./Managers/ScoreManager.js";
import BulletSound from "./sounds/BulletSound.js";
import ExplosionSound from "./sounds/ExplosionSound.js";
import ThrusterSound from "./sounds/ThrusterSound.js";
import SampleSoundObject from "../engine/sounds/SampleSoundObject.js";
import MusicManager from "./sounds/MusicManager.js";

export default class AsteroidsSession extends GameSession {

	constructor() {
		if (GameSession.__instance) {
			return GameSession.__instance;
		}

		super();

		// Register game-specific managers
		this.registerManager("shipManager", new ShipManager(this));
		this.registerManager("asteroidManager", new AsteroidManager(this));
		this.registerManager("bulletManager", new BulletManager(this));
		this.registerManager("scoreManager", new ScoreManager(this));

		// Register game-specific sounds
		this._setupSounds();

		// Initialize the game loop systems now that all managers are registered
		this.gameLoop.initializeSystems();

		if (this.verbose === true) {
			console.log("Asteroids Session Created Successfully.");
		}
	}

	createGameLoop() {
		return new AsteroidsGameLoop(this);
	}

	createJuiceSettings() {
		return new AsteroidsJuiceSettings();
	}

	_setupSounds() {
		const sm = this.soundManager;

		const bulletSound = new BulletSound(this);
		sm.registerSound("bullet", bulletSound);

		const explosionSound = new ExplosionSound(this);
		sm.registerSound("explosion", explosionSound);

		const thrusterSound = new ThrusterSound(this);
		sm.registerSound("thruster", thrusterSound);

		const cheerSound = new SampleSoundObject(this, "media/audio/kids-cheering.mp3");
		sm.registerSound("cheer", cheerSound);

		const musicManager = new MusicManager(this);
		sm.registerSound("music", musicManager, "music");

		// Add convenience methods to soundManager for backwards compatibility
		sm.playBullet = () => bulletSound.play();
		sm.playExplosion = () => explosionSound.play();
		sm.playThruster = () => thrusterSound.play();
		sm.stopThruster = () => thrusterSound.stop();
		sm.playCheer = () => cheerSound.play();
		sm.changeBullet = (newIndex) => bulletSound.changeSoundObject(newIndex);
		sm.changeExplosion = (newIndex) => explosionSound.changeSoundObject(newIndex);
		sm.startHeartbeat = () => musicManager.startHeartbeat();
		sm.stopHeartbeat = () => musicManager.stopHeartbeat();
		sm.setHeartbeatTempo = (bpm) => musicManager.setHeartbeatTempo(bpm);
		sm.updateHeartbeatTempo = (remainingAsteroids) => {
			const BASE_BPM = 60;
			const bpm = BASE_BPM;
			musicManager.setHeartbeatTempo(bpm);
		};
		sm.playMusic = () => musicManager.playTrack();
		sm.stopMusic = () => musicManager.stopTrack();

		Object.defineProperty(sm, 'heartbeatPlaying', {
			get: () => musicManager.heartbeat.playing
		});
	}
}
