// ship.js 
// this class controls the draw and movement of the player ship. 
// inherits from VectorGameObject
// nothing inherits from this class
// By MJ
// last modified 6/15/22 by MJ

import GameSession from "../core/GameSession.js";
import GameState from "../game/states/GameState.js";
import VectorGameObject from "../core/VectorGameObject.js";
import SpriteParticle from "../core/Effects/ParticleEffects/SpriteParticle.js"; // TODO: Remove after testing
import ShipVectorParticle from "../core/Effects/ParticleEffects/VectorParticle.js";
import ShipParticleSystem from "../core/Effects/ParticleEffects/ShipParticleSystem.js";
import ExplosionSystem from "../core/Effects/ParticleEffects/ExplosionSystem.js";


export default class Ship extends VectorGameObject {

    // constructor takes the following:
    // p5 object, x and y coordinates of the ship location (rendered from center point), stroke weight (float, default 1),
    // strokeColor (p5.color type object), rotatation (float, represents radians), scale (float) and alpha value (int)
    constructor() {
        
        // ship vertices are hard coded in constructor
        let shipVertices = [
            { x: 24, y: 0 },
            { x: -24, y: -18 },
            { x: -18, y: -4 },
            { x: -18, y: 4 },
            { x: -24, y: 18 },
        ];

        //creates VectorGameObject using above vertices, The remainder of arguments are the same
        //as described above for the constructor, note that coordinates are not set (0,0) as they will be set in spawnShip()
        super(0,0, shipVertices, true, 1, false, 0, .5, 255);

        // tweakable variables for gameplay
        // TODO: These should be abstracted into constants file. These are some crazy looking magic numbers
        this.__rotationSpeed = 0.000627510040161;
        this.__thrustAmount = .01/60;  // .01 per frame converted into seconds 
        this.__speedClamp = 0.4;

        this.__shipAlive = false;
        this.__deadTime = 4000;
        this.__deathTimer = this.gameSession.timeManager.realTimeSinceStartup + this.__deadTime;

        // velocity vector
        this.__velocity = this.p5.createVector(0, 0);
        this.__rotation = 0;

        // variabless for animating flame effect
        this.__framesSinceFlame = 0;
        this.__thrust = false;

        // We also want to have a flame exhaust appear when we move
        // so this array stores the vertices for the flame effect
        this.__flameVertices = [
            { x: -28, y: -11 },
            { x: -34, y: 0 },
            { x: -28, y: 11 },
        ];
		
		// Create a VectorGameObject to handle drawing the flame exhaust
		this.__flame = new VectorGameObject(0, 0, this.__flameVertices, true, 1/this.scale, false, 0, 1, 255);

    }


    // update() runs once per frame, called from index.js
    update() {

        this.rotateShip();

        if(this.__shipAlive){
                // set thrust to "false" as default
                this.__thrust = false;

            // take keyboard input for rotation, then rotate accounting for timescale
            

            // if (this.p5.keyIsDown(this.p5.LEFT_ARROW)) {
            //     this.rotation -= this.p5.PI * this.__rotationSpeed * this.gameSession.timeManager.deltaTime;
            // }
            // if (this.p5.keyIsDown(this.p5.RIGHT_ARROW)) {
            //     this.rotation += this.p5.PI * this.__rotationSpeed * this.gameSession.timeManager.deltaTime;
            // }
            
            if (this.gameSession.inputManager.inputObject.forward === true ) {
                this.thrust = true;
                // create an acceleration vector based on the ship's current rotation
	  		    let accelerationVector = p5.Vector.fromAngle(this.rotation);
                // keep acceleration vector's direction but set magnitude to 1
                accelerationVector.normalize();
                // multiply by thrust constant, and adjust for any time dilation/compression
                accelerationVector.mult(this.__thrustAmount * this.gameSession.timeManager.deltaTime);
                // add acceleration (thrust) to current velocity
                this.velocity.add(accelerationVector);

                    // Play thruster sound if it's not already playing
                    if (!this.__gameSession.soundManager.isThrusting){
                        this.__gameSession.soundManager.playThruster();
                    }
                }
                else if (this.__gameSession.soundManager.isThrusting){
                    this.__gameSession.soundManager.stopThruster();
                }

            // apply speed clamp so that the speed doesn't get insane
            if (this.velocity.mag() > this.__speedClamp) {
                this.velocity.setMag(this.__speedClamp);
            }

            // move the ship, using the velocity vector, now is deltaDistance
            var tmpVel = this.p5.createVector(this.velocity.x, this.velocity.y);
            var deltaDistance = tmpVel.mult(this.gameSession.timeManager.deltaTime);
            this.position.add(deltaDistance);

            // wrapping: check for ship going off the edge of the screen and wrap it back to the opposite side
            super.wrap();

            if( !this.gameSession.juiceSettings.container.cheats.ship.invincibility && this.gameSession.asteroidManager.collide(this, true) ) {
                this.destroyShip();
            }
        }

        //spawns the ship the first time and subsequent times after death
        else {
            if( this.gameSession.timeManager.time > this.__deathTimer ) {
                this.spawnShip();
            }
        }
        
    }

