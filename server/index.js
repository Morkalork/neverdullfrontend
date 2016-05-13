var path$1 = require('path');
var multer = require('multer');
var upload = multer();

function addDefaultRoutes(server) {
  server.get('/', (req, res) => {
    res.sendFile(path$1.join(__dirname + '/front/index.html'));
  });
}

var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');

function setStaticContentPaths(server) {
  var jsPath = path.join(__dirname, '/front/js');
  var cssPath = path.join(__dirname, '/front/css');
  var assetPath = path.join(__dirname, '/front/assets');

  server.use('/js', express.static(jsPath));
  server.use('/css', express.static(cssPath));
  server.use('/assets', express.static(assetPath));
}

/**
 *  This is the main server. This will let you launch a new game with a bunch of
 *  module nodes.
 */
module.exports = function(port, addMockRoutes) {
  this.port = port || 8080;

  /**
   *  Launch a new game based on whatever nodes you've selected.
   *  The nodes can create multiple paths of designed correctly and may contain various
   *  paths that the consumers may chose.
   *
   *  @param {object[]} challenges - An array of challenges (<- good documentation!)
   */
  this.launch = function() {
    var server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    setStaticContentPaths(server);
    addDefaultRoutes(server);

    var listener = server.listen(this.port, function(e) {
      var addressInfo = listener.address();
      console.log('Never dull server running on "http://localhost:' + addressInfo.port);
    });
  };
};
