const gameBoard = (function() {

	// useful references
	let table, cells, currentPlayer, humanPlayer, cpuPlayer;
	let humanScore, cpuScore;

	// functions to check game stats
	const checkLines = tttHelper.checkLines.bind( {}, weaponEquality );
	const checkColumns = tttHelper.checkColumns.bind( {}, weaponEquality );
	const checkMainDiagonal = tttHelper.checkMainDiagonal.bind( {}, weaponEquality );
	const checkInverseDiagonal = tttHelper.checkInverseDiagonal.bind( {}, weaponEquality );

	// initialize this module
	const pubInit = function init(context, player, playerCPU) {
		table = context.document.getElementById('tttTable');
		cells = context.document.querySelectorAll('td');
		humanScore = context.document.getElementById('humanScore');
		cpuScore = context.document.getElementById('cpuScore');

		humanPlayer = player;
		cpuPlayer = playerCPU;

		// extend and config table cells 
		Array.from(cells).forEach(function(element) {
			extend( element, new Weapon() );
			element.draw();			
			element.addEventListener('click', playWeapon);
		});
	};
	
	const getFreeCells = function freecells(){
		let res = Array.from(cells).filter( element => element.value === 'noWeapon' );
		return res;
	}

	const checkWin = function check(cells) {
		if (checkLines(cells).win){
			console.log('win in lines');
			return true;
		}
		else if (checkColumns(cells).win){
			console.log('win in columns');
		 	return true;
		}
		else if (checkMainDiagonal(cells).win){
			console.log('win at main diag');	
		 	return true;
		}
		else if (checkInverseDiagonal(cells).win){
			console.log('win at inverse diag');
			return true;
		}
		else if (getFreeCells().length === 0) {
			console.log('check free cells -> is a tie');
			return false;
		}
	};

	const clearBoard = function clear() {
		Array.from(cells).forEach(function(element) {
			element.setValue();
			element.draw();
		});

		Array.from(cells).forEach(function(element) {
			console.log(element.value);
		})
	}

	const pubReset = function reset() {
		cpuScore.innerText = 0;
		humanScore.innerText = 0;
		clearBoard();
	}

	
	const cpuPlay = function playcpu() {
		// TODO: Implement AI
		let freeCells = getFreeCells();

		if (freeCells.length <= 1) {
			return;
		}				

		let len = cells.length,
			index = 0,
			isValid = false

		while (!isValid) {
		
			index = Math.floor( Math.random() * freeCells.length );

			if (freeCells[index].value === 'noWeapon') {
				isValid = true;
				freeCells[index].setValue( cpuPlayer.weapon.value );
				freeCells[index].draw();
				if (checkWin( cells )) {
					cpuScore.innerText = Number(cpuScore.innerText) + 1;
					clearBoard();
				}
			}
		}
	};

	const playWeapon = function playw() {
		if (this.value === 'noWeapon') {
			this.setValue( humanPlayer.weapon.value );
			this.draw();

			if( checkWin( cells ) ){
				humanScore.innerText = Number(humanScore.innerText) + 1;
				clearBoard();

				return;
			}
			else{
				cpuPlay();	
			}				
		}
		else {
			console.log('invalid move');
		}
		
	}

	return {
		name: 'gameBoard',
		init: pubInit,
		reset: pubReset
	}

	}());