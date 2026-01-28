/*
	SoundManager class

	The singleton SoundManager will act as both a mixer (channels for SFX, music, and individual sounds) 
	and sound board (public methods for playing each sound).

	By Jonathan Leland
	Last Updated 5/7/22 by Eddie Melcer
*/

import Manager from "./Manager.js";
import BulletSound from "../sounds/BulletSound.js";
import ExplosionSound from "../sounds/ExplosionSound.js";
import ThrusterSound from "../sounds/ThrusterSound.js";

export default class SoundManager extends Manager {
	/* Constructor */
	// Initializes main, sfx, and music volume controls, and global effects sends
	// TODO: Initialize SoundClasses for each sound
	constructor() {
		if(SoundManager.__instance) {
			return SoundManager.__instance;
		}
		
		super();
		
		SoundManager.__instance = this;

		this.__instance = {}; //SoundManager instance

		//Mixer channels
		//These base mix channels only have volume and mute (no pan/solo)
		this.__mainMix = new Tone.Volume().toDestination();
		this.__sfxMix = new Tone.Volume().connect(this.__mainMix);
		this.__musicMix = new Tone.Volume().connect(this.__mainMix);
	
		// Effects

		// Screen Shake tremolo
		this.__shakeTremolo = new Tone.Tremolo({
			depth: 0.75,
			frequency: 6.666,
			spread: 90,
			type: "triangle",
			wet: 0
		}).connect(this.__mainMix);
		this.__sfxMix.disconnect(this.__mainMix);
		this.__sfxMix.connect(this.__shakeTremolo);
		this.__shakeTimer = {};

		//TODO: Move effect chains into an Effects class?

		//TODO: Array of SoundClasses?

		this.__bulletSound = new BulletSound();
		this.__bulletSound.connect(this.__sfxMix);

		this.__explosionSound = new ExplosionSound();
		this.__explosionSound.connect(this.__sfxMix);

		this.__thrusterSound = new ThrusterSound();
		this.__thrusterSound.connect(this.__sfxMix);

		// TODO: Other sound classes

		// Flag for determining if the thruster sound is already playing
		this.__isThrusting = false;

		if( this.gameSession.verbose === true) {
			console.log("sound manager created successfully");
		}
	}

	//TODO: Update method for disconnecting inactive sound objects?
	// update(){
	// 	this.__bulletSound.update();
	// 	this.__explosionSound.update();
	// 	this.__thrusterSound.update();
	// }

	playBullet() {
		this.__bulletSound.play();
	}

	playExplosion() {
		this.__explosionSound.play();
	}

	playThruster() {
		this.__thrusterSound.play();
		this.__isThrusting = true;
	}

	stopThruster() {
		this.__thrusterSound.stop();
		this.__isThrusting = false;
	}

	changeBullet(newIndex) {
		this.__bulletSound.changeSoundObject(newIndex);
	}

	changeExplosion(newIndex) {
		this.__explosionSound.changeSoundObject(newIndex);
	}

	changeThruster(newIndex) {
		this.__thrusterSound.changeSoundObject(newIndex);
	}

	shakeTremolo(duration) {
		clearTimeout(this.__shakeTimer);
		this.__shakeTremolo.set({ frequency : 6.666 * this.__gameSession.timeManager.timeScale });
		this.__shakeTremolo.start();
		this.__shakeTremolo.wet.linearRampTo(1, 0.05);
		this.__shakeTimer = setTimeout(() => {
			this.__shakeTremolo.wet.linearRampTo(0, 0.2);
			this.__shakeTremolo.stop(0.2);
		}, duration);
	}

	get isThrusting() {
		return this.__isThrusting;
	}

	get instance() {
		return this.__instance;
	}

	set instance(instance) {
		this.__instance = instance;
	}

	// TODO: Do we need getters/setters for the mixer channels, or sound classes?
}