var _ = require('lodash');
var http = require('http');
var request = require('request');

function addMockRoutes (server) {
  var baseUrl = 'http://leethack-api.azurewebsites.net';
  console.log('Adding mock routes');

  server.get('/api/challenges', function (req, res) {
    var apiKey = req.query.apikey;
    console.log(req.query);
    console.log(req.query.apikey);
    var url = baseUrl + '/api/challenges/' + apiKey;
    console.log(url);
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body));
      }
    });
  });

  server.get('/api/challenges/:id', function (req, res) {
    var apiKey = req.query.apikey;
    var url = baseUrl + '/api/challenges/' + apiKey + '/' + req.params.id;
    console.log(url);
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body));
      }
    });
  });

  server.get('/api/players', function (req, res) {
    request(baseUrl + '/api/players/', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body));
      }
    });
  });

  server.get('/api/players/:id', function (req, res) {
    request(baseUrl + '/api/players/' + req.params.id, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body));
      }
    });
  });
}

var path$1 = require('path');
var multer = require('multer');
var upload = multer(); function addDefaultRoutes (server, debug) {
  server.get('/', function (req, res) {
    res.sendFile(path$1.join(__dirname + '/front/index.html'));
  });

  if (debug) {
    // This is only for testing
    addMockRoutes(server);
  }
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
module.exports = function (port) {
  this.port = port || 8080;

  /**
   *  Launch a new game based on whatever nodes you've selected.
   *  The nodes can create multiple paths of designed correctly and may contain various
   *  paths that the consumers may chose.
   *
   *  @param {object[]} challenges - An array of challenges (<- good documentation!)
   */
  this.launch = function (debug) {
    var server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    setStaticContentPaths(server);
    addDefaultRoutes(server, debug);

    var listener = server.listen(this.port, "192.168.56.1", function (e) {
      var addressInfo = listener.address();
      console.log('Never dull server running on "http://localhost:' + addressInfo.port);
    });
  };
};