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
<script src="box2dsetup.js"></script>
<script src="b2d.js"></script>
<script src="body.js"></script>
<script src="character.js"></script>
<script>




		


b2d.rect({
	x : 0,
	y : 480,
	w : 800,
	h : 20
});
var player = new Character({
	bodies : [{
		x : 100,
		y : 440,
		w : 50,
		h : 40,
		type : 'dynamic'
	},{
		x : 100,
		y : 400,
		w : 50,
		h : 40,
		type : 'dynamic',
		fixedRotation : true
	}],
	joint : 'distance',
	distance : 2
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