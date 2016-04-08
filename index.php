<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Test Game</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script src="box2d.js"></script>
	<style>
	#viewport{
		border:1px solid black;
		width:800px;
		height: 500px;
	}
	canvas {
		position: absolute;
	}
	</style>
</head>
<body>
<div id="viewport">
	<canvas id="game" width='800' height='500'></canvas>
	<canvas id="debug" width='800' height='500'></canvas>
</div>
<script src="b2dDeclarations.js"></script>
<script src="b2dinit.js"></script>
<script src="b2d.js"></script>
<script src="b2dbody.js"></script>
<script src="character.js"></script>
<script>

// var objs = [{
// 	x : 480,
// 	y : 480
// },{
// 	x : 480,
// 	y : 440
// }]

// var bodyDef = new b2BodyDef();
// bodyDef.type = b2Body['b2_dynamicBody'];
// bodyDef.position.x = 480 / SCALE;
// bodyDef.position.y = 480 / SCALE;
		
// var fixDef = new b2FixtureDef();
// fixDef.density = 1;
// fixDef.friction = 0.5;


// fixDef.shape = new b2PolygonShape();
// fixDef.shape.SetAsBox( 20 / SCALE, 20 / SCALE);

// var fixDef1 = new b2FixtureDef();
// fixDef1.density = 1;
// fixDef1.friction = 0.5;


// fixDef1.shape = new b2PolygonShape();
// fixDef1.shape.SetAsOrientedBox( 10 / SCALE, 10 / SCALE, new b2Vec2(-30 / SCALE,-30 / SCALE), 0);


// var body = world.CreateBody(bodyDef);
// body.CreateFixture(fixDef);
// body.CreateFixture(fixDef1);

b2d.create({
	bodies : [{
		x : 0,
		y : 480,
		w : 800,
		h : 20,
		
	},{
		x : 0,
		y : 0,
		w : 20,
		h : 480,
		
	},{
		x : 780,
		y : 0,
		w : 20,
		h : 480,
		
	}]
});
// b2d.create({
// });
var player = new Character({
	body : [{
		id : 'body',
		x : 10,
		y : 400,
		r : 25,
		w : 50,
		h : 40,
		type : 'dynamic',
		density : 150,
		fixedRotation : true,
		shape : 'circle'
	} ,{
		id : 'head',
		x : 10,
		y : 350,
		w : 50,
		h : 40,
		type : 'dynamic',
		density : 150,
		fixedRotation : true
	} ],
	// joints : [{
	// 	connects : 'body head',
	// 	joint : 'distance',
	// 	frequencyHz : 1,
	// 	distance : 2
	// }]
});

$(document).on('keydown', function(e) {
	var key = e.keyCode;
	if(keyCodes[key] === 'w'){
		player.jump();
	}
	if(keyCodes[key] === 'a'){
		player.move('left');
	}
	if(keyCodes[key] === 's'){
		player.duck();
	}
	if(keyCodes[key] === 'd'){
		player.move('right');
	}
}).on('keyup', function(e) {
	player.stopMove();
});


setInterval(function() {
	player.tick();
})
</script>
</body>
</html>