var Class = function() {
    this.initialize && this.initialize.apply(this, arguments);
};

Class.extend = function(childPrototype) {
    var parent = this;
    var child = function() {
		return parent.apply(this, arguments);
    };
    child.extend = parent.extend;
    var Surrogate = function() {};
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;
    for(var key in childPrototype){
        child.prototype[key] = childPrototype[key];
    }

    if (!child.prototype.initialize)
	  child.prototype.initialize = function() {};

    return child;
};
