var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , url = require('url')
  , path = require('path');

app.listen(80);

function route(handle, pathname) {  
  console.log("About to route a request for " + pathname);  
  if (typeof handle[pathname] === 'function') {    
    handle[pathname]();
  } else {
    console.log("No request handler found for " + pathname);
  }
}

exports.route = route;

function handler (req, res) {

  var filePath = '.' + req.url;
  if (filePath == './')
      filePath = './index.html';
       
  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch (extname) {
      case '.js':
          contentType = 'text/javascript';
          break;
      case '.css':
          contentType = 'text/css';
          break;
  }
   
  path.exists(filePath, function(exists) {
   
      if (exists) {
          fs.readFile(filePath, function(error, content) {
              if (error) {
                  res.writeHead(500);
                  res.end();
              }
              else {
                  res.writeHead(200, { 'Content-Type': contentType });
                  res.end(content, 'utf-8');
              }
          });
      }
      else {
          res.writeHead(404);
          res.end();
      }

  });

}

var isVotingEnabled = false;

io.sockets.on('connection', function (socket) {
  socket.on('enableButtons', function (data) {
    isVotingEnabled = true;
    io.sockets.emit("enableButtons");
  });
  socket.on('vote', function (data) {
    io.sockets.emit("vote", data);
  });
  socket.on('getVoteStatus', function (data) {
    socket.emit("returnVoteStatus", { 
      "isVotingEnabled": isVotingEnabled
    });
  });
});