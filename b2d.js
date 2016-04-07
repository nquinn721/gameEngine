
function B2D() {
	
}

B2D.prototype = {

	create : function(obj) {
		var bodyDef = obj.bodies ? this.body(obj.bodies[0]) : this.body(obj),
			fixtures = [],
			joints = [];

		if(obj.bodies)
			for(var i = 0; i < obj.bodies.length; i++){
				fixtures.push(this.fixture(obj.bodies[i], bodyDef));
			}
		else
			fixtures.push(this.fixture(obj, bodyDef));



		if(obj.joints){
			for(var i = 0; i < obj.joints.length; i++){
				var jointConfig = obj.joints[i],
					jointIds = jointConfig.connects.split(' '),
					body1 = this.getBody(bodies, jointIds[0]),
					body2 = this.getBody(bodies, jointIds[1]),
					joint = this.joint(jointConfig, body1, body2);
				joints.push(joint);
			}
		}

		var body = world.CreateBody(bodyDef);
		for(var i = 0; i < fixtures.length; i++)
			this.createBody(body, fixtures[i]);

		return {body : body, joints : joints};
	},
	body : function(obj) {
		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body[obj.type ? 'b2_' + obj.type + 'Body' : 'b2_staticBody'];
		bodyDef.userData = obj;
		bodyDef.position.x = (obj.x + (obj.w / 2) || 50) / SCALE;
		bodyDef.position.y = ((obj.y + (obj.h / 2)) || 50) / SCALE;

		if(obj.fixedRotation)
			bodyDef.fixedRotation = true;

		return bodyDef;
	},
	fixture : function(obj, bodyDef) {
		var fixDef = new b2FixtureDef();
		fixDef.density = obj.density || 1;
		fixDef.friction = obj.friction || 0.5;
		

		if(obj.shape === 'circle'){
    		fixDef.shape = new b2CircleShape(obj.r / SCALE || 5 / SCALE);
		}else{
			fixDef.shape = new b2PolygonShape();
			fixDef.shape.SetAsBox((obj.w / 2 || 20) / SCALE, (obj.h / 2 || 20) / SCALE, new b2Vec2((obj.x + (obj.w / 2) || 50) / SCALE, ((obj.y + (obj.h / 2)) || 50) / SCALE), 0);
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
	    if(obj.frequencyHz)
	    	joint.frequencyHz = obj.frequencyHz;
	    if(obj.dampingRatio)
	    	joint.dampingRatio = obj.dampingRatio;

	    world.CreateJoint(joint);
	    return joint;
	},
	getBody : function(bodies, id) {
		for(var i = 0; i < bodies.length; i++){
			var body = bodies[i].GetUserData();

			if(body.id === id)return bodies[i];
		}
	},
	createBody : function(body, fixDef) {
		body.CreateFixture(fixDef);
	}
}

var b2d = new B2D;