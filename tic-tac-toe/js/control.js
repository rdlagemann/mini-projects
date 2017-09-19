
const Player = (function player () {	
	let _name,
		_weapon;

	function Player(name, weapon){ 
		this._name = name;
		this._weapon = new Weapon( weapon );
	}

	Player.prototype = {
		configWeaponBasedOn( player ) {
			this._weapon.setValue( (player._weapon.getValue() === 'x') ? 'o' : 'x' );
		}
	}

	return Player;

})();

const human = new Player('human', 'x');
const cpu = new Player('cpu', 'o');


(function(window, undefined) { 

	const gameArea = document.getElementById('gameArea'),
		  playButton = document.getElementById('playButton'),
		  weaponArea = document.getElementById('weaponArea'),
		  resetButton = document.getElementById('resetButton'),
		  footer = document.querySelector('footer');

	resetButton.addEventListener('click', function () {
		gameBoard.reset( window );
		gameArea.classList.add( 'hide' );
		weaponArea.classList.remove( 'hide' );
		footer.classList.remove( 'hide' );
	});

	playButton.addEventListener('click', function () {
		weaponArea.classList.add( 'hide' );
		gameArea.classList.remove( 'hide' );
		footer.classList.add( 'hide' );


		cpu.configWeaponBasedOn( human );
		gameBoard.init( window, human, cpu);
		
	});


	weaponChooser.init( window, human );


})(window)