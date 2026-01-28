// primitiveParticle.js for bitmap (or primitive) particles 
// NOTE: There should be a super class here called Particle which contains things like duration and time manager stuff


import GameObject from "../../GameObject.js";


export default class PrimitiveParticle extends GameObject {

    // float duration in seconds, vector2 position, float width, float height, float rotation in radians, vector2 startVelocity
    constructor(duration, position, width, height, rotation, startVelocity ){

        //defaults
        // Note: these probably don't have collision so these measurements are not necessary, but included anyway
        width = width == 0 ? 1 : width;
        height = height == 0 ? 1 : height;

        // float x, float y, float width, float height, float rotation (radians), float scale, int alpha (between 0 and 255)
        super(position.x, position.y, width, height, rotation, 1, 255);

        this.__timeManager = this.__gameSession.timeManager;
        this.__startTime = this.__timeManager.time;

        this.__duration = duration * 1000; //scale to seconds
        this.__position = position;
        this.__velocity = startVelocity;
        this.__rotation = rotation;

    }

    finished(){
        return (this.__timeManager.time - this.__startTime) >= this.__duration;
    }

    update(){

        if (!this.finished()) {
            //check if at edge of screen; if so, wrap around
            super.wrap();
        }

    }

    render(){
        super.render();
    }

}