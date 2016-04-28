function Grid(io) {
	this.grid = [
		[],[],
		[],[]
	];

	this.io = io;
	this.frames = 0;
}

Grid.prototype = {
	// Add/Remove
	add : function(num, item) {
		this.grid[num].push(item);
	},
	addPlayer : function(player) {
		this.add(player.gridNum, player);
		this.updateRoom(player);
	},
	remove : function(num, item) {
		this.grid[num].splice(this.grid[num].indexOf(item), 1);
	},
	removePlayer : function(player) {
		this.remove(player.gridNum, player);
		this.updateRoom(player);
	},
	updatePlayer : function(player) {
		this.removePlayer(player);
		this.addPlayer(player);
	},
	// End Add/Remove

	updateRoom : function(player) {
		var playerObjects = this.get(player.gridNum, true);
		this.io.in(player.gridName).emit('players', playerObjects);
	},
	// Could be heavy
	updateAllRooms : function() {
		for(var i = 0, total = this.grid.length; i < total; i++)
			this.io.in('grid' + i).emit(this.get(i, true));
	},
	find : function(id) {
		for(var i = 0; i < this.grid.length; i++)
			for(var j = 0; j < this.grid[i].length; j++)
				if(this.grid[i][j].id === id)return {num : j, player : this.grid[i][j]};
	},
	get : function(num, clientObj) {
		var objs = [],
			grid = this.grid[num];

		if(clientObj){
			grid.forEach(function(item) {
				objs.push(item.client());
			});
			return objs;
		}
		return grid;
	},
	tick : function() {
		this.frames++;

		if(this.frames % 20)
			this.updateAllRooms();
	}
}

module.exports = function(io) {
	return new Grid(io);
}