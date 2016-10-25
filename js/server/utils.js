
module.exports = {
    printfObject: function (object) {

        var output = this.printfObject2(object);

        console.log(output);
    },

    printfObject2: function (object) {

        var output = '';
        for (var property in object) {
            if (object[property] instanceof Object)
                output += this.printfObject2(object[property]);
            else
                output += property + ': ' + object[property] + '\n';
        }

        return output;
    },

    makeId: function (length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}