var http = require('http');
var fs = require('fs');

const data = fs.readFileSync('./Template/index.html','utf-8');

// create a server object:
const server = http.createServer(function (req, res) {
  res.write(data); //write a response to the client
  console.log('New request is received');
  res.end(); //end the response
}); 

// start the server
server.listen(3000,'127.0.0.1',() =>{
  console.log('Server is Running on PORT 3000');
}); //the server object listens on port 8080 