// Get all of our rooms data
var data = require('../data.json');

exports.viewLabs = function(req, res) 
{
  // controller code goes here
  var name1 = req.params.name;
  var stank = req.params.stank;
  var crowd = req.params.crowd;
  var desc = data.projects[0].description;
  
  res.render('labs', {
    'room': name1,
    'stank' : stank,
    'crowd' : crowd,
    'description': desc
  });

};