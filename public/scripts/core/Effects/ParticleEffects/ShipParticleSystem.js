import ShipVectorParticle from "./ShipVectorParticle.js";
import ParticleSystem from "./ParticleSystem.js";
import VectorParticle from "./VectorParticle.js";	

export default class ShipParticleSystem extends ParticleSystem {

    constructor(tag, duration, position, rotation, rateOverTime, intervalTime, loop,vectors) {
        
        super(tag, duration, position, rotation, rateOverTime, intervalTime, loop);
        this.__particleVertices = vectors;
        this.__rotation= rotation;
        this.__strokeWeight = 1;
        
    }

    emit(){
        for(let i=0;i<this.__rateOverTime;i++){
            var duration = 5000;
            var size = 1;
            var color = this.p5.color(255,0,0)
            var position = this.p5.createVector(this.__position.x, this.__position.y);
            var startVelocity = this.p5.createVector(this.p5.random(-1, 1), this.p5.random(-1, 1));
            startVelocity.normalize();
            //this.strokeWeight(1);
            startVelocity.mult(0.01);
            var newVectorParticle = new ShipVectorParticle(duration, size,this.__particleVertices, position, this.__rotation, startVelocity, color);
                
            this.__particles.push(newVectorParticle); 

        }
    }
}