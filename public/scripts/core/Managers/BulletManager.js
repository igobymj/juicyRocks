//BulletManager.
//Used to spawn and despawn bullets
//Last modified 5/9/22 MJ

import Manager from "./Manager.js";
import Bullet from "../../game/Bullet.js";
import { AMMO_LIMIT } from "../../game/gameplayConstants.js";

export default class bulletManager extends Manager {

	constructor(gameSession) {
		if(bulletManager.__instance) {
			return bulletManager.__instance;
		}

		super(gameSession);

		bulletManager.__instance = this;

		//Instance Variables
		this.__bullets= new Array(); //holds bullets
		this.__ammoLimit = AMMO_LIMIT;

		if( this.gameSession.verbose === true ) {
			console.log("bullet Manager created successfully");
		}
	}

	//takes vector2 for position, rotation
	fireBullet( position, rotation ) {
        if (this.bullets.length < this.__ammoLimit) {
            this.bullets.push(new Bullet(this.gameSession, position, rotation));
            // TODO: Re-enable when sound is implemented
            // this.gameSession.soundManager.playBullet();
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

	//getters
	get bullets() {
		return this.__bullets;
	}

}
