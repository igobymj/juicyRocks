import Explosion from "./Explosion.js";
import ParticleSystem from "./ParticleSystem.js";
import SmokeTrail from "./SmokeTrail.js";
import VectorParticle from "./VectorParticle.js";


export default class SmokeTrailSystem extends ParticleSystem {

    constructor(tag, duration, position, rotation, rateOverTime, intervalTime, loop) {

        super(tag, duration, position, rotation, rateOverTime, intervalTime, loop);

    }

    emit() {
        for (let i = 0; i < this.__rateOverTime; i++){
            // TODO: abstract a type of Particle system and make it configurable --Weiqiang Chen
            /*
            set up the parameters for explosion System
            duration: any, size: any, particleVertices: any,
            position: any, rotation: any, startVelocity: any, startFill: any
            */
            var duration = 300;
            var position = this.p5.createVector(this.__position.x + this.p5.random(-10, 10), this.__position.y + this.p5.random(-10, 10));
            var color = this.p5.color('rgba(255, 255, 255, 128)');  

            var newVectorParticle = new SmokeTrail(duration, position, color);
            
            this.__particles.push(newVectorParticle);
        }

    }

}