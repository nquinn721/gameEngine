
function Character(obj) {
	this.body = new Body(obj);
}

Character.prototype = {
	move : function(dir) {
		console.log('move');
		this.isMoving = dir;
	},
	stopMove : function(dir) {
		this.body.setLinearVelocity(null, null);
		this.isMoving = false;
	},
	moveleft : function(speed) {
		this.body.setLinearVelocity(-10);
	},
	moveright : function(speed) {
		this.body.setLinearVelocity(10);
	},
	duck : function() {
		this.setPosition(0, 40);
	},
	jump : function() {
		if(!this.jumped)
			this.body.applyImpulse(0, -3000);

	},
	
	tick : function() {
		if(this['move' + this.isMoving])
			this['move' + this.isMoving]();
	}
}
