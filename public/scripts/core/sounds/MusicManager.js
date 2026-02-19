/*
	MusicManager class

	Lightweight manager owning the heartbeat synth and a future slot
	for sample-based music tracks. Connects to the music mix bus.
*/

import HeartbeatSound from "./HeartbeatSound.js";

export default class MusicManager {
	constructor(gameSession) {
		this.__gameSession = gameSession;

		// Output node — will be connected to SoundManager's __musicMix
		this.__output = new Tone.Volume();

		// Heartbeat synth
		this.__heartbeat = new HeartbeatSound(gameSession);
		this.__heartbeat.connect(this.__output);

		// Future: sample-based music track
		this.__track = null;
	}

	get heartbeat() {
		return this.__heartbeat;
	}

	startHeartbeat() {
		this.__heartbeat.play();
	}

	stopHeartbeat() {
		this.__heartbeat.stop();
	}

	setHeartbeatTempo(bpm) {
		this.__heartbeat.setTempo(bpm);
	}

	// Future: load and play a sample-based music track
	loadTrack(url) {
		// Placeholder for SampleSoundObject-based track loading
		this.__track = null;
	}

	playTrack() {
		if (this.__track) this.__track.play();
	}

	stopTrack() {
		if (this.__track) this.__track.stop();
	}

	connect(node) {
		this.__output.connect(node);
	}

	dispose() {
		this.__heartbeat.dispose();
		if (this.__track) this.__track.dispose();
		this.__output.dispose();
	}
}
