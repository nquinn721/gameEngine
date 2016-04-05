
function Character(obj) {
	this.body = new Body(obj);
}

Character.prototype = {
	move : function(dir) {
		console.log('move');
		this.isMoving = dir;
	},
	stopMove : function(dir) {
		for(var i = 0; i < this.body.bodies.length; i++)
			this.body.setLinearVelocity(null, null, i);
		this.isMoving = false;
	},
	moveleft : function(speed) {
		this.body.setLinearVelocity(-10);
	},
	moveright : function(speed) {
		this.body.setLinearVelocity(10);
	},
	duck : function() {
		this.setPosition(0, 40, 1);
	},
	jump : function() {
		this.body.applyForce(0, -3000);
	},
	
	tick : function() {
		if(this['move' + this.isMoving])
			this['move' + this.isMoving]();
	}
}
