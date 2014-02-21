

exports.viewLabs = function(req, res) 
{

  // controller code goes here
  var name = req.params.name;
  var stank = req.params.stank;
  var crowd = req.params.crowd;
  
  res.render('labs', {
    'room': name,
    'stank' : stank,
    'crowd' : crowd
  });

};