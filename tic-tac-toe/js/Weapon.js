/* Weapon 'class' and methods */
const Weapon = function wpn(value) {
	this.value;
	this.drawClass;
	this.setValue( value );
};

Weapon.prototype.setValue  = function(value) {
	value = (value) ? value.toLowerCase() : undefined;
	this.value = (value === 'x' || value === 'o') ? value : 'noWeapon';
		this.drawClass = this.value + 'Class'; // change css class with proper drawing
};

Weapon.prototype.getValue = function() {
	return this.value;
};

Weapon.prototype.draw = function () {
	this.classList.remove( 'xClass' );
	this.classList.remove( 'oClass' );
	this.classList.remove( 'noWeaponClass' );
	this.classList.add(this.drawClass);
};


	