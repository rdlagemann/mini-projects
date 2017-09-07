( function () {
	console.log('script loaded');

	const gameManager = {
		table: document.getElementById('tttTable'),
		matrix: [],
		updateMatrix: 'oi'

	}

	initEmptyMatrix.call( gameManager.matrix, 3, 3 );

	HTMLTableToMatrix.call( gameManager );



	/* HELPER FUNCTIONS */

	function HTMLTableToMatrix () {			
		let rowLen = this.table.rows.length,
			colLen = 3,
			currRow;

		for(let i = 0; i < rowLen; i += 1) {
			currRow = this.table.rows[i];
			console.log(currRow.cells[0]);
			for(let j = 0; j < 3; j += 1) {
				this.matrix[i][j] = currRow.cells[j].innerText;
			}
		}
	}


	function initEmptyMatrix (rowLen, colLen) {
		let mat = this;
		if(mat.constructor === Array) {
			console.log('is array');
			for(var i = 0; i < rowLen; i += 1) {
    			mat[i] = [];    	
	    		for(var j = 0; j < colLen; j += 1) {
	       			mat[i][j] = undefined;
	    		}
			}
		}
		else {
			console.log('type error: not array');
		}

		
	}


})()