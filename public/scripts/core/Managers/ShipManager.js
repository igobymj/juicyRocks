
/* shipmanager.js
Simple container to allow ship object to be accessed 
via gameSession. 
Inherits from Manager
nothing inherits from this class

Created by MJ 6/15/22
*/


import Manager from "./Manager.js";
import Ship from "../../game/Ship.js";


export default class ShipManager extends Manager{
	
	constructor() {

		if(ShipManager.__instance) {
			return ShipManager.__instance;
		}

		super();

		ShipManager.__instance = this;

		this.__ship = {};

		if( this.gameSession.verbose === true ) {
			console.log("ship manager created successfully");
		}

	}

	createShip() {
		this.ship = new Ship;
	}

	get ship() {
		return this.__ship
	}

	set ship( ship ) {
		this.__ship = ship;
	}

}