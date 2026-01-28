import SoundClass from './SoundClass.js';
import DefaultExplosion from "./DefaultExplosion.js";

/*
	ExplosionSound class

	Singleton ExplosionSound object, extends SoundClass.

	By Jonathan Leland
	Last Updated 5/2/2022
*/

export default class ExplosionSound extends SoundClass{
	/* Constructor */
	constructor(){
		super();

		if(ExplosionSound.__instance){
			return ExplosionSound.__instance;
		}
		ExplosionSound.__instance = this;

		this.__instance = {}; //ExplosionSound instance

		// Index for playing next explosion sound from pool
		this.__poolIndex = 0;
		this.__poolSize = 4;

		// Default explosion
		this.__defaultExplosionPool = new Array();
		for (let i = 0; i < this.__poolSize; ++i) {
			this.__defaultExplosionPool.push(new DefaultExplosion());
		}
		this.__soundObjects.push(this.__defaultExplosionPool);

		// Connect all sound objects
		for (let i = 0; i < this.__soundObjects.length; ++i) {
			for (let j = 0; j < this.__poolSize; ++j) {
				this.__soundObjects[i][j].connect(this.__output);
			}
		}
	}

	play(){
		this.__soundObjects[this.__activeIndex][this.__poolIndex].play();
		this.__poolIndex = (this.__poolIndex + 1) % this.__poolSize;
	}

	dispose(){
		//TODO: dispose of SoundObjects, then dispose output with super.dispose() ?
	}

	get instance(){
		return this.__instance;
	}

	set instance(instance){
		this.__instance = instance;
	}
}