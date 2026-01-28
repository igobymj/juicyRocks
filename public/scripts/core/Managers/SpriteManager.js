// SpriteManager
// Container class for images


export default class SpriteManager {

	constructor() {
		// TODO: create singleton constructor here

		this.__sprites = [];

	}

	// addSprite, takes parameters: string name, p5 image sprite
	addSprite( name, sprite ) {
		this.__sprites[name] = sprite;
	}

	getSprite( name ) {
		return this.__sprites[name];
		//TODO: add error handling, this is brittle
	}



}