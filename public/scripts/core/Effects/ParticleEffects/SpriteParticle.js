// Sprite Particle
// For a single sprite particle

import SpriteGameObject from "../../SpriteGameObject.js";


export default class SpriteParticle extends SpriteGameObject {


	/* Constructor */
	// parameters are: particle (must be of type image), float x, float y, float rotation (radians), float scale, p5Vector moveVector, float duration (in seconds) 
	constructor( particleName, x, y, rotation, scale, moveVector, duration, alpha ) {

		super( particleName, x, y, rotation, scale, alpha );

		this.__velocity = moveVector;
		this.__rotationSpeed = rotation;
		this.__duration = duration * 1000;

		this.__startTime = this.gameSession.timeManager.time;

	}

	update( ) {
        if (!this.finished()) {
            //this.__position.add(this.__velocity * this.__timeManager.deltaTime);
            this.__position.add(this.__velocity);
            this.rotation += 30; //this.rotationSpeed;

            //check if at edge of screen; if so, wrap around
            super.wrap();
        }
	}

	render() {
		super.render();
	}

	// All particles must contain this method
	finished() {
        return (this.gameSession.timeManager.time - this.startTime) >= this.duration;
    }

    // getters and setters
	get startTime()  {
		return this.__startTime;
	}

	get duration() {
		return this.__duration;
	}

	get position() {
		return this.__position;
	}

	get velocity() {
		return this.__velocity;
	}

	get rotationSpeed() {
		return this.__rotationSpeed;
	}

	render() {
		super.render();
	}





}
