function Body(obj) {
	var elements = b2d.create(obj);
	this.element = $.extend({}, obj);
	this.body = elements.body;
	this.joints = elements.joints;
	console.log(this.body);
	for(var i in this)obj[i] = this[i];
}

Body.prototype = {
	contact : function(bodyA, userDataA, bodyB, userDataB) {
		console.log(bodyA, userDataA, bodyB, userDataB);
	},
	setLinearVelocity : function(x, y) {
		this.body.SetLinearVelocity(new b2Vec2(x || 0, y || 0));
	},
	applyForce : function(x, y) {
		this.body.ApplyForce(new b2Vec2(x || 0, y || 0), this.body.GetWorldCenter());	
	},
	applyImpulse : function(x, y) {
		console.log('apply impulse');
		this.body.ApplyImpulse(new b2Vec2(x || 0, y || 0), this.body.GetWorldCenter());	
	},
	setPosition : function(x, y) {
		var position = this.getPosition(body);
		position.x = (position.x + x) / SCALE;
		position.y = (position.y + y) / SCALE;
		this.body.SetPosition(position);
	},
	getPosition : function() {
		var position = this.body.GetPosition();
		position.y *= SCALE;
		position.x *= SCALE;
		return position;
	},
	getX : function() {
		return this.getRealX() / SCALE;
	},
	getY : function() {
		return this.getRealY() / SCALE;
	},
	getRealX : function() {
		return this.body.GetPosition().y;
	},
	getRealY : function() {
		return this.body.GetPosition().y;
	}
}