    render() {
        
        if(this.__shipAlive){

            // NOTE: this is a bad override of VectorGameObject's render class. Written like this to enable simplified
            // rendering of flame effect
            // TODO: eliminate redundant override
            super.beginRender();

            // Style formatting
            this.p5.stroke([this.p5.red(this.strokeColor), this.p5.green(this.strokeColor), this.p5.blue(this.strokeColor), this.alpha]);
            // Prevent scaling of the stroke weight when scaling the vertices/graphic
            this.p5.strokeWeight((1 / this.scale) * this.strokeWeight);
            this.p5.fill(0);

            this.p5.beginShape();
            for (let i = 0; i < this.vertices.length; i++) {
                this.p5.vertex(this.vertices[i].x, this.vertices[i].y);
            }
            this.p5.endShape(this.p5.CLOSE);

            // creates the flame effect (vector)
            if (this.thrust) {
                // Calculate an offset behind the ship to make a nice place to spawn rocket fx particles
                let smokeSpawnOffset = p5.Vector.fromAngle(this.rotation, -20); //second parameter is offset length
                let smokeSpawnPoint = p5.Vector.add(this.position, smokeSpawnOffset);
            
                // Particle A: orange glow
                if (this.p5.frameCount % (Math.floor(Math.random() * 2 + 4)) === 0 ) {
                    // first parameter is duration in seconds
                    //this.__gameSession.particleManager.addSmoke(3, smokeSpawnPoint.x, smokeSpawnPoint.y, this.p5.color(255, 165, 0, 128));
                }
                // Particle B: occasional puff of smoke
                if (this.p5.frameCount % (Math.floor(Math.random() * 2 + 10)) === 0 ) {
                    // parameters are: particle (must be of type image), float x, float y, float rotation (radians), float scale, p5Vector moveVector, float duration (in seconds) 
                    let particleVelocity = this.p5.createVector(this.velocity.x, this.velocity.y);
                    particleVelocity.mult(Math.random() * .2 * 0.25);
                    //this.gameSession.particleManager.addParticle(new SpriteParticle("smoke", smokeSpawnPoint.x + Math.random() * 5, smokeSpawnPoint.y  + Math.random() * 5, 0, Math.random()*.25+1, particleVelocity, 1.25));
                }
                // TODO: this isn't quite working. Weiqiang maybe try to fix?
                // Weiqiang: Yes, I can.

                /*
                for( let i=0; i<10; i++ ) {
                    this.__gameSession.particleManager.addJet(this.position.x,this.position.y, this.rotation, this.velocity);
                }
                */
                if( this.p5.frameCount % 5 === 0 ) {
                    this.flame.renderVertices();
                }
            }

            super.endRender();
        }
    }

    destroyShip(){
        
        let particleVertices = [
            {x:12,y:2},{x:-12 ,y:11},
            {x:12,y:-2},{x:-12,y:-11},
            {x:-14,y:9},{x:-11,y:2},
            {x:-14,y:-9},{x:-11,y:-2},
            {x:-16,y:2},{x:-16,y:-2},
        ];
        
        this.__shipAlive = false;
        this.__deathTimer = this.gameSession.timeManager.time + this.__deadTime;

        var tmpPos = this.__position;
		var tmpRotation = this.__rotation;
        for(let i=0;i<particleVertices.length;i++){
                var line=[2];
                line[0]= particleVertices[i];
                line[1]= particleVertices[i+1];
                var newShipParticleSystem = new ShipParticleSystem(null, 5000, tmpPos, tmpRotation, 1, null, false,line);
				this.__gameSession.particleManager.addParticleSystem(newShipParticleSystem);
                i++;
        }

        // shut off thrust sound if necessary
        if (this.gameSession.soundManager.isThrusting) {
            this.gameSession.soundManager.stopThruster();
        }


        // Pass name of event to Juice Event Manager
        this.gameSession.juiceEventManager.addNew("destroyShip");

        //Explosions if needed 
       //var newExplosionSystem = new ExplosionSystem(null, 300, tmpPos, tmpRotation, 50, null, false);
	    //this.__gameSession.particleManager.addParticleSystem(newExplosionSystem);
    }

    spawnShip() {

        // first run a test to see if the center of the screen is free of asteroids, then spawn

        let invincible = this.gameSession.juiceSettings.container.cheats.ship.invincibility;

        //skips over "safeToSpawn" test if invincibility toggle is on
        if( this.gameSession.asteroidManager.safeToSpawn(this.gameSession.canvasWidth / 2, this.gameSession.canvasHeight / 2) || invincible ) {
            this.__shipAlive = true;
            this.position.x = this.gameSession.canvasWidth/2; 
            this.position.y = this.gameSession.canvasHeight/2;
            this.velocity.setMag(0);
        }
    }

    // process input
    rotateShip() {

        if(this.gameSession.inputManager.inputObject.left === true ) {
            this.rotation -= this.p5.PI * this.__rotationSpeed * this.gameSession.timeManager.deltaTime;        
        }
        if(this.gameSession.inputManager.inputObject.right === true ) {
            this.rotation += this.p5.PI * this.__rotationSpeed * this.gameSession.timeManager.deltaTime;        
        }
    }

    fireBullet() {
        this.gameSession.bulletManager.fireBullet(this.position, this.rotation);
    }    

    // getters & setters
    get rotation() {
        return this.__rotationSpeed;
    }

    get position() {
        return this.__position;
    }

    set position( newPosition ) {
        this.__position = newPosition;
    }

    get velocity() {
        return this.__velocity;
    }

    set velocity( newVelocity ) {
        this.__velocity = newVelocity;
    }

    get rotation() {
        return this.__rotation;
    }

    set rotation( newRotation ) {
        this.__rotation = newRotation;
    }

    get shipAlive() {
        return this.__shipAlive;
    }

    get thrust() {
        // in case it is somehow not set
        if(this.__thrust === null ) {
            return false;
        }
        else {
            return this.__thrust;
        }
    }

    get flame() {
        return this.__flame;
    }

    set thrust( newThrust ) {
        this.__thrust = newThrust;
    }

    get vertices() {
        return this.__vertices;
    }

    set vertices ( newVertices ) {
        this.__vertices = newVertices;
    }

}