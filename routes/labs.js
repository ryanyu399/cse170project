exports.viewLabs = function(req, res) {

  // controller code goes here
  var name = req.params.name;

  console.log("The project name is: " + name);
  res.render('labs', {
    'projectName': name
  });

};