/** Manages how we reference elements from the DOM (Juice Menu) to control
 * key game elements.
 * 
 * 1. Get all Juice HTML elements.
 * 2. Create Listeners for those Juice HTML elements.
 * 3. Provide hooks into different managers to change juice elements
 * 
 * TODOS:
 * Automated Testing
 */

import GameSession from "../GameSession.js";
import Manager from "./Manager.js";

export default class JuiceManager extends Manager {

    constructor() {
        super();

        //Collect Juice Menu HTML references and attach listeners              
        this.__invincibilityToggle = document.getElementById("invincibility");
        this.invincibilityToggle.addEventListener("change", this.invincibilityToggleFunction);
        this.invincibilityToggle.gameSession = this.gameSession;       
        
        this.__bulletHitShakeType = document.getElementById("bulletHitShakeSelect");
        this.bulletHitShakeType.addEventListener("change", this.bulletHitShakeTypeFunction);
        this.bulletHitShakeType.gameSession = this.gameSession;

        this.__bulletHitShakeToggleX = document.getElementById("bulletHorizontalShake");
        this.bulletHitShakeToggleX.addEventListener("change", this.bulletHitShakeToggleFunctionX);
        this.bulletHitShakeToggleX.gameSession = this.gameSession;
        
        this.__bulletHitShakeToggleYaxis = document.getElementById("bulletVerticalShake");
        this.bulletHitShakeToggleYaxis.addEventListener("change", this.bulletHitShakeToggleFunctionYaxis);
        this.bulletHitShakeToggleYaxis.gameSession = this.gameSession;

        this.__bulletHitShakeFrequency = document.getElementById("bulletHitShakeFrequency");
        this.bulletHitShakeFrequency.addEventListener("change", this.bulletHitShakeFrequencyFunction);
        this.bulletHitShakeFrequency.gameSession = this.gameSession;

        this.__bulletHitShakeAmplitude = document.getElementById("bulletHitShakeAmplitude");
        this.bulletHitShakeAmplitude.addEventListener("change", this.bulletHitShakeAmplitudeFunction);
        this.bulletHitShakeAmplitude.gameSession = this.gameSession;

        this.__bulletHitShakeDuration = document.getElementById("bulletHitShakeDuration");
        this.bulletHitShakeDuration.addEventListener("change", this.bulletHitShakeDurationFunction);
        this.bulletHitShakeDuration.gameSession = this.gameSession;

        this.__bulletHitShakeInheritVelocity = document.getElementById("bulletHitShakeInheritVelocity");
        this.bulletHitShakeInheritVelocity.addEventListener("change", this.bulletHitShakeInheritToggleFunction);
        this.bulletHitShakeInheritVelocity.gameSession = this.gameSession;

        this.__bulletHitShakeFader = document.getElementById("bulletHitShakeFader");
        this.bulletHitShakeFader.addEventListener("change", this.bulletHitShakeFaderToggleFunction);
        this.bulletHitShakeFader.gameSession = this.gameSession;

        this.__bulletHitPauseFrames = document.getElementById("bulletHitPauseFrames");
        this.bulletHitPauseFrames.addEventListener("change", this.bulletHitPauseFramesFunction);
        this.bulletHitPauseFrames.gameSession = this.gameSession;



        // this.__bulletHitFlashColor = document.getElementById("bulletHitFlashColor");
        // this.bulletHitFlashColor.addEventListener("change", this.bulletHitFlashColorFunction);
        // this.bulletHitFlashColor.gameSession = this.gameSession;

        // this.__bulletHitFlashFade = document.getElementById("bulletHitFlashFade");
        // this.bulletHitFlashFade.addEventListener("change", this.bulletHitFlashFadeFunction);
        // this.bulletHitFlashFade.gameSession = this.gameSession;

// Bullet Hit Particles
        this.__bulletHitParticleType = document.getElementById("bulletHitParticleType");
        this.bulletHitParticleType.addEventListener("change", this.bulletHitParticleTypeFunction);
        this.bulletHitParticleType.gameSession = this.gameSession;
        
        this.__bulletHitParticlePattern = document.getElementById("bulletHitParticlePattern");
        this.bulletHitParticlePattern.addEventListener("change", this.bulletHitParticlePatternFunction);
        this.bulletHitParticlePattern.gameSession = this.gameSession;

        this.__bulletHitParticleCount = document.getElementById("bulletHitParticleCount");
        this.bulletHitParticleCount.addEventListener("change", this.bulletHitParticleCountFunction);
        this.bulletHitParticleCount.gameSession = this.gameSession;

        this.__bulletHitParticleLife = document.getElementById("bulletHitParticleLife");
        this.bulletHitParticleLife.addEventListener("change", this.bulletHitParticleLifeFunction);
        this.bulletHitParticleLife.gameSession = this.gameSession;

        this.__bulletHitParticleVelocity = document.getElementById("bulletHitParticleVelocity");
        this.bulletHitParticleVelocity.addEventListener("change", this.bulletHitParticleVelocityFunction);
        this.bulletHitParticleVelocity.gameSession = this.gameSession;

        this.__bulletHitParticleVelocityRandom = document.getElementById("bulletHitParticleVelocityRandom");
        this.bulletHitParticleVelocityRandom.addEventListener("change", this.bulletHitParticleVelocityRandomFunction);
        this.bulletHitParticleVelocityRandom.gameSession = this.gameSession;

        this.__bulletHitInheritVelocity = document.getElementById("bulletHitInheritVelocity");
        this.bulletHitInheritVelocity.addEventListener("change", this.bulletHitInheritVelocityFunction);
        this.bulletHitInheritVelocity.gameSession = this.gameSession;

        // this.__deathShakeType = document.getElementById("deathShakeSelect");
        // this.deathShakeType.addEventListener("change", this.deathShakeTypeFunction);
        // this.deathShakeType.gameSession = this.gameSession;

        // this.__deathShakeAmplitude = document.getElementById("deathShakeAmplitude");
        // this.deathShakeAmplitude.addEventListener("change", this.deathShakeAmplitudeFunction);
        // this.deathShakeAmplitude.gameSession = this.gameSession;

        // this.__deathShakeDuration = document.getElementById("deathShakeDuration");
        // this.deathShakeDuration.addEventListener("change", this.deathShakeDurationFunction);
        // this.deathShakeDuration.gameSession = this.gameSession;

    }
    
