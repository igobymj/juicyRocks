// generator for vector particles
// the actual array of particles is managed by VectorParticleEffect.js 
// (we don't have a provision for bitmap particles)


import VectorGameObject from "../../VectorGameObject.js";


export default class VectorParticle extends VectorGameObject {

    constructor(gameSession, shape, duration, size, position, rotationSpeed, startVelocity, strokeWeight, fill, fade, particleVertices) {

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

        super(gameSession, position.x, position.y, particleVertices, true, strokeWeight, fill, 0, 1, 255, shape);

        this.__gameSession = gameSession;

        // set up time manager, and record start time
        this.__timeManager = this.__gameSession.timeManager;
        this.__startTime = this.__timeManager.time;

        // duration in milliseconds
        this.__duration = duration;

        // velocity is pixels/second, rotation is rotations (2pi radians)/sec

        startVelocity.mult(.005); // velocity is very large, needs to be scaled
        this.__velocity = startVelocity;
        this.__rotationSpeed = rotationSpeed * .005;
        this.__fade = fade;

        // acceleration vector
        this.__accelerationVector = this.p5.createVector(1.02, 1.02);

    }

    // returns true or false depending on whether the particle's lifetime has exceeded its defined duration
    finished() {
        return (this.__timeManager.time - this.__startTime) >= this.__duration;
    }

    // something like gravity can change acceleration of particles in runtime
    // not currently used though
    applyForce(force) {
        this.__accelerationVector = force;
    }

    update() {

        // this changes the velocity by acceleration vector
        this.velocity.mult(this.__accelerationVector);

        // this is for calculating deltaDistance using mult(), but not changing the original velocity
        let tmpVelocity = this.p5.createVector(this.velocity.x, this.velocity.y);
        let deltaDistance = tmpVelocity.mult(this.gameSession.timeManager.deltaTime);

        this.position.add(deltaDistance);

        this.rotation += (this.rotationSpeed * this.gameSession.timeManager.deltaTime);

        if( this.fade === true) {
            let fadePercent = (this.__timeManager.time - this.__startTime) / this.__duration; 
            this.alpha = 255 - (255 * fadePercent);
        }

        //note that unlike other objects, particles do not wrap
        //super.wrap();

    }

    render() {
        super.render();

    }

    get gameSession() {
        return this.__gameSession;
    }

    get velocity() {
        return this.__velocity;
    }

    get rotationSpeed() {
        return this.__rotationSpeed;
    }

    get position() {
        return this.__position;
    }

    get rotation() {
        return this.__rotation;
    }

    set rotation(rotation) {
        this.__rotation = rotation;
    }

    get fade() {
        return this.__fade;
    }

}