import Manager from "./Manager.js";
//import JetSmoke from "../Effects/ParticleEffects/JetSmoke.js";
//import SmokeTrail from "../Effects/ParticleEffects/SmokeTrail.js";
import SpriteParticle from "../Effects/ParticleEffects/SpriteParticle.js";
//import JetParticleSystem from "../Effects/ParticleEffects/JetParticleSystem.js";
//import SmokeTrailSystem from "../Effects/ParticleEffects/SmokeTrailSystem.js";


/* Takes a particle cue and uses it to generate a particle system */
/* TK I really don't understand how this works and it needs to be fixed */
/* Lots of code here for the smoke trail from the ship, which should never have been independent of the holistic particle system */


export default class ParticleManager extends Manager {

    constructor(){
        if(ParticleManager.__instance){
            return ParticleManager.__instance;
        }

        super();

        ParticleManager.__instance = this;
        this.__instance = {};

        this.__particleSystems = [];

        if( this.gameSession.verbose === true ) {
            console.log("particle manager created successfully");
        }

    }

    // singleton code
    get instance() {
        return this.__instance;
    }

    set instance(instance) {
        this.__instance = instance;
    }

    findParticleSystemByTag(tag) {
        for (let i = 0; i < this.__particleSystems.length; i++){
            if (tag === this.__particleSystems[i].tag) {
                return this.__particleSystems[i];
            }
        }
        console.log("Can not find the ParticleSystem with tag: " + tag);
        return null;
    }

    play() {
        this.__isPlaying = true;
    }

    stop() {
        this.__isPlaying = false;
    }

    addParticleSystem(newParticleSystem) {
        this.__particleSystems.push(newParticleSystem);
    }
    
    update() {
        for (let i = this.__particleSystems.length - 1; i >= 0; i--) {
            if (this.__particleSystems[i].finished()) {
                this.__particleSystems.splice(i, 1);
            }
            else {
                this.__particleSystems[i].emission();
                this.__particleSystems[i].update();
            }
        }
    }

    render() {
        for (let i = 0; i < this.__particleSystems.length; i++) {
            this.__particleSystems[i].render();
        }
    }

}

/* old stuff */
  //position is Vector 
    // addSmoke(x, y) {
    //     var startPosition = this.p5.createVector(x, y);
    //     var smokeSystem = new SmokeTrailSystem("SmokeTrail", null, startPosition, 0, 3, 1000, true);
    //     this.addParticleSystem(smokeSystem);
    // }

    // addJet(x,y, rotation) {
    //     /*
    //         let particlePosition = this.p5.createVector(x,y);
    //         this.addParticle(new JetSmoke(200, particlePosition, rotation, (0.1 + velocity.mag() / 10) * Math.random(5, 10)), [200, 204, 2]);
    //     */
    //     var startPosition = this.p5.createVector(x, y);
    //     var jetSystem = new JetParticleSystem("JetForShip", null, startPosition, rotation, 100, 100, true);
    //     this.addParticleSystem(jetSystem);
    // }

