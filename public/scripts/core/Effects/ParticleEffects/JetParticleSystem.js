import JetSmoke from "./JetSmoke.js";
import ParticleSystem from "./ParticleSystem.js";




export default class JetParticleSystem extends ParticleSystem {

    constructor(tag, duration, startPosition, startRotation, rateOverTime, intervalTime, loop) {
        super(tag, duration, startPosition, startRotation, rateOverTime, intervalTime, loop);
    }

    emit() {
        for (let i = 0; i < this.__rateOverTime; i++){
            var duration = 100;
            var size = 2;
            var particleVertices = null;
            var rotation = 0;
            var position = this.p5.createVector(this.__position.x, this.__position.y);
            var startOffset = this.p5.createVector(-this.p5.cos(this.__rotation) + this.p5.random(-1, 1) * 0.2, -this.p5.sin(this.__rotation) + this.p5.random(-1, 1) * 0.2);
            startOffset.mult(20);
            position.add(startOffset);
            var startVelocity = this.p5.createVector(this.p5.cos(this.__rotation), this.p5.sin(this.__rotation));
            startVelocity.add(this.p5.createVector(this.p5.random(-0.5, 0.5), this.p5.random(-0.5, 0.5)));
            startVelocity.normalize();
            startVelocity.mult(-0.1);
            var color = this.p5.color('rgb(1,255,255)');  

            var newVectorParticle = new JetSmoke(duration, size, particleVertices, position, rotation, startVelocity, color);

            var force = this.p5.createVector(this.p5.cos(this.__rotation), this.p5.sin(this.__rotation));
            force.normalize();
            force.mult(-0.01);
            newVectorParticle.applyForce(force);
            
            this.__particles.push(newVectorParticle);
        }
    }

}