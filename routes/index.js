// Get all of our rooms data
var data = require('../data.json');


exports.view = function(req, res){
    var randomBoolean = Math.random() >= 0.5;

    var modal = randomBoolean;
    
	res.render('index', data);
};