import PrimitiveParticle from "./PrimitiveParticle.js";

export default class SmokeTrail extends PrimitiveParticle {

    constructor(duration, position, color, rotation, startVelocity, fill){

        // note: fill color will be manipulated by this class
        super(duration, position, rotation, startVelocity, fill);

        this.__fillColor = color;
        this.__finalColor = this.p5.color(0, 0, 0, 10);
        let initialDiameter = 15;
        this.__diameter = initialDiameter;

    }

    update(){
        //linear fade
        this.__fillColor = this.p5.lerpColor(this.__fillColor, this.__finalColor, (this.__timeManager.time - this.__startTime) / this.__duration );
    }

    render() {
        this.p5.noStroke();
        this.p5.fill(this.__fillColor);
        this.p5.ellipse(this.__position.x, this.__position.y, this.__diameter);
    }

}