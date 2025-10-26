var http = require('http');

// create a server object:
const server = http.createServer(function (req, res) {
  let path = req.url;// location of URL
  // res.write(path); //write a response to the client

  if(path === '/' || path.toLocaleLowerCase() === '/home'){
    res.end("Home Page"); //write a response to the client and end the response
  } else if (path.toLocaleLowerCase() === '/about') {
    res.end("About Page"); //write a response to the client and end the response
  } else if (path.toLocaleLowerCase() === '/contact') {
    res.end("Contact Page"); //write a response to the client and end the response
  } else {
    res.end("Page Not Found"); //write a response to the client and end the response
  }

  // console.log('New request is received');
  res.end(); // end the response
});

// start the server
server.listen(3000,'127.0.0.1',() =>{
  console.log('Server is Running on PORT 3000');
}); //the server object listens on port 8080 
