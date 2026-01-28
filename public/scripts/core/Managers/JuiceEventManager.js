/* JuiceEvent Manager

Handles both creation/[destruction] of juice effects, and update of the effects

CREATION: takes a juice event by name, uses factory pattern to instantiate the correct effect, 

UPDATE: enumerates 'effectors' array, removes "finished" events from array, and calls effectors' update and render methods

Created 6/15/22 by MJ
Updated: 2/24/24

*/

/* NOTE: This obviates the need for MANAGERs for each type of effect. Each effect's system is fully managed by this manager, which
uses a factory pattern to support a variety of different effects.

Therefore for example, PARTICLEMANAGER is now obsolete

*/


import Manager from "./Manager.js";
import NullGameObject from "../NullGameObject.js";
import ScreenShakeEffector from "../Effects/ScreenShake/ScreenShakeEffector.js";
import ColorFlashEffector from "../Effects/ColorFlash/ColorFlashEffector.js";
import ParticleSystem from "../Effects/ParticleEffects/ParticleSystem.js";
import TimeSlowEffector from "../Effects/TimeEffects/TimeSlowEffector.js";

export default class JuiceEventManager extends Manager {

	constructor() {

		// singleton constructor
		if (JuiceEventManager.__instance) {
            return JuiceEventManager.__instance;
        }
		
		super();
		
        JuiceEventManager.__instance = this;

        this.__effectors = new Array();
        // array of ints to hold number of effects currently in play. Avoids inappropriate stacking of 
        // certain effects. 
        this.__effectSemaphors = [];
        this.__shakeSemaphore = false; // screen shakes should be allowed to complete before another shake is fired

        if( this.gameSession.verbose === true ) {
	        console.log("juice event Manager created successfully");
	    }

	}

	update() {

	    // iterates backwards for removing element in-place when necessary
	    for(let i = this.effectors.length - 1; i >=0; i-- ){
            if(this.effectors[i].finished()){
                this.effectors.splice(i, 1);
            }
            else{
                this.effectors[i].update();
            }
        }
    }

    render() {

	    for(let i = this.effectors.length - 1; i >=0; i-- ){
            this.effectors[i].render();
        }
    }


	//add new effect (push onto array)
	//interface is string, object. String is required, object is optional
	addNew(eventName, triggerObject) {

        // ensure that this event exists
        if( eventName in this.gameSession.juiceSettings.container) {
            // a given event may have more than one effect/system. Iterate through each
            for( let effectName in this.gameSession.juiceSettings.container[eventName] ) {
            	// create an effect object and push it onto effectors[] array
            	if( this.gameSession.juiceSettings.container[eventName][effectName].active === true ) {
					if(effectName === "shake" && this.shakeSemaphore === true) {
						continue;
					}
					else {
	    	        	let effectObject = this.newEventFactory(eventName,effectName,triggerObject);
	            		// hit pause runs its own timer so will not be included in this array (returns null)
	            		if( effectObject != null) {
	            			this.effectors.push(effectObject);
	            		}
	            		this.effectSemaphors[effectName] = true;
	            	}
	            }
            }
            console.log("DEBUG: " + eventName + " juice event added")
        }
        else {
            console.log("ERROR: " + eventName + " event is not defined in juiceSettings");
        }

	}

	// factory function for various effect types
	// object is optionally passed in case its X/Y is important e.g. for particle effects
	newEventFactory(eventName, effectName, triggerObject) {

		switch(effectName) {
			case "shake":
				// only one screen shake effect can be active at a time, and they do not interrupt
//				this.shakeSemaphore = true;
				return new ScreenShakeEffector(eventName, triggerObject);					
				break;
			case "colorFlash":
				return new ColorFlashEffector(eventName);
				break;
			case "particles":
				return new ParticleSystem(eventName,triggerObject);
				break;
			case "hitPause":
				this.gameSession.gameUpdate.delayFrames = this.gameSession.juiceSettings.container[eventName].hitPause.frames;
				return null;
				break;
			case "timeSlow":
				console.log("slowed time");
				return new TimeSlowEffector(eventName);
				break;
			default:
				console.log("error creating effect: " + eventName + " " + effectName);
				return false;
		}
	}

	// getters/setters
	get effectors() {
		return this.__effectors;
	}

	set effectors(effectors) {
		this.__effectors = effectors;
	}

	get effectSemaphors () {
		return this.__effectSemaphors;
	}

	set effectSemaphors(effectSemaphor) {
		this.__effectSemaphors = effectSemaphors;
	}

	get shakeSemaphore() {
		return this.__shakeSemaphore;
	}

	set shakeSemaphore(shakeSemaphore) {
		this.__shakeSemaphore = shakeSemaphore;
	}

}
