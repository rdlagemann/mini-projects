( function () { 
	"use strict";

	/* Weapon 'class' and methods */

	function Weapon (value) {
		this.value;
		this.drawClass;
		this.setValue( value );
	}
	Weapon.prototype.setValue  = function ( value ) {
		value = (value) ? value.toLowerCase() : undefined;
		this.value = (value === 'x' || value === 'o') ? value : 'noWeapon';
 		this.drawClass = this.value + 'Class'; // change css class with proper drawing
	};

	Weapon.prototype.getValue = function () {
		return this.value;
	};

	Weapon.prototype.draw = function () {
		this.classList.add(this.drawClass);
	}


	/* create game modules  */

	const weaponChooser = ( function () {
		let xWeapon, oWeapon;
		let weapons = [];

		let pubInit = function ( document ) {
			xWeapon = document.getElementById('xWeapon');
			oWeapon = document.getElementById('oWeapon');

			weapons.push( xWeapon );
			weapons.push( oWeapon );

			weapons.forEach( function ( element ) {
				extend( element, new Weapon() );
				element.onclick = getWeapon;
			});

			xWeapon.setValue('x');
			oWeapon.setValue('o');

			draw();

		};


		function draw () {
			weapons.forEach( function (element) {				
				element.draw();
			});
		}
		

		function getWeapon () {
			console.log(this);
			return this;
		}


		return {
			init: pubInit
		}

	}());


	/* extend table cells */
	let cells = Array.from(document.querySelectorAll('td'));
	cells.forEach(function (element) {
		extend( element, new Weapon() );
	});

	const gameBoard = ( function () {
		/* pvt */

		let table, boardCells = [];

		let checkWin = function () {
			console.log('cheking win');
		};

		let HTMLtableToArray = function () {
			let curr;
			for (let i = 0; i < table.rows.length; i += 1) {
				curr = table.rows[i];
				for (let j = 0; j < curr.cells.length; j += 1) {
					boardCells.push(curr.cells[j].getValue());
				}
			}		
		};

		/* pub */

		let pubInit = function ( document ) {
			table = document.getElementById('tttTable');
			HTMLtableToArray();

		};

		function pubPlayWeapon ( index, weapon ) {
			console.log('play a weapon');
			checkWin();
		};

		function pubDrawBoard () {
			console.log('drawing board');
		};

		return {
			init: pubInit,
			play: pubPlayWeapon,
			draw: pubDrawBoard
		}


	}());

	let Player = function ( wpn ) {
		let weapon = new Weapon( wpn ); 
		let score = 0;

		return {
			weapon: weapon,
			score: score
		}
	};

	const humam = new Player('o');
	const cpu = new Player();

	// call after player choose a weapon
	cpu.configWeapon = function ( player ) {
		this.weapon.setValue(
				(player.weapon.value === 'x') ? 
				'o' : 'x'
			);
	};

	weaponChooser.init( document );
	gameBoard.init( document );

	

	/* helper functions */
	function extend (target, extension) {
		for (var key in extension) {
			target[key] = extension[key];
		}
	}


})()