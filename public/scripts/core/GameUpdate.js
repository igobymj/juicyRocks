import Manager from "./Managers/Manager.js";
import HelperFunctions from "./HelperFunctions.js";

/** GameUpdate
 *
 *  Handles all updates from the main game logic
 *
 */

export default class GameUpdate extends Manager {

    constructor(gameSession){

        //singleton
        if(GameUpdate.__instance){
            return GameUpdate.__instance;
        }

        super(gameSession);

        GameUpdate.__instance = this;
        this.__instance = this;

        this.__delayFrames = 0;

    }

    update(){
        
        if(this.delayFrames <= 0) {
            // All updates first
            this.gameSession.inputManager.update();
            this.gameSession.bulletManager.update();
            this.gameSession.asteroidManager.update();
            this.gameSession.shipManager.ship.update();

            // Thrust trail particles – spawn from the rear of the ship
            const ship = this.gameSession.shipManager.ship;
            if (ship.thrust) {
                const backAngle = ship.rotation + Math.PI;
                const rearOffset = p5.Vector.fromAngle(backAngle).mult(15);
                this.gameSession.juiceEventManager.addNew("shipThrust", {
                    position: p5.Vector.add(ship.position, rearOffset),
                    velocity: this.gameSession.p5.createVector(0, 0)
                });
            }

            this.gameSession.juiceEventManager.update();
            this.gameSession.scoreManager.update();
        }
        else {
            this.delayFrames = this.delayFrames - 1;
        }

    }

    render(){

        // Apply silly color overrides (only when juice FX and colors are active)
        const juiceFxOn = this.gameSession.juiceSettings.container.cheats.juiceFx;
        const colors = this.gameSession.juiceSettings.container.sillyColors;
        const pp = this.gameSession.p5;
        if (juiceFxOn && colors && colors.active) {
            // Ship fill color
            const ship = this.gameSession.shipManager.ship;
            const shipRGB = HelperFunctions.HueToRGB(colors.shipHue);
            if (shipRGB) {
                ship.fill = true;
                ship.fillColor = pp.color(shipRGB[0], shipRGB[1], shipRGB[2]);
            } else {
                ship.fill = false;
            }

            // Asteroid fill color
            const asteroids = this.gameSession.asteroidManager.asteroids;
            const astRGB = HelperFunctions.HueToRGB(colors.asteroidHue);
            for (let i = 0; i < asteroids.length; i++) {
                if (astRGB) {
                    asteroids[i].fill = true;
                    asteroids[i].fillColor = pp.color(astRGB[0], astRGB[1], astRGB[2]);
                } else {
                    asteroids[i].fill = false;
                }
            }

            // Background color
            const bgRGB = HelperFunctions.HueToRGB(colors.backgroundHue);
            if (bgRGB) {
                this.gameSession.backgroundColor = pp.color(bgRGB[0], bgRGB[1], bgRGB[2]);
            } else {
                this.gameSession.backgroundColor = 0;
            }
        } else {
            // Reset to defaults when colors are inactive
            this.gameSession.shipManager.ship.fill = false;
            const asteroids = this.gameSession.asteroidManager.asteroids;
            for (let i = 0; i < asteroids.length; i++) {
                asteroids[i].fill = false;
            }
            this.gameSession.backgroundColor = 0;
        }

        this.gameSession.bulletManager.render();
        this.gameSession.shipManager.ship.render();
        this.gameSession.asteroidManager.render();
        this.gameSession.juiceEventManager.render();
        this.gameSession.scoreManager.render();

        // Border rect that moves with screen shake to make the effect visible
        let p = this.gameSession.p5;
        p.noFill();
        p.stroke(255);
        p.strokeWeight(3);
        p.rect(0, 0, this.gameSession.canvasWidth, this.gameSession.canvasHeight);

    }

    keyIsDown(){
    }

    keyPressed() {
    }


    get instance(){
        return this.__instance;
    }

    set instance(instance){
        this.__instance = instance;
    }


    get delayFrames() {
        return this.__delayFrames;
    }

    set delayFrames(delayFrames) {
        this.__delayFrames = delayFrames;
    }

 

}
