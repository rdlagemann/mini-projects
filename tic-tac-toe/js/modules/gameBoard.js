const gameBoard = (function() {

	// useful references
	let context, table, cells,
		currentPlayer, humanPlayer, cpuPlayer,
		humanScore, cpuScore;

	const checker = {};

	// functions to check game stats
	checker.checkLines = tttHelper.checkLines.bind( {}, weaponEquality );
	checker.checkColumns = tttHelper.checkColumns.bind( {}, weaponEquality );
	checker.checkMainDiagonal = tttHelper.checkMainDiagonal.bind( {}, weaponEquality );
	checker.checkInverseDiagonal = tttHelper.checkInverseDiagonal.bind( {}, weaponEquality );

	// initialize this module
	const pubInit = function init(con, player, playerCPU) {
		context = con;
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
		return Array.from(cells).filter( element => element.getValue() === 'noWeapon' );
	};

	const checkWin = function check(cells) {
		let checkTest,
			result = {
				win: undefined,
				shouldReset: false
			}

		for (let key in checker) {
			if ( typeof checker[key] === 'function') {
				checkTest = checker[key](cells);
			}
			if (checkTest.win) {
				break;
			}
		}

		if(checkTest.win) {
			console.log(currentPlayer._name + ' WIN at ' + checkTest.where._index + " " + checkTest.where._orientation);
			result.win = true;
			result.shouldReset = true;

			return result;
		}

		else if (!checkTest.win && (getFreeCells().length === 0)) {
			context.alert('TIE!');
			
			result.win = false;
			result.shouldReset = true;

			return result;
		}
		
		return result;
	};

	const clearBoard = function clear() {
		Array.from(cells).forEach(function(element) {
			element.setValue();
			element.draw();
		});
	};

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

		currentPlayer = cpuPlayer;				

		let len = cells.length,
			index = 0,
			isValid = false,
			result;

		while (!isValid) {
		
			index = Math.floor( Math.random() * freeCells.length );

			if (freeCells[index].getValue() === 'noWeapon') {
				isValid = true;
				freeCells[index].setValue( cpuPlayer._weapon.getValue() );
				freeCells[index].draw();

				result = checkWin( cells );

				if (result.win) {
					cpuScore.innerText = parseInt(cpuScore.innerText) + 1;
					clearBoard();
				}
				else if (result.shouldReset) {
					clearBoard();
				}
			}
		}

		currentPlayer = humanPlayer;
	};

	const playWeapon = function playWeapon() {
		if (this.getValue() === 'noWeapon') {
			
			this.setValue( humanPlayer._weapon.getValue() );
			this.draw();

			let result = checkWin( cells );

			if (result.win) {
				humanScore.innerText = parseInt(humanScore.innerText) + 1;
				clearBoard();

				return;
			}
			else if (result.shouldReset){
				clearBoard();
			}
			else {
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