     invincibilityToggleFunction() {
        let inputStatus = this.checked;
        this.gameSession.juiceSettings.updateJuice("cheats","ship","invincibility",inputStatus);
     }

     bulletHitShakeTypeFunction() {
        let selected = this.value;
        if( selected === "none" ) {
            this.gameSession.juiceSettings.updateJuice("bulletHit","shake","active",false);
        }
        else {
            this.gameSession.juiceSettings.updateJuice("bulletHit","shake","form",selected);
            this.gameSession.juiceSettings.updateJuice("bulletHit","shake","active",true);
        }
     }

    bulletHitShakeToggleFunctionX() {
        let inputStatus = this.checked;
        this.gameSession.juiceSettings.updateJuice("bulletHit","shake","xAxis",inputStatus);
     }

    bulletHitShakeToggleFunctionYaxis() {
        let inputStatus = this.checked;
        this.gameSession.juiceSettings.updateJuice("bulletHit","shake","yAxis",inputStatus);
     }

    bulletHitShakeFrequencyFunction() {
        let range = this.value * .01;  // convert to a float between 0 and 1
        range = range * 60; // convert to cycles/sec where 60 is maximum
        this.gameSession.juiceSettings.updateJuice("bulletHit","shake","frequency",range);       
    }

    bulletHitShakeAmplitudeFunction() {
        let range = this.value * .01;  // convert to a float between 0 and 1
        this.gameSession.juiceSettings.updateJuice("bulletHit","shake","amplitude",range);
     }

     bulletHitShakeDurationFunction() {
        let range = this.value * .01;  // convert to a float between 0 and 1
        this.gameSession.juiceSettings.updateJuice("bulletHit","shake","duration",range);
     }

