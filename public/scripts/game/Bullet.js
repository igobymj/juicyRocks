import VectorGameObject from "../core/VectorGameObject.js";


export default class Bullet extends VectorGameObject {
    constructor(gameSession, shipPosition, shipRotation) {
        //create VectorGameObject using above verts, and X/Y from instantiation
		let bulletVertices = [
            { x: -.5, y: -.5 },
            { x: .5, y: -.5 },
            { x: .5, y: .5 },
            { x: -.5, y: .5 },
        ];

        super(gameSession, shipPosition.x, shipPosition.y, bulletVertices, true, 1, true, shipRotation, 1, 255);
        
        // velocity vector
        this.__position = this.p5.createVector(shipPosition.x, shipPosition.y);

        this.__velocity = p5.Vector.fromAngle(shipRotation,1);
        this.__startTime = this.gameSession.timeManager.time;
        this.__duration = 800;

    }

    timeOut(){
        return (this.gameSession.timeManager.time - this.__startTime) >= this.__duration;
    }

    // update will return false if it's destroyed or times out, returns true if it continues
    update() {
        if (!this.timeOut()) {
            // move the Bullet, using the velocity vector
            var tmpVel = this.p5.createVector(this.velocity.x, this.velocity.y);
            var deltaDistance = tmpVel.mult(this.gameSession.timeManager.deltaTime);

            this.position.add(deltaDistance);

            if(this.gameSession.asteroidManager.collide(this,true)) {
                // add juice effects!
                this.gameSession.gameUpdate.delayFrames = 3;
                this.gameSession.juiceEventManager.addNew("bulletHit", this);
                //return false if it hit an asteroid
                return false;
            }

            // wrapping: check for Bullet going off the edge of the screen and wrap it
            super.wrap();
        }
        // return false if the bullet has timed out
        else {
            return false;
        }
        return true;

    }

    render() {
        super.render();
    }

    get position() {
        return this.__position;
    }

    set position(position) {
        this.__position = position;
    }

    get velocity() {
        return this.__velocity;
    }

    set velocity(velocity) {
        this.__velocity = velocity;
    }
    
}