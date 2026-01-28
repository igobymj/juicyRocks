
import GameUpdate from "./GameUpdate.js"
import InputManager from "./Managers/InputManager.js";
import SoundManager from "./Managers/SoundManager.js";
import TimeManager from "./Managers/TimeManager.js";
import ShipManager from "./Managers/ShipManager.js";
import AsteroidManager from "./Managers/AsteroidManager.js";
import ParticleManager from "./Managers/ParticleManager.js";
import SpriteManager from "./Managers/SpriteManager.js";
import JuiceManager from "./Managers/JuiceManager.js";
import JuiceEventManager from "./Managers/JuiceEventManager.js";
import BulletManager from "./Managers/BulletManager.js";
import JuiceSettings from "./JuiceSettings.js";
import ParticleSystemDefinitions from "./Effects/ParticleEffects/ParticleSystemDefinitions.js";

export default class GameSession{
	
	constructor() {
		if(GameSession.__instance){
			return GameSession.__instance;
		}
		GameSession.__instance = this;
		this.__instance = this;
		//Browser Information
		this.__canvasHeight = 0;
		this.__canvasWidth = 0;

		//Instance Variables

		this.__p5 = {}; //P5 instance
		this.__canvas = {}; //P5 Canvas

		//Important Globals
		this.__backgroundColor = 0;
		this.__flashColor = 0;

		//Debug verbose
		this.__verbose = true;

		//Game Update object
		this.__gameUpdate = new GameUpdate();

		//InputManager
		this.__inputManager = new InputManager();

		//SoundManager
		this.__soundManager = new SoundManager();

		//TimeManager
		this.__timeManager = new TimeManager();

		//Particle Manager
		this.__particleManager = new ParticleManager();

		//Ship Manager
		this.__shipManager = new ShipManager();

		//Asteroid Manager
		this.__asteroidManager = new AsteroidManager();

		//Bullet Manager
		this.__bulletManager = new BulletManager();

		//Sprite Manager 
		this.__spriteManager = new SpriteManager();

		//manages all juice effects through a single central object
		this.__juiceEventManager = new JuiceEventManager();

		//Object to store all current juice settings
		this.__juiceSettings = new JuiceSettings();

		
		// likely to be deprecated:

		//Object stores particle system definitions
		this.__particleSystemDefinitions = new ParticleSystemDefinitions();

		//All states available to game
		this.__states = [];

		//Current state
		this.__currentState = {};

		//JuiceManager - Instantiate Last (not sure if necessary, but for now)
		this.__juiceManager = new JuiceManager();

		if( this.verbose === true ) {
			console.log("Session Created Successfully.");
		}
	}

	//used to add states to game on game load or dynamically
	addStateToGame(state){
		this.states.push(state);
	}

	//simplifies state setup. calls setup and then loads the state into currentState.
	setCurrentState(state){
		//TODO: Make this safe to add non-pre-existing states
		this.currentState = state;
		this.currentState.setup();
	}

	setCurrentStateByName(stateName){
		let state;
		for(let i = 0; i < this.states.length; i++){
			if(this.states[i].name == stateName){
				state = this.states[i];
			}
		}

		if(state){
			this.setCurrentState(state);
		} else {
			console.log(`ERROR: ${stateName} not loaded as current state in session.`);
		}
	}

	get states(){
		return this.__states;
	}

	set states(states){
		this.__states = states;
	}

	get currentState(){
		return this.__currentState;
	}

	set currentState(currentState){
		this.__currentState = currentState;
	}

	get instance(){
		return this.__instance;
	}

	set instance(instance){
		this.__instance = instance;
	}

	get p5(){
		return this.__p5;
	}
	
	set p5(p5){
		this.__p5 = p5;
	}

	get canvas(){
		return this.__canvas;
	}
	set canvas(canvas){
		this.__canvas = canvas;
	}

	get backgroundColor() {
		return this.__backgroundColor;
	}

	set backgroundColor(backgroundColor) {
		this.__backgroundColor = backgroundColor;
	}

	get flashColor() {
		return this.__flashColor;
	}

	set flashColor( flashColor ) {
		this.__flashColor = flashColor;
	}

	get gameUpdate() {
		return this.__gameUpdate;
	}

	set gameUpdate( gameUpdate ) {
		this.__gameUpdate = gameUpdate;
	}

	set inputManager(inputManager) {
		this.__inputManager = inputManager;
	}

	get inputManager() {
		return this.__inputManager;
	}

	set inputManager(inputManager) {
		this.__inputManager = inputManager;
	}

	get soundManager(){
		return this.__soundManager;
	}

	set soundManager(soundManager){
		this.__soundManager = soundManager;
	}

	get timeManager() {
		return this.__timeManager;
	}

	set timeManager(timeManager) {
		this.__timeManager = timeManager;
	}

	get screenShakeManager() {
		return this.__screenShakeManager;
	}

	set screenShakeManager(screenShakeManager) {
		this.__screenShakeManager = screenShakeManager;
	}

	get particleManager() {
		return this.__particleManager;
	}

	set particleManager(particleManager) {
		this.__particleManager = particleManager;
	}

	get asteroidManager() {
		return this.__asteroidManager;
	}

	set shipManager(shipManager) {
		this.__shipManager = shipManager;
	}

	get shipManager() {
		return this.__shipManager;
	}

	set asteroidManager(asteroidManager) {
		this.__asteroidManager = asteroidManager;
	}

	get bulletManager() {
		return this.__bulletManager;
	}

	set bulletManager(bulletManager) {
		this.__bulletManager = bulletManager;
	}

	get canvasHeight(){
		return this.__canvasHeight;
	}

	set canvasHeight(canvasHeight){
		this.__canvasHeight = canvasHeight;
	}

	get canvasWidth(){
		return this.__canvasWidth;
	}

	set canvasWidth(canvasWidth){
		this.__canvasWidth = canvasWidth;
	}
		
	get spriteManager() {
		return this.__spriteManager;
	}

	set spriteManager(spriteManager) {
		this.__spriteManager = spriteManager;
	}

	get juiceSettings() {
		return this.__juiceSettings;
	}

	set juiceSettings(juiceSettings) {
		this.__juiceSettings = juiceSettings;
	}

	get particleSystemDefinitions() {
		return this.__particleSystemDefinitions;
	}

	get juiceEventManager() {
		return this.__juiceEventManager;
	}

	set juiceEventManager(juiceEventManager) {
		this.__juiceEventManager = juiceEventManager;
	}

	get juiceManager(){
		return this.__juiceManager;
	}

	set juiceManager(juiceManager){
		this.__juiceManager = juiceManager;
	}

	get verbose() {
		return this.__verbose;
	}

	// debug
	PrintSomething(something) {
		console.log(something);
	}


}
