// juiceSettings.js
// container object for all the interactive juice settings in the app, 
// including cheats like invulnerability etc. Works in tandem with JuiceManager.js
// which typically triggers the updateJuice() method. UpdateJuice() is allowed to 
// create new name:value pairs which may or may not be cool.
// created by MJ 6/2/22


export default class JuiceSettings {

	constructor() {

		//singleton
		if(JuiceSettings.__instance) {
			return JuiceSettings.__instance;
		}

		JuiceSettings.__instance = this;

		this.__instance = {};

	    // defaults. These can be overridden from the HTML interface.
	    this.__container = {
	    	cheats : {
	    		ship : {
	    			invincibility: true
	    		}
	    	},
	    	bulletHit : {
	    		particles : {
	    			active:  true,
	    			particleSystem : "bulletHit"
	    		},

	    		shake : {
	    			active : true,
	    			xAxis: false,
	    			yAxis : false,
	    			duration : 0.5, // nominal duration: 0.3 seconds
	    			amplitude : 0.5,
	    			frequency : 10, //cycles per second
	    			form : "simple",
	    			fade : false,
	    			inheritVelocity: false
	    		},
	    		hitPause : {
	    			active : true,
	    			frames : 0
	    		},
	    		colorFlash : {
	    			active: false,
	    			color : "white",
	    			alpha: 200,
	    			duration : 0.5,
	    			stackable: false,
	    			stackWindow: 0.25
	    		},
	    		timeSlow : {
	    			active : false,
	    			scale : 0.25,
	    			duration : 0.1
	    		}
	    	},
	    	destroyShip : {
	    		shake : {
	    			active : true,
	    			xAxis : true,
	    			yAxis : true,
	    			rotation : false,
	    			duration: 2, // nominal duration: 2 seconds
	    			intensity : 0.5,
	    			form : "noise"
	    		},
	    		timeSlow : {
	    			active : false,
	    			scale : 0.1,
	    			duration : 3.5,
	    			stackable : true
	    		}
	    	},
	    	asteroidHit: {
	    		particles: {
	    			active : true,
	    			particleSystem : "asteroidHit" 
	    		}
	    	},
	    	eyeBallsOnAsteroids: {
	    		eyeBalls: {
	    			active : false
	    		}
	    	},
	    	particleTester: {
	    		particles: {
	    			active : true,
	    			particleSystem : "particleTest"
	    		}
	    	}
	    };


	    this.__particleSystems = {
	    	asteroidHit: {
	    		vectorParticle: {
	    			shape : "line",
	    			count : 15,
	    			size: 10,
	    			pattern : "radial",
	    			rotation : "random",
	    			rotationSpeed: 5,
	    			particleLife : 2,
	    			initialVelocityRandom: false,
	    			initialVelocity : 30,
	    			fade : true,
	    			followObject : false,
	    			inheritVelocity : true
	    		}
	    	},
	    	bulletHit: {
	    		vectorParticle: {
	    			shape : "line",
	    			count : 15,
	    			size: 10,
	    			pattern : "radial",
	    			rotation : "random",
	    			rotationSpeed: 5,
	    			particleLife : 2,
	    			initialVelocityRandom: false,
	    			initialVelocity : 30,
	    			fade : true,
	    			followObject : false,
	    			inheritVelocity : false
	    		}
	    	},

	    	particleTest: {
	    		vectorParticle: {
	    			shape : "circle",
	    			count : 15,
	    			size: 10,
	    			pattern : "radial",
	    			rotation : "random",
	    			rotationSpeed: 5,
	    			particleLife : 2,
	    			initialVelocityRandom: false,
	    			initialVelocity : 30,
	    			fade : true,
	    			followObject : false
	    		}
	    	}
	    };

		console.log("default juice settings created");

	}

	// all juice features are based on "events". Generally the form will be string, string, boolean or number
	// in the case of cheats like invulnerability, the "event" is just called "cheats"
	updateJuice(eventName, effectName, effectParameter, status) {

		// if (this exists) 
		this.container[eventName][effectName][effectParameter] = status;

		// probably good to keep this around
		// maybe in time have something like this display at the bottom of the page and fade out?
		// don't print "active" because that is boring
		if( effectParameter != "active") {
			console.log(eventName + " " + effectName + " " + effectParameter + ": " + this.container[eventName][effectName][effectParameter]);
		}

	}

	updateParticleSystem(eventName, effectName, effectParameter, status) {

		this.particleSystems[eventName][effectName][effectParameter] = status;

		console.log(eventName + " " + effectName + " " + effectParameter + ": " + this.particleSystems[eventName][effectName][effectParameter]);
	
	}

	//getters & setters
	get juiceSettings() {
		return this.__juiceSettings;
	}

	set juiceSettings(settings) {
		this.__juiceSettings = settings;
	}

	get container() {
		return this.__container;
	}

	set container( container ) {
		this.__container = container;
	}

	get particleSystems() {
		return this.__particleSystems;
	}

	set particleSystems( particleSystems ) {
		this.__particleSystems = particleSystems;
	}



}
