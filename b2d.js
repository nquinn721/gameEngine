
function B2D() {
	
}

B2D.prototype = {

	create : function(obj) {

		if(obj.body)
			return this.createBodyMultipleFixtures(obj);

		if(obj.bodies)
			return this.createBodies(obj);


		



		// if(obj.joints){
		// 	for(var i = 0; i < obj.joints.length; i++){
		// 		var jointConfig = obj.joints[i],
		// 			jointIds = jointConfig.connects.split(' '),
		// 			body1 = this.getBody(bodies, jointIds[0]),
		// 			body2 = this.getBody(bodies, jointIds[1]),
		// 			joint = this.joint(jointConfig, body1, body2);
		// 		joints.push(joint);
		// 	}
		// }

		
	},
	createBodies : function(obj) {
		var bodies = [];

		for(var i = 0; i < obj.bodies.length; i++){
			var bodyDef = this.body(obj.bodies[i]),
				fixtureDef = this.fixture(obj.bodies[i]),
				body = world.CreateBody(bodyDef);

			bodies.push(this.createBody(body, fixtureDef));
		}

		return {bodies : bodies};
		
	},
	createBodyMultipleFixtures : function(obj) {
		var bodyDef = this.body(obj.body[0]);

		this.fixtures = [];

		for(var i = 0; i < obj.body.length; i++)
			this.fixtures.push(
				this.fixture(
					obj.body[i], i > 0 && obj.body[i].type === 'dynamic' ? true : false
				)
			);
		
		var body = world.CreateBody(bodyDef);
		for(var i = 0; i < this.fixtures.length; i++)
			this.createBody(body, this.fixtures[i]);

		return {body : body};	
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
	fixture : function(obj, oriented) {
		var fixDef = new b2FixtureDef();
		fixDef.density = obj.density || 1;
		fixDef.friction = obj.friction || 0.5;
		fixDef.x = obj.x;
		fixDef.y = obj.y;
		
		if(obj.shape === 'circle'){
    		fixDef.shape = new b2CircleShape(obj.r / SCALE || 5 / SCALE);
		}else{
			fixDef.shape = new b2PolygonShape();
			if(!oriented)
				fixDef.shape.SetAsBox((obj.w / 2 || 20) / SCALE, (obj.h / 2 || 20) / SCALE);
			else{
				fixDef.shape.SetAsOrientedBox(
					(obj.w / 2 || 20) / SCALE, 
					(obj.h / 2 || 20) / SCALE, 
					new b2Vec2(
						(this.fixtures[0].x - obj.x)  / SCALE, 
						(this.fixtures[0].y - obj.y) / SCALE
					), 
					0);
			}
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