/* create game modules  */
const weaponChooser = (function() {
	// not initialized variables
	let xWeapon, oWeapon;
	let weapons = [];
	let player;
	
	const pubInit = function( context, human ) {
		player = human;

		/* just two weapon types, so let's hard code */
		xWeapon = context.document.getElementById('xWeapon');
		oWeapon = context.document.getElementById('oWeapon');

		weapons.push( xWeapon );
		weapons.push( oWeapon );

		weapons.forEach( function( element ) {
			extend( element, new Weapon() );
			element.addEventListener( 'click', getWeapon );
		});

		xWeapon.setValue( 'x' );
		oWeapon.setValue( 'o' );

		draw();

	};


	const draw = function() {
		weapons.forEach( function( element ) {				
			element.draw();
		});
	}
	

	const getWeapon = function() {
		var selected = this;

		selected.classList.add( 'weapon__selected' );

		weapons.forEach( function( element ) {
			if (element !== selected) {
				element.classList.remove( 'weapon__selected' );
			}
		});

		player.weapon.setValue( selected.getValue() );
	}

	return {
		name: 'weaponChooser',
		init: pubInit
	}

}());