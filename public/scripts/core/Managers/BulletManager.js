//BulletManager.
//Used to spawn and despawn bullets
//Last modified 5/9/22 MJ

import Manager from "./Manager.js";
import Bullet from "../../game/Bullet.js";

export default class bulletManager extends Manager {

	// TODO: make singleton
	constructor() {
		
		super();

		//Instance Variables
		this.__bullets= new Array(); //holds bullets
		this.__ammoLimit = 4;

		if( this.gameSession.verbose === true ) {
			console.log("bullet Manager created successfully");
		}
	}

	//takes vector2 for position, rotation
	fireBullet( position, rotation ) {
        if (this.bullets.length < this.__ammoLimit) {
            this.bullets.push(new Bullet(position, rotation));
            this.gameSession.soundManager.playBullet();
        }
	}

	update() {
		for(let i = this.bullets.length - 1; i >= 0; i--) {
			if (!this.bullets[i].update()) {
				this.bullets.splice(i,1);
			}			
		}
	}

	render() {
		for(let i=0; i< this.bullets.length; i++ ) {
			this.bullets[i].render();
		}
	}

	// collisionWithAsteroids(asteroidManager){
		
	// 			var newExplosionSystem = new ExplosionSystem(null, 300, tmpPos, tmpRotation, 50, null, false);
	// 			this.__gameSession.particleManager.addParticleSystem(newExplosionSystem);
	// 		}
	// 	}		
	

	//getters
	get bullets() {
		return this.__bullets;
	}

}