    bulletHitShakeInheritToggleFunction() {
        let inputStatus = this.checked;
        this.gameSession.juiceSettings.updateJuice("bulletHit","shake","inheritVelocity",inputStatus);
     }

    bulletHitShakeFaderToggleFunction() {
        let inputStatus = this.checked;
        this.gameSession.juiceSettings.updateJuice("bulletHit","shake","fade",inputStatus);
     }

     bulletHitPauseFramesFunction() {
        let range = this.value;
        this.gameSession.juiceSettings.updateJuice("bulletHit", "hitPause","frames",range);
     }



     bulletHitFlashColorFunction() {
        let selected = this.value;
        if( selected === "none" ) {
            this.gameSession.juiceSettings.updateJuice("bulletHit","colorFlash","active",false);
        }
        else {
            this.gameSession.juiceSettings.updateJuice("bulletHit","colorFlash","active",true);
            this.gameSession.juiceSettings.updateJuice("bulletHit","colorFlash","color",selected);
        }
     }

    bulletHitFlashFadeFunction() {
        // convert to float between 0 and 1 but add one first to avoid divide-by-zero risk
        let range = (this.value + 1) * .001;
        range = range * 4; // 4 seconds is maximum
        this.gameSession.juiceSettings.updateJuice("bulletHit","colorFlash","duration",range);
     }
     deathShakeTypeFunction() {
        let selected = this.value;
        if( selected === "none") {
            this.gameSession.juiceSettings.updateJuice("destroyShip","shake","active",false);
        }
        else {
            this.gameSession.juiceSettings.updateJuice("destroyShip","shake","form",selected);
        }
     }

     bulletHitParticlePatternFunction() {
        let selected = this.value;
        this.gameSession.juiceSettings.updateParticleSystem("bulletHit","vectorParticle","pattern",selected);
     }

     bulletHitParticleCountFunction() {
        let selected = parseInt(this.value);
        this.gameSession.juiceSettings.updateParticleSystem("bulletHit","vectorParticle","count",selected);
     }

     bulletHitParticleLifeFunction() {
        let selected = parseInt(this.value);
        this.gameSession.juiceSettings.updateParticleSystem("bulletHit","vectorParticle","particleLife",selected);
     }
     bulletHitParticleVelocityFunction() {
        let selected = parseInt(this.value);
        this.gameSession.juiceSettings.updateParticleSystem("bulletHit","vectorParticle","initialVelocity",selected);
     }
    
     bulletHitParticleVelocityRandomFunction() {
        let selected = this.checked;
        this.gameSession.juiceSettings.updateParticleSystem("bulletHit","vectorParticle","initialVelocityRandom",selected);
     }

      bulletHitInheritVelocityFunction() {
        let selected = this.checked;
        this.gameSession.juiceSettings.updateParticleSystem("bulletHit","vectorParticle","inheritVelocity",selected);
     }
    bulletHitParticleRotationSpeedFunction() {
        let selected = parseInt(this.value);
        this.gameSession.juiceSettings.updateParticleSystem("bulletHit","vectorParticle","rotationSpeed",selected);
    }

    bulletHitParticleRotationRandomFunction() {
        let selected = this.value;
        this.gameSession.juiceSettings.updateParticleSystem("bulletHit","vectorParticle","rotation",selected);
    }



   // deathShakeAmplitudeFunction() {
   //      let range = this.value * .01;  // convert to a float between 0 and 1
   //      this.gameSession.juiceSettings.updateJuice("destroyShip","shake","amplitude",range);
   //   }

   //   deathShakeDurationFunction() {
   //      let range = this.value * .01;  // convert to a float between 0 and 1
   //      this.gameSession.juiceSettings.updateJuice("destroyShip","shake","duration",range);
   //   }
    
