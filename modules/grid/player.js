function Player(socket, grid, x, y) {
	this.id = socket.id;
	this.socket = socket;
	this.grid = grid;
	this.coords = {x : x, y : y};
	this.speed = 1;
	this.frame = 0;
}

Player.prototype = {
	tick : function(io) {
		if(this.movedir === 'right')
			this.coords.x += this.speed;
		if(this.movedir === 'left')
			this.coords.x -= this.speed;
		if(this.movedir === 'up')
			this.coords.y -= this.speed;
		if(this.movedir === 'down')
			this.coords.y += this.speed;

		if(this.movedir){
			this.updateGridLocation();
			io.in(this.gridName).emit('moved', this.client());
		}
	},
	updateGridLocation : function() {
		var gridNum = this.getGrid();

		if(gridNum === this.gridNum)return;
		this.frame++;

		if(this.gridNum !== undefined)
			this.grid.removePlayer(this);

		this.gridName = 'grid' + gridNum;
		this.gridNum = gridNum;

		this.socket.join(this.gridName);
		this.grid.addPlayer(this);
	},
	getGrid : function() {
		var num;
		if(this.coords.x < 200 && this.coords.y < 200)
			num = 0;
		if(this.coords.x > 200 && this.coords.y < 200)
			num = 1;
		if(this.coords.x < 200 && this.coords.y > 200)
			num = 2;
		if(this.coords.x > 200 && this.coords.y > 200)
			num = 3;

		return num;
	},
	client : function() {
		return {
			id : this.id,
			coords : this.coords
		}
	},
	move : function(dir) {
		this.movedir = dir;
	},
	stopmove : function() {
		this.movedir = false;
	}
}

module.exports = Player;