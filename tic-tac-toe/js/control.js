(function (window, Weapon, tttHelper, weaponChooser, gameBoard, undefined) { 

	//	Player prototype and 'class'
	var playerProto = {
		reset: function () {
			this.score = 0;
		}
	}

	const Player = function player ( wpn ) {
		let weapon = new Weapon( wpn ); 
		let score = 0;

		function P(){};
		P.prototype = playerProto; 

		let player = new P();
		player.weapon = weapon;
		player.score = score;

		return player;

	};

	const human = new Player('x');
	const cpu = new Player();

	//some cpu especial functionality, 
	//will select a weapon oposite to the human player one
	cpu.configWeapon = function ( player ) {
		this.weapon.setValue(
				(player.weapon.value === 'x') ? 
				'o' : 'x'
			);
	};


	//	button configs 
	
	const gameArea = document.getElementById('gameArea'),
		  playButton = document.getElementById('playButton'),
		  weaponArea = document.getElementById('weaponArea'),
		  resetButton = document.getElementById('resetButton');

	resetButton.addEventListener('click', function () {
		human.reset();
		cpu.reset();
		gameBoard.reset( window );
		gameArea.classList.add( 'hide' );
		weaponArea.classList.remove( 'hide' );

	});

	playButton.addEventListener('click', function () {
		weaponArea.classList.add( 'hide' );
		gameArea.classList.remove( 'hide' );

		cpu.configWeapon( human );
		gameBoard.init( window, human, cpu);
		
	});


	weaponChooser.init( window, human );


})( window, Weapon, tttHelper, weaponChooser, gameBoard)