
/* 
	eyeballsEffector.js


	container to render all eyeball objects, based on X/Y of this asteroid, and X/Y of player ship. Takes position and size parameterss
*/


import EllipseGameObject from "../../EllipseGameObject.js";




export default class Eyeballs {

	constructor( gameSession, position, size ) {

		this.__gameSession = gameSession;

		this.__eyeball = new EllipseGameObject( gameSession, position, size, size, 0, 1, 255, "gray", true );

		this.__pupil = new EllipseGameObject( gameSession, position, size/4, size/4, 0, 1, 255, "red", true );

		this.__eyeballSize = size;

	}


	update( x, y ) {
		
		// send X and Y
		this.eyeball.update( x, y );

		// calculate pupil position
		// get a copy of ship's current position
		let shipVector = this.gameSession.shipManager.ship.position.copy();
		let eyeballVector = this.gameSession.p5.createVector(x,y);
		// subtract vectors to get vector that points at ship
		let pupilVector = shipVector.sub(eyeballVector);
		// normalize resulting vector...
		pupilVector.normalize();
		// then multiply it so that it sits in a nice creepy place
		pupilVector.mult(this.__eyeballSize/4);
		// don't forget to actually move the pupil :)
		pupilVector.add(eyeballVector);
		// and finally... update
		this.pupil.update(pupilVector.x, pupilVector.y);

	}


	render() {
		this.eyeball.render();
		this.pupil.render();
	}

	get eyeball() {
		return this.__eyeball;
	}

	get pupil() {
		return this.__pupil;
	}

	get gameSession() {
		return this.__gameSession;
	}

	get eyeballSize() {
		return this.__eyeballSize;
	}




}