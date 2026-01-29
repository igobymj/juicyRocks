import GameSession from "./core/GameSession.js";
import gameUpdate from "./core/GameUpdate.js";
import GameState from "./game/states/GameState.js";
import ParticleSystem from "./core/Effects/ParticleEffects/ParticleSystem.js";

//import p5 from "./p5/p5.js";
//This is our global instance of P5. We will save it to our settings singleton for future access.

/**TODOS:
Fix resize windows
*/


//Instantiate our Game Session - this will be our parent for all game data.
let gameSession = new GameSession();

//Define how our P5 sketch will look. Treat this as the "Main".
var juiceteroids = function (p) {

	p.preload = function () {
		//Load any assets or libraries
	}

	p.setup = function () {
		//get width and height of div
		let canvasDiv = document.getElementById('canvas');
		//look for canvasDiv and get style to compute width
		let canvasStyle = canvasDiv.currentStyle || window.getComputedStyle(canvasDiv);
		let canvasWidth = parseFloat(canvasStyle.width);
		let canvasPadding = parseFloat(canvasStyle.paddingLeft) + parseFloat(canvasStyle.paddingRight);
		let canvasBorder = parseFloat(canvasStyle.borderLeftWidth) + parseFloat(canvasStyle.borderRightWidth);

		gameSession.canvasWidth = canvasWidth - canvasPadding - canvasBorder;
		gameSession.canvasHeight = (p.windowHeight) * 0.8; //MAGIC NUMBER: vertical ratio the canvas should be to the header/footer.

		var canvas = p.createCanvas(gameSession.canvasWidth, gameSession.canvasHeight * .98);
		canvas.parent("canvas");

		//look for height of canvas div, make juice div same 
		let juiceDiv = document.getElementById('juice-menu');
		let canvasEl = document.getElementById('defaultCanvas0');
		juiceDiv.style.height = canvasEl.style.height;

		//save canvas reference to gameSession
		gameSession.canvas = canvas;

		//Time scale management
		gameSession.timeManager.timeScale = 1;
		gameSession.timeManager.frameRate = 60;
		gameSession.timeManager.start();

		//P5 configurations
		p.frameRate(60);
		p.imageMode(p.CENTER);
	}

	//core update function of the game
	p.draw = function () {

		//Call managers and states to update each frame. 
		gameSession.timeManager.update();
		gameSession.gameUpdate.update();

		p.background(p.color(gameSession.backgroundColor));
		gameSession.gameUpdate.render();

		if (gameSession.flashColor != 0) {
			p.fill(gameSession.flashColor);
			p.rect(0, 0, gameSession.canvasWidth, gameSession.canvasHeight);
		}




		// *** CHEAT CODES/DEBUG FEATURES *** //
		// ****** ALL OF THESE SHOULD BE MOVED TO INPUTMANAGER, THIS IS A BROKEN IMPLEMENTATION ******* //

		// Test time scale effects on sounds
		if (p.key === 'i') {
			gameSession.timeManager.timeScale = 0.1;
		}
		if (p.key === 'o') {
			gameSession.timeManager.timeScale = 1;
		}
		if (p.key === 'q') {
			gameSession.timeManager.timeScale = 2;
		}

		//Test SoundObject switching on bullet sound with one alternate
		// TODO: Re-enable when sound is implemented
		// if (p.key === 'i') {
		// 	gameSession.soundManager.changeBullet(1);
		// }
		// if (p.key === 'o') {
		// 	gameSession.soundManager.changeBullet(0);
		// }
	}

	p.keyPressed = function () {
		gameSession.inputManager.keyInput(p.key);
	}

	p.windowResized = function () {
		let canvasDiv = document.getElementById('canvas');

		//look for canvasDiv and get style to compute width
		let canvasStyle = canvasDiv.currentStyle || window.getComputedStyle(canvasDiv);
		let canvasWidth = parseFloat(canvasStyle.width);
		let canvasPadding = parseFloat(canvasStyle.paddingLeft) + parseFloat(canvasStyle.paddingRight);
		let canvasBorder = parseFloat(canvasStyle.borderLeftWidth) + parseFloat(canvasStyle.borderRightWidth);

		gameSession.canvasWidth = canvasWidth - canvasPadding - canvasBorder;
		gameSession.canvasHeight = (p.windowHeight) * 0.8; //MAGIC NUMBER: vertical ratio the canvas should be to the header/footer.

		//Rescale game to match window
		p.resizeCanvas(gameSession.canvasWidth, gameSession.canvasHeight);

		//look for height of canvas div, make juice div same 
		let juiceDiv = document.getElementById('juice-menu');
		let canvasEl = document.getElementById('defaultCanvas0');
		juiceDiv.style.height = canvasEl.style.height;

	}
}

//Instantiate P5 and attach it to our gameSession instance
gameSession.p5 = new p5(juiceteroids, 'canvas');
gameSession.shipManager.createShip();

gameSession.asteroidManager.levelStart();
gameSession.juiceGuiManager.initialize();

