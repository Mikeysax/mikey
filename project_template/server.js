var express = require('express');
var path = require('path');
var app = express();

var static_path = path.join(__dirname, "");

app.use(express.static(static_path))
.get('*', function (req, res) {
  res.sendFile('index.html', {
    root: static_path
  });
})

var server = app.listen(process.env.PORT || 8080, function (err) {
  if (err) { console.log(err) };
  var port = server.address().port;
  console.log('Listening at localhost:' + port);
});

module.exports = server;
