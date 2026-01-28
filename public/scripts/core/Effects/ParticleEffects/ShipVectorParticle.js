// Shipvector particle
// used for when ship explodes
import VectorParticle from "./VectorParticle.js";

export default class ShipVectorParticle extends VectorParticle {
	constructor(duration, size, particleVertices, position, rotation, startVelocity, color){
        var expPosition = position;
        var expRotation = rotation;
   

        if (size === null) {
            size = 1;
        }
        if (particleVertices === null) {

            particleVertices = [
                { x: -size, y: 0 },
                { x: 0, y: 1.4 * size },
                { x: size, y: 0 },
            ];
        }

        var strokeWeight = 1;

        super(duration, size, particleVertices, expPosition, expRotation, startVelocity, true,strokeWeight);
        this.__fillColor = color;
        this.__rotation = rotation;
        //console.log(this.__rotation);
    }

    update() {
        super.update();
        if(this.__rotation>0) this.__rotation+=Math.random()*0.05;
        else if(this.__rotation<0) this.__rotation-=Math.random()*0.05;
        else this.__rotation=0;
        this.__alpha -=  this.__timeManager.timeScale;
    }

}