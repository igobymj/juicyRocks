/*
	SoundManager class

	The singleton SoundManager will act as both a mixer (channels for SFX, music, and individual sounds)
	and sound board (public methods for playing each sound).

	By Jonathan Leland
	Last Updated 2/3/26 by Michael John, aligned with gameSession architecture changes and fixed bugs
*/

import Manager from "./Manager.js";
import BulletSound from "../sounds/BulletSound.js";
import ExplosionSound from "../sounds/ExplosionSound.js";
import ThrusterSound from "../sounds/ThrusterSound.js";
import SampleSoundObject from "../sounds/SampleSoundObject.js";
import MusicManager from "../sounds/MusicManager.js";

export default class SoundManager extends Manager {
	/* Constructor */
	// Initializes main, sfx, and music volume controls, and global effects sends
	constructor(gameSession) {
		if(SoundManager.__instance) {
			return SoundManager.__instance;
		}

		super(gameSession);

		SoundManager.__instance = this;

		this.__instance = {}; //SoundManager instance

		//Mixer channels
		//These base mix channels only have volume and mute (no pan/solo)
		this.__mainMix = new Tone.Volume().toDestination();
		this.__sfxMix = new Tone.Volume().connect(this.__mainMix);
		this.__musicMix = new Tone.Volume(-12).connect(this.__mainMix);

		this.__bulletSound = new BulletSound(gameSession);
		this.__bulletSound.connect(this.__sfxMix);

		this.__explosionSound = new ExplosionSound(gameSession);
		this.__explosionSound.connect(this.__sfxMix);

		this.__thrusterSound = new ThrusterSound(gameSession);
		this.__thrusterSound.connect(this.__sfxMix);

		this.__cheerSound = new SampleSoundObject(gameSession, "media/audio/kids-cheering.mp3");
		this.__cheerSound.connect(this.__sfxMix);

		// Music channel
		this.__musicManager = new MusicManager(gameSession);
		this.__musicManager.connect(this.__musicMix);

		if( this.gameSession.verbose === true) {
			console.log("sound manager created successfully");
		}
	}

	playExplosion() {
		this.__explosionSound.play();
	}

	playThruster() {
		this.__thrusterSound.play();
	}

	stopThruster() {
		this.__thrusterSound.stop();
	}

	playBullet() {
		this.__bulletSound.play();
	}

	changeBullet(newIndex) {
		this.__bulletSound.changeSoundObject(newIndex);
	}

	changeExplosion(newIndex) {
		this.__explosionSound.changeSoundObject(newIndex);
	}

	playCheer() {
		this.__cheerSound.play();
	}

	// Music / Heartbeat methods
	startHeartbeat() {
		this.__musicManager.startHeartbeat();
	}

	stopHeartbeat() {
		this.__musicManager.stopHeartbeat();
	}

	setHeartbeatTempo(bpm) {
		this.__musicManager.setHeartbeatTempo(bpm);
	}

	updateHeartbeatTempo(remainingAsteroids) {
		const BASE_BPM = 60;
		const MAX_BPM = 180;
		const count = remainingAsteroids;
		const bpm = Math.min(MAX_BPM, BASE_BPM + (MAX_BPM - BASE_BPM) / (1 + count * 0.2));
		this.__musicManager.setHeartbeatTempo(bpm);
	}

	playMusic() {
		this.__musicManager.playTrack();
	}

	stopMusic() {
		this.__musicManager.stopTrack();
	}

	setMusicVolume(db) {
		this.__musicMix.volume.value = db;
	}

	get heartbeatPlaying() {
		return this.__musicManager.heartbeat.playing;
	}

	get instance() {
		return this.__instance;
	}

	set instance(instance) {
		this.__instance = instance;
	}
}
