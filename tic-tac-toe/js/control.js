( function () { 
	"use strict";

	/* Weapon 'class' and methods */
	function Weapon (value, drawClass) {
		this.value = value || undefined;
		this.drawClass =  drawClass || 'noWeaponClass';
	}
	Weapon.prototype.setValue  = function ( value ) {
		value = (value) ? value.toLowerCase() : undefined;
		this.value = (value === 'x' || value === 'o') ? value : 'noWeapon';
		console.log(this.value);
		this.drawClass = value + 'Class'; // change css class with proper drawing
	};

	Weapon.prototype.getValue = function () {
		return this.value;
	};

	Weapon.prototype.draw = function () {
		this.classList.add(this.drawClass);
	}

	/* game objects */

	const gameManager = {
		humamTurn: true //humam player aways first
	}

	const gameBoard = {
		table: document.getElementById('tttTable'),
		boardCells: [],
		freeBoardCells: 0,
		matrix: [],
		tableToMatrix: HTMLTableToMatrix,
		initEmptyMatrix: initEmptyMatrix,
		init: function () {
			this.initEmptyMatrix(3, 3);
			this.tableToMatrix();
			let curr;
			for (let i = 0; i < this.table.rows.length; i += 1) {
				curr = this.table.rows[i];
				for (let j = 0; j < curr.cells.length; j += 1) {
					curr.cells[j].setValue();
					this.boardCells.push(curr.cells[j]);
				}
			}

			this.freeBoardCells = this.boardCells.length;
		},
		playWeapon: function ( index, weapon ) {
			this.boardCells[index].setValue( weapon );
			this.freeBoardCells -= 1;
		},
		drawTable: function () {
			console.dir(this.table);
			let curr;
			this.boardCells.forEach( function (element) {
				element.draw();
			})
		},
		restart: function () {
			this.boardCells.forEach( function(element) {
				element.setValue();
				element.draw(); 
			})
		},
		checkWin: function () { console.log('check col, check line, check diag'); }
	}

	const weaponChooser = {
		buttons: Array.from(document.querySelectorAll('.weapon-button')),
		configButtons: configWeaponButtons		
	}

	const player = {
		weapon: 'x',
		score: 0
	}

	const cpu = {
		weapon: undefined,
		score: 0,
		setWeapon: function () {
			this.weapon = (player.weapon === 'x') ? 'o' : 'x';
		},
		play: function ( gameBoard ) {
			if (gameBoard.freeBoardCells <= 1) {
				return;
			}
			// AI logic
			let iRand,
				isValid = false;

			while( !isValid ) {
				iRand = Math.floor(Math.random() * 9);
				if (gameBoard.boardCells[iRand].getValue() === 'noWeapon') {
					isValid = true;
				}
			}

			console.log(gameBoard.boardCells[iRand].getValue());

			gameBoard.playWeapon(iRand, this.weapon );
			gameBoard.drawTable();
		}		
	}

	/* create weapons objects */;
	const oW = new Weapon('o', 'oClass');
	const xW = new Weapon('x', 'xClass');

	// extend basic HTML elements
	extend(xWeapon, xW);
	extend(oWeapon, oW);

	let cells = Array.from(document.querySelectorAll('td'));

	/* create table functionality */
	cells.forEach( function (element, index) {
		extend(element, new Weapon());
		element.onclick = function () {
			if (this.value === 'noWeapon' && gameManager.humamTurn) {
				gameBoard.playWeapon( index, player.weapon );
				// gameManager.humamTurn = false;
				gameBoard.checkWin();
				this.draw();
				cpu.play( gameBoard );
			}			
		}
	});

	console.dir(xWeapon);
	
	xWeapon.draw();
	oWeapon.draw();


	/* button will config the game to start */
	const playButton = document.getElementById('playButton');
	playButton.onclick = function () {
		console.log('lets play!');
		document.getElementById('gameArea').classList.remove('hide');
		this.parentElement.classList.add('hide');
		gameBoard.drawTable.call( gameBoard );
		cpu.setWeapon();
	}


	/* Initialize game properties */	
	gameBoard.init();
	weaponChooser.configButtons( player );

	

	/* FUNCTIONS */
	function extend (target, extension) {
		for (var key in extension) {
			target[key] = extension[key];
		}
	}

	function configWeaponButtons ( player ) {
		"use strict";
		this.buttons.forEach( function(elem, _, arr) {
			let currElem = elem;
			elem.onclick = function () {
				arr.forEach( function ( elem, _, arr) {
					if ( elem === currElem ) {
						elem.classList.add('weapon__selected');
						player.weapon = elem.value;
					}
					else {
						elem.classList.remove('weapon__selected');
					}
				})
				console.log(player.weapon);
			}
		})
	}

	function HTMLTableToMatrix () {	
		"use strict";
		if (!this.table || !this.matrix) {
			return undefined;
		}	

		let rowLen = this.table.rows.length,
			currentRow,
			colLen;

		for(let i = 0; i < rowLen; i += 1) {
			currentRow = this.table.rows[i];
			colLen = currentRow.cells.length;
			for(let j = 0; j < colLen; j += 1) {
				this.matrix[i][j] = currentRow.cells[j].getValue();
			}
		}
	}


	function initEmptyMatrix (rowLen, colLen) {
		"use strict";
		let mat = this.matrix;
		if(mat.constructor === Array) {
			for(var i = 0; i < rowLen; i += 1) {
    			mat[i] = [];    	
	    		for(var j = 0; j < colLen; j += 1) {
	       			mat[i][j] = undefined;
	    		}
			}
		}
		else {
			throw new TypeError("Cannot build a matrix from 'this'");
		}

	}


})()