// Particle.js for vector particles 
// (we don't have a provision for bitmap particles)


import VectorGameObject from "../../VectorGameObject.js";


export default class VectorParticle extends VectorGameObject {

    //TODO: Eliminate default arguments (apparently not good form in js)
    constructor(duration, size, particleVertices, position, rotation, startVelocity, strokeWeight,fill) {

        // in order to keep Particle abstract, this stuff should be moved into a sub-class. I think that each particle effect should have its own class that can 
        // readily inherit from this Particle class -MJ
        if (size === null) {
            size = 1;
        }
        if (particleVertices === null) {

            particleVertices = [
                { x: -size, y: size },
                { x: size, y: size },
                { x: size, y: -size },
                { x: -size, y: -size },
            ];
        }

        super(position.x, position.y, particleVertices, true, strokeWeight, fill, rotation, 1, 255);

        this.__timeManager = this.__gameSession.timeManager;
        this.__startTime = this.__timeManager.time;

        this.__duration = duration;

        // velocity vector
        this.__position = position;
        this.__velocity = startVelocity;
        this.__rotation = rotation;


        // acceleration vector
        this.__accelerationVector = this.p5.createVector(0, 0);

    }

    finished() {
        return (this.__timeManager.time - this.__startTime) >= this.__duration;
    }

    // something like gravity can change acceleration of particles in runtime
    applyForce(force) {
        this.__accelerationVector = force;
    }

    update() {

        if (!this.finished()) {
            // this changes the velocity by acceleration vector
            this.__velocity.add(this.__accelerationVector);

            // this is for calculating deltaDistance using mult(), but not changing the original velocity
            var tmpVelocity = this.p5.createVector(this.__velocity.x, this.__velocity.y);
            var deltaDistance = tmpVelocity.mult(this.__timeManager.deltaTime);
            this.__position.add(deltaDistance);

            //check if at edge of screen; if so, wrap around
            super.wrap();
        }

    }

    render() {
        super.render();
    }

}