   //   bulletHitParticleTypeFunction() {
   //      let selected = this.value;
   //      if( selected === "none" ) {
   //          this.gameSession.juiceSettings.updateJuice("bulletHit","particles","active",false);
   //      }
   //      else {
   //          this.gameSession.juiceSettings.updateJuice("bulletHit","particles","active",true);
   //          this.gameSession.juiceSettings.updateParticleSystem("bulletHit","vectorParticle","shape",selected);
   //      }
   //   }

    /**Prints a simple alert when our example slider is changed.
     * range status can be checked with this.value
     * gameSession accessible through this.gameSession
     * 
     * this refers to the HTML element this function is attached to (See constructor of this class), not the Juice Manager class.
     */
    rangeExampleJuiceFunction(){
        let rangeExampleStatus = this.value + "";
        console.log("Range example - range is: " + rangeExampleStatus);
    }

    /**Prints a simple log when our select is changed.
     * selected value can ge checked with this.value
     * gameSession accessible through this.gameSession
     * 
     * this refers to the HTML element this function is attached to (See constructor of this class), not the Juice Manager class
     */
    selectExampleJuiceFunction(){
        let selectExampleStatus = this.value + "";
        console.log("Select example - selected is: " + selectExampleStatus);
    }

    get invincibilityToggle() {
        return this.__invincibilityToggle;
    }

    set invincibilityToggle(invincibilityToggle) {
        this.__invincibilityToggle = invincibilityToggle;
    }

    get bulletHitShakeToggleX() {
        return this.__bulletHitShakeToggleX;
    }

    set bulletHitShakeToggleX(bulletHitShakeToggleX) {
        this.__bulletHitShakeToggleX = bulletHitShakeToggleX;
    }

    get bulletHitShakeToggleYaxis() {
        return this.__bulletHitShakeToggleYaxis;
    }

    get bulletHitShakeFrequency() {
        return this.__bulletHitShakeFrequency;
    }

    get bulletHitShakeDuration() {
        return this.__bulletHitShakeDuration;
    }

    get bulletHitShakeInheritVelocity() {
        return this.__bulletHitShakeInheritVelocity;
    }    

    get bulletHitShakeFader() {
        return this.__bulletHitShakeFader;
    }

    get bulletHitPauseFrames() {
        return this.__bulletHitPauseFrames;
    }

    get deathShakeToggle() {
        return this.__deathShakeToggle;
    }

    get deathShakeType() {
        return this.__deathShakeType;
    }

    get deathShakeAmplitude() {
        return this.__deathShakeAmplitude;
    }

    get deathShakeDuration() {
        return this.__deathShakeDuration;
    }

    get bulletHitShakeToggle() {
        return this.__bulletHitShakeToggle;
    }

    get bulletHitShakeType() {
        return this.__bulletHitShakeType;
    }

    get bulletHitShakeAmplitude() {
        return this.__bulletHitShakeAmplitude;
    }

    get bulletHitFlashColor() {
        return this.__bulletHitFlashColor;
    }

    get bulletHitFlashFade() {
        return this.__bulletHitFlashFade;
    }

    get selectExample(){
        return this.__selectExample;
    }

    set selectExample(selectExample){
        this.__selectExample = selectExample;
    }

    get checkBoxExample(){
        return this.__checkBoxExample;
    }

    set checkBoxExample(checkBoxExample){
        this.__checkBoxExample = checkBoxExample;
    }

    get rangeExample(){
        return this.__rangeExample;
    }

    set rangeExample(rangeExample){
        this.__rangeExample = rangeExample;
    }

    get bulletHitParticleType() {
        return this.__bulletHitParticleType;
    }

    get bulletHitParticleCount() {
        return this.__bulletHitParticleCount;
    }

    get bulletHitParticleLife() {
        return this.__bulletHitParticleLife;
    }

    get bulletHitParticlePattern() {
        return this.__bulletHitParticlePattern;
    }

    get bulletHitParticleVelocity() {
        return this.__bulletHitParticleVelocity;
    }

    get bulletHitParticleVelocityRandom() {
        return this.__bulletHitParticleVelocityRandom;
    }
    
    get bulletHitInheritVelocity() {
        return this.__bulletHitInheritVelocity;
    }
}