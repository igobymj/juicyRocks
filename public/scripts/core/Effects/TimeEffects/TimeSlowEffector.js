/* timeSlow.js



*/

import GameSession from "../../GameSession.js";


export default class TimeSlowEffector {

	constructor(eventName) {

        this.__gameSession = new GameSession();

        //construct this effector object using the juiceSettings object        
        this.__active = this.gameSession.juiceSettings.container[eventName].timeSlow.active;
        this.__scale = this.gameSession.juiceSettings.container[eventName].timeSlow.scale; // float 0.0 to 1.0
        this.__duration = this.gameSession.juiceSettings.container[eventName].timeSlow.duration * 1000; // in seconds

        this.__startTime = this.gameSession.timeManager.unscaledTime;

        this.slowTime(); 

    }

    finished(){
        if( (this.gameSession.timeManager.unscaledTime - this.startTime) >= this.duration) {
			if( this.gameSession.timeManager.timeScale > 1 ) {
				this.gameSession.timeManager.setScale(1.0);
	            return "timeSlow";
			}
			else {
				this.gameSession.timeManager.setScale(this.gameSession.timeManager.timeScale + .03 );
			}
        }
        else {
            return false;
        }
    }

    update() {
    	// this method intentionally left blank
    }

    render() {
    	// this method intentionally left blank
    }

    slowTime() {
    	this.gameSession.timeManager.setScale(this.scale);
    }
	
	
    get active() {
    	return this.__active;
    }

	get duration() {
		return this.__duration;
	}

	get scale () {
		return this.__scale;
	}

	get startTime() {
		return this.__startTime;
	}

	get gameSession() {
		return this.__gameSession;
	}






}

