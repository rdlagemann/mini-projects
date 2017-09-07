( function () { 
	"use strict";

	const gameBoard = {
		table: document.getElementById('tttTable'),
		matrix: [],
		tableToMatrix: HTMLTableToMatrix,
		initEmptyMatrix: initEmptyMatrix,
		init: function () {
			this.initEmptyMatrix(3, 3);
			this.tableToMatrix();
		},
		checkWin: function () { console.log('check col, check line, check diag')}
	}

	const weaponChooser = {
		buttons: Array.from(document.querySelectorAll('.weapon-button')),
		configButtons: configWeaponButtons		
	}

	const player = {
		weapon: undefined
	}


	const playButton = document.getElementById('playButton');
	playButton.onclick = function () {
		console.log('lets play!');
	}


	/* Initialize game properties */	
	gameBoard.init();
	weaponChooser.configButtons( player );

	//debug
	console.log(gameBoard.matrix);




	/* FUNCTIONS */

	function configWeaponButtons ( player ) {
		"use strict";
		this.buttons.forEach( function(elem, _, arr) {
			let currElem = elem;
			elem.onclick = function () {
				arr.forEach( function ( elem, _, arr) {
					if ( elem === currElem ) {
						elem.classList.add('weapon__selected');
						player.weapon = elem.innerText;
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
				this.matrix[i][j] = currentRow.cells[j].innerText;
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