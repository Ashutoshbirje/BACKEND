var http = require('http');

// create a server object:
const server = http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  console.log('New request is received');
  // console.log(req);
  // console.log(res);
  res.end(); //end the response
}); 

// start the server
server.listen(3000,'127.0.0.1',() =>{
  console.log('Server is Running on PORT 3000');
}); //the server object listens on port 8080 