// Get all of our rooms data
var data = require('../data.json');

exports.viewLabs = function(req, res) 
{
  // controller code goes here
  var name1 = req.params.name;
  var stank = req.params.stank;
  var crowd = req.params.crowd;
  var desc = data.projects[0].description;
  var modal = true;
  
  res.render('labs', {
    'modal': modal,
    'room': name1,
    'stank' : stank,
    'crowd' : crowd,
    'description': desc
  });

};

exports.viewPage = function(req, res) 
{
  // controller code goes here
  var name1 = req.params.name;
  var stank = req.params.stank;
  var crowd = req.params.crowd;
  var desc = data.projects[0].description;
  var modal = false;
  
  res.render('labs', {
    'modal': modal,
    'room': name1,
    'stank' : stank,
    'crowd' : crowd,
    'description': desc
  });

};
