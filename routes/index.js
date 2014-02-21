// Get all of our rooms data
var data = require('../data.json');

exports.view = function(req, res){
	console.log(data);
	res.render('index');
};

exports.view = function(req, res){
  res.render('index', data);
};