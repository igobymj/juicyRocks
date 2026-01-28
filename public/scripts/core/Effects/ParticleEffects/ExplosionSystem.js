import Explosion from "./Explosion.js";
import ParticleSystem from "./ParticleSystem.js";
import VectorParticle from "./VectorParticle.js";


export default class ExplosionSystem extends ParticleSystem {

    constructor(tag, duration, position, rotation, rateOverTime, intervalTime, loop) {
        super(tag, duration, position, rotation, rateOverTime, intervalTime, loop);
    }

    emit() {
        for (let i = 0; i < this.__rateOverTime; i++){
            // TODO: abstract different types of Particle system and make it configurable --Weiqiang Chen
            /*
            set up the parameters for explosion System
            duration: any, size: any, particleVertices: any,
            position: any, rotation: any, startVelocity: any, startFill: any
            */
            var duration = 300;
            var size = 5;
            var particleVertices = null;
            var position = this.p5.createVector(this.__position.x, this.__position.y);
            var rotation = 0;
            var startVelocity = this.p5.createVector(this.p5.random(-1, 1), this.p5.random(-1, 1));
            startVelocity.normalize();
            startVelocity.mult(0.1);
            var color = this.p5.color('rgb(255,204,2)');  

            var newVectorParticle = new Explosion(duration, size, particleVertices, position, rotation, startVelocity, color);
            
            this.__particles.push(newVectorParticle);
        }

    }

}