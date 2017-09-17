//		Weapon 'class' and methods 

const Weapon = (function weapon(value) {
	let _value,
		_drawClass;

	function Weapon(value) { 		
		this.setValue( value ) 
	};

	Weapon.prototype = {
		setValue(value) {
			value = (value) ? value.toLowerCase() : undefined;
			this._value = (value === 'x' || value === 'o') ? value : 'noWeapon';
			this._drawClass = this._value + 'Class'; // change css class with proper drawing
		},
		getValue() {
			return this._value;
		},
		draw() {
			this.classList.remove( 'xClass' );
			this.classList.remove( 'oClass' );
			this.classList.remove( 'noWeaponClass' );
			this.classList.add( this._drawClass );
		}
	}

	return Weapon;

})();

// 	represent how a comparsion between two Weapon elements will be made
const weaponEquality = function equality( a, b ) {
	return (a._value === b._value && a._value !== "noWeapon") ? a : false;
}


	