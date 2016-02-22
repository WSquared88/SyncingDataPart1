var app = require("http").createServer(handler);
var io = require("socket.io")(app);
var fs = require("fs");
var PORT = process.env.PORT || process.env.NODE_PORT || 3000;

app.listen(PORT);

var score = 0;

function handler(req, res)
{
	fs.readFile(__dirname + "/../client/client.html", function(err, data)
	{
		if(err)
		{
			throw err;
		}
		
		res.writeHead(200);
		res.end(data);
	});
}

io.on("connection", function(socket)
{
	socket.join("room1");
	socket.on("updatePara", function(data)
	{
		score += data.message;
		var messageData = 
		{
			message: score
		};
		
		io.sockets.in("room1").emit("updatePara", messageData);
	});
	
	socket.on("disconnect", function(data)
	{
		socket.leave("room1");
	});
});

console.log("listening on port 3000");