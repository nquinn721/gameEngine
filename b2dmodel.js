function Model(obj, parent) {
	this.parent = parent;

	for(var i in obj)this[i] = obj[i];
}

Model.prototype = {
	contact : function() {
		console.log('contact');
	}
}