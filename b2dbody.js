function Body(obj) {
	this.bodies = b2d.rect(obj);
}

Body.prototype = {
	setLinearVelocity : function(x, y, body) {
		this.bodies[body || 0].SetLinearVelocity(new b2Vec2(x || 0, y || 0));
	},
	applyForce : function(x, y, body) {
		this.bodies[body || 0].ApplyForce(new b2Vec2(x || 0, y || 0), this.bodies[body || 0].GetWorldCenter());	
	},
	applyImpulse : function(x, y, body) {
		this.bodies[body || 0].ApplyImpulse(new b2Vec2(x || 0, y || 0), this.bodies[body || 0].GetWorldCenter());	
	},
	setPosition : function(x, y, body) {
		var position = this.getPosition(body);
		position.x = (position.x + x) / SCALE;
		position.y = (position.y + y) / SCALE;
		this.bodies[body || 0].SetPosition(position);
	},
	getPosition : function(body) {
		var position = this.bodies[body || 0].GetPosition();
		position.y *= SCALE;
		position.x *= SCALE;
		return position;
	},
	getX : function(body) {
		return this.getRealX(body) / SCALE;
	},
	getY : function(body) {
		return this.getRealY(body) / SCALE;
	},
	getRealX : function(body) {
		return this.bodies[body || 0].GetPosition().y;
	},
	getRealY : function(body) {
		return this.bodies[body || 0].GetPosition().y;
	}
}