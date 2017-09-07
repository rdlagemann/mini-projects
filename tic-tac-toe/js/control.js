( function () {
	console.log('script loaded');

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

	const player = {
		weapon: undefined
	}

	const playButton = document.getElementById('playButton');
	playButton.onclick = function () {
		console.log('lets play!');
	}
	
	
	gameBoard.init();

	console.log(gameBoard.matrix);




	/* HELPER FUNCTIONS */

	function HTMLTableToMatrix () {	
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