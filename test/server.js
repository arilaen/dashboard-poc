var jsonServer = require('json-server');

var server = jsonServer.create();

server.use(jsonServer.defaults());

var rolesArrayOfArrays = require('./user_assignments.json');
var lookup = {};
for (var i = 0, len = rolesArrayOfArrays.length; i < len; i++) {
  lookup[rolesArrayOfArrays[i][0].user_assignment.project_id] = rolesArrayOfArrays[i];
}

server.get('/projects/:id/user_assignments', function (req, res) {
  var user_assignments = lookup[req.params.id];
  if (user_assignments) {
    res.jsonp(user_assignments);
  } else {
    res.sendStatus(404);
  }
});

var router = jsonServer.router({projects:require('./projects.json')});

server.use(router);

server.listen(3000);
console.log('Json server listening on port 3000');
