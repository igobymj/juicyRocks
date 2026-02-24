import GameLoop from "../engine/GameLoop.js";
import HelperFunctions from "../engine/HelperFunctions.js";

/** AsteroidsGameLoop
 *
 *  Asteroids-specific game loop. Registers game systems in the correct order
 *  and contains thrust trail particle logic and silly color overrides.
 *
 */

export default class AsteroidsGameLoop extends GameLoop {

    constructor(gameSession) {
        super(gameSession);
        // Systems are registered later via initializeSystems() after all managers exist
    }

    // Called after all managers are registered on the session
    initializeSystems() {
        // Clear and re-register with game-specific systems
        this.__updateSystems = [];
        this.__renderSystems = [];

        const gs = this.gameSession;

        // Update order
        this.addUpdateSystem("input", gs.inputManager, 10);
        this.addUpdateSystem("bullets", gs.bulletManager, 20);
        this.addUpdateSystem("asteroids", gs.asteroidManager, 30);
        this.addUpdateSystem("ship", { update: () => gs.shipManager.ship.update() }, 40);
        this.addUpdateSystem("thrustTrail", { update: () => this.updateThrustTrail() }, 50);
        this.addUpdateSystem("juiceEvents", gs.juiceEventManager, 60);
        this.addUpdateSystem("score", gs.scoreManager, 70);

        // Render order
        this.addRenderSystem("sillyColors", { render: () => this.applySillyColors() }, 5);
        this.addRenderSystem("bullets", gs.bulletManager, 10);
        this.addRenderSystem("ship", { render: () => gs.shipManager.ship.render() }, 20);
        this.addRenderSystem("asteroids", gs.asteroidManager, 30);
        this.addRenderSystem("juiceEvents", gs.juiceEventManager, 40);
        this.addRenderSystem("score", gs.scoreManager, 50);
    }

    updateThrustTrail() {
        const ship = this.gameSession.shipManager.ship;
        if (ship.thrust) {
            const backAngle = ship.rotation + Math.PI;
            const rearOffset = p5.Vector.fromAngle(backAngle).mult(15);
            this.gameSession.juiceEventManager.addNew("shipThrust", {
                position: p5.Vector.add(ship.position, rearOffset),
                velocity: this.gameSession.p5.createVector(0, 0)
            });
        }
    }

    applySillyColors() {
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
    }
}
