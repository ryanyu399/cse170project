exports.viewLabs = function(req, res) {

  // controller code goes here
  var name = req.params.id;

  console.log("Lab Room is " + name);
  res.render('labs', {
    'projectName': name
  });

};