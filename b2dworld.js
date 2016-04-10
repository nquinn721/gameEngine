function World(world) {
	this.world = new b2World(new b2Vec2(0.0, 10.0));
	this.scale = 30;
	this.stepAmount = 1/60
}


World.prototype = {
	init : function() {
		this.debugDraw();
		this.setupCollisions();
		this.dragNDrop();
		this.tick();	
	},
	createFixture : function(fixture) {
		fixture = this.world.CreateFixture(fixture);
		return fixture;
	},
	createBody : function(body) {
		body = this.world.CreateBody(body);
		return body;
	},
	tick : function () {
		this.world.DrawDebugData();
		this.world.Step(1/60, 10, 10);
		this.world.ClearForces();
		requestAnimationFrame(this.tick.bind(this));			
	},
	debugDraw : function() {
		// Setup debug draw
		var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(debug.getContext('2d'));
		debugDraw.SetDrawScale(SCALE);
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		this.world.SetDebugDraw(debugDraw);

	},
	setupCollisions : function() {
		this.listener = new Box2D.Dynamics.b2ContactListener();
	    // this.listener.PostSolve = function (contact, impulse) {
	    this.listener.BeginContact = function (contact, impulse) {
	        var bodyA = contact.GetFixtureA().GetBody(),
	        	userDataA = bodyA.GetUserData(),
	            bodyB = contact.GetFixtureB().GetBody()
	            userDataB = bodyB.GetUserData();

	        if(userDataA.contact)
            	userDataA.contact(bodyA, userDataA, bodyB, userDataB);
           	if(userDataB.contact)
            	userDataB.contact(bodyA, userDataA, bodyB, userDataB);

	    };
	    this.world.SetContactListener(this.listener);	
	},
	dragNDrop : function() {
		var self = this;
	    var obj = null;
	    var joint = null;

	    function calculateWorldPosition(e) {
	        return point = {
	            x: (e.offsetX || e.layerX) / self.scale,
	            y: (e.offsetY || e.layerY) / self.scale
	        };
	    }

	    debug.addEventListener("mousedown", function (e) {
	        e.preventDefault();
	        var point = calculateWorldPosition(e);
	        self.world.QueryPoint(function (fixture) {
	            obj = fixture.GetBody();
	            console.log(obj);
	        }, point);
	    });

	    debug.addEventListener("mousemove", function (e) {
	        if (!obj) {
	            return;
	        }
	        var point = calculateWorldPosition(e);

	        if (!joint) {
	            var jointDefinition = new b2MouseJointDef();

	            jointDefinition.bodyA = self.world.GetGroundBody();
	            jointDefinition.bodyB = obj;
	            jointDefinition.target.Set(point.x, point.y);
	            jointDefinition.maxForce = 100000;
	            jointDefinition.timeStep = self.stepAmount;
	            joint = self.world.CreateJoint(jointDefinition);
	        }

	        joint.SetTarget(new b2Vec2(point.x, point.y));
	    });

	    debug.addEventListener("mouseup", function (e) {
	        obj = null;
	        if (joint) {
	            self.world.DestroyJoint(joint);
	            joint = null;
	        }
	    });
	}
}


var world = new World;

world.init();
