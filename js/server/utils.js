
module.exports = {
    printfObject: function(object) {

	    var output = this.printfObject2(object);

	    console.log(output);
    },

    printfObject2: function(object) {

	    var output = '';
	    for (var property in object) {
		    if (object[property] instanceof Object)
			    output += this.printfObject2(object[property]);
		    else
 	 		    output += property + ': ' + object[property] + '\n';
	    }

	    return output;
    }
}