var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
//var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
//server.listen(port)

//console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created");

var count = 0;
var interval = 3000;

wss.on("connection", function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify({time:new Date(),mymsg:count}), function() {  })
  }, interval)

  console.log("test websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
});

function doStuff(){
	count+=1;
	console.log('doing stuff', count);
}

function myTimeoutFunction(){
    doStuff();
    setTimeout(myTimeoutFunction, interval);
}

myTimeoutFunction();
