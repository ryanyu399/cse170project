// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	console.log(data);
	res.render('index');
};

exports.view = function(req, res){
  res.render('index', {
    'name': 'Fake Friend',
    'image': 'http://lorempixel.com/500/500/people',
    'id': 'pic'
  });
};