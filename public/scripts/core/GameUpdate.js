import Manager from "./Managers/Manager.js";

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
            this.gameSession.juiceEventManager.update();
        }
        else {
            this.delayFrames = this.delayFrames - 1;
        }

    }

    render(){

        this.gameSession.bulletManager.render();
        this.gameSession.shipManager.ship.render();
        this.gameSession.asteroidManager.render();
        this.gameSession.juiceEventManager.render();

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
