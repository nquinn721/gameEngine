
function B2D() {
	
}

B2D.prototype = {

	rect : function(obj) {
		var fixDef = this.fixture(obj),
			bodies = [];

		if(obj.bodies){
			for(var i = 0; i < obj.bodies.length; i++)
				bodies.push(this.createBody(this.body(obj.bodies[i]), fixDef));
		}else{
			bodies.push(this.createBody(this.body(obj), fixDef));
		}

		if(obj.joint)
			for(var i = 0; i < bodies.length; i += 2)
				this.joint(obj, bodies[i], bodies[i + 1]);

		return bodies;
	},
	body : function(obj) {
		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body[obj.type ? 'b2_' + obj.type + 'Body' : 'b2_staticBody'];
		bodyDef.position.x = (obj.x + (obj.w / 2) || 50) / SCALE;
		bodyDef.position.y = ((obj.y + (obj.h / 2)) || 50) / SCALE;
		
		if(obj.fixedRotation)
			bodyDef.fixedRotation = true;
		return bodyDef;
	},
	fixture : function(obj) {
		var fixDef = new b2FixtureDef();
		fixDef.density = obj.density || 1;
		fixDef.friction = obj.friction || 0.5;

		if(obj.shape === 'circle'){
    		fixDef.shape = new b2CircleShape(obj.radius || 5);
		}else{
			fixDef.shape = new b2PolygonShape();
			fixDef.shape.SetAsBox((obj.w / 2 || 20) / SCALE, (obj.h / 2 || 20) / SCALE);
		}
		return fixDef;
	},
	joint : function(obj, body1, body2) {
		var joint = new window['b2' + (obj.joint.substr(0,1).toUpperCase() + obj.joint.substr(1)) + 'JointDef']();
	    joint.Initialize(body1, body2, body1.GetWorldCenter(), body2.GetWorldCenter());

	    if(obj.jointCollide)
			joint.collideConnected = true;
		if(obj.distance)
	    	joint.length = obj.distance;
	    world.CreateJoint(joint);
	},
	createBody : function(bodyDef, fixDef) {
		var body = world.CreateBody(bodyDef);
		body.CreateFixture(fixDef);
		return body;
	}
}

var b2d = new B2D;