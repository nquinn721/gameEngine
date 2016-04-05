

console.log(Box2D);
var canvas = document.getElementById('game'),
	ctx = canvas.getContext('2d');
var SCALE = 30, world,
	canvasHeight = $('#game').height(),
	canvasWidth = $('#game').width(),
	viewHeight = $('#viewport').height(),
	viewWidth = $('#viewport').width(),
	canvas = $('canvas');

var debug = document.getElementById('debug');

var world = new b2World(new b2Vec2(0.0, 10.0));


// Create ground


// Setup debug draw
var debugDraw = new b2DebugDraw();
debugDraw.SetSprite(debug.getContext('2d'));
debugDraw.SetDrawScale(SCALE);
debugDraw.SetFillAlpha(0.5);
debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
world.SetDebugDraw(debugDraw);



function tick () {
	world.DrawDebugData();
	world.Step(1/60, 10, 10);
	world.ClearForces();
	requestAnimationFrame(tick);			
}	

tick();

var keyCodes = {
	 87 : 'w',
	 68 : 'd',
	 83 : 's',
	 65 : 'a',
	 69 : 'e',
	 81 : 'q',
	 70 : 'f',
	 90 : 'z',
	 88 : 'x',
	 71 : 'g',
	 38 : 'up',
	 39 : 'right',
	 40 : 'down',
	 37 : 'left',
	 32 : 'space',
	 13 : 'enter',
	 18 : 'shift',
	 16 : 'ctrl'

}
