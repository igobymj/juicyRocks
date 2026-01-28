//Asteroid class. Creates asteroids and updates them moving and rotating. 
//No collision yet, and only the large asteroid is in the database so far.
// By MJ
//last modified by Eddie 5/7/22
//TODO: Better wrapping

import VectorGameObject from "../core/VectorGameObject.js";
import EllipseGameObject from "../core/EllipseGameObject.js";
import Eyeballs from "../core/Effects/Other/Eyeballs.js";


export default class Asteroid extends VectorGameObject {

    // // initializes an asteroid object, key factor is the 'type' parameter (large, medium, small).
    constructor(type, x, y) {

        let asteroidVertices;

        if( type === "large") {
            asteroidVertices = [
                { x: 68, y: -51 },
                { x: -3, y: -80 },
                { x: -58, y: -51 },
                { x: -71, y: 1 },
                { x: -38, y: 62 },
                { x: 4, y: 54 },
                { x: 17, y: 34 },
                { x: 33, y: 49 },
                { x: 68, y: 26 },
                { x: 72, y: -8 },
            ];
        }

        else if( type === "medium") {
            asteroidVertices = [
                { x: -11, y: -41 },
                { x: 26, y: -37 },
                { x: 45, y: 8 },
                { x: 30, y: 30 },
                { x: -8, y: 41 },
                { x: -43, y: 11 },
                { x: -43, y: -23 },
                { x: -19, y: -27 },
            ];
        }

        else if (type === "small") {
            asteroidVertices = [
                { x: -1, y: -18 },
                { x: 7, y: -9 },
                { x: 9, y: 0 },
                { x: 2, y: 9 },
                { x: -12, y: 13 },
                { x: -18, y: 0 },
                { x: -10, y: -3 },
                { x: -18, y: -10 },
            ];
        }

        super(x, y, asteroidVertices, true, 1, false, 0, 1, 255);

        this.__type = type;
        
        if (type === "large") {
            this.__velocityMax = 2;
        }
        else if (type == "medium") {
            this.__velocityMax = 3;
        }
        else if (type === "small") {
            this.__velocityMax = 4;
        }
        else {
            console.log("asteroid type not set correctly");
        }

        // decide the asteroid's initial movement vector, including speed
        // Math.random() - 0.5 creates a random value between -0.5 and 0.5
        // velocity maxima are set according to asteroid type
        let velocityX = (Math.random() - 0.5) * this.__velocityMax;
        let velocityY = (Math.random() - 0.5) * this.__velocityMax;
        this.__movementVector = this.p5.createVector(velocityX, velocityY).mult(0.1 * this.gameSession.timeManager.deltaTime);

        //set its rotation scaler
        this.__rotationScale = Math.random() - 0.5;

        //eww, magic number
        this.__rotationSpeed = 128;

        // add EYEBALLS!
            if (type === "large") {
                this.__eyes = new Eyeballs(this.position, 40);
            }
            else if (type == "medium") {
                this.__eyes = new Eyeballs(this.position, 20);
            }
            else if (type === "small") {
                this.__eyes = new Eyeballs(this.position, 10);
            }
            else {
                console.log("asteroid type not set correctly");
            }

    }

    update() {
        var deltaDistance = this.p5.createVector(this.movementVector.x, this.movementVector.y).mult(0.1 * this.gameSession.timeManager.deltaTime);
        // move the asteroid
        this.position.add(deltaDistance);

        // rotate the asteroid
        this.rotation += this.p5.PI / this.__rotationSpeed * this.__rotationScale;

        //update the eyeball
        this.__eyes.update(this.x,this.y);

        // wrapping. Currently wraps on center point which looks pretty bad. But it works.
        // TODO: more sophisticated wrapping (??)
        super.wrap();

        return null;

    }


    render() {

        super.beginRender();
    
    // Now draw our shape from the vertices (base game object should have already taken care of translation, rotation, and scale with begin/end render)
        this.renderSetup();
        this.renderVertices();
    
        super.endRender();

        if( this.gameSession.juiceSettings.container.eyeBallsOnAsteroids.eyeBalls.active === true ) {
            this.__eyes.render();
        }

  }
  

  renderSetup() {
    // Style formatting
    // Prevent scaling of the stroke weight when scaling the verticies/graphic
    this.p5.strokeWeight((1 / this.scale) * this.strokeWeight);
    // Set the stroke color
      this.p5.stroke([this.p5.red(this.strokeColor), this.p5.green(this.strokeColor), this.p5.blue(this.strokeColor), this.alpha]);
    // Handle fill
    if(this.fill){
      this.p5.fill([this.p5.red(this.fillColor), this.p5.green(this.fillColor), this.p5.blue(this.fillColor), this.alpha]);
    }
    else{
      this.p5.noFill();
    }

  }


    get nextType() {
        switch(this.__type) {
            case "large":
                return "medium";
            case "medium":
                return "small";
            case "small":
                return "none";
        }
    }

    // getter for asteroid position. Returns 2D vector
    get position() {
        return this.__position;
    }

    // getter for asteroid's current movement vector. Not normalized.
    get movementVector() {
        return this.__movementVector;
    }

}