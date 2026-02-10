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

		this.__bulletSound = new BulletSound(gameSession);
		this.__bulletSound.connect(this.__sfxMix);

		this.__explosionSound = new ExplosionSound(gameSession);
		this.__explosionSound.connect(this.__sfxMix);

		this.__thrusterSound = new ThrusterSound(gameSession);
		this.__thrusterSound.connect(this.__sfxMix);

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

	get instance() {
		return this.__instance;
	}

	set instance(instance) {
		this.__instance = instance;
	}
}
