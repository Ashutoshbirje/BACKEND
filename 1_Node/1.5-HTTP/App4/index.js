var http = require('http');
var fs = require('fs');

const data = fs.readFileSync('./Template/index.html','utf-8');

// create a server object:

const server = http.createServer(function (req, res) {
      
     let path = req.url;// location of URL

      if(path === '/' || path.toLocaleLowerCase() === '/home'){
        res.end(data.replace('{{%CONTENT%}}',"Home Page")); //write a response to the client and end the response
      } else if (path.toLocaleLowerCase() === '/about') {
        res.end(data.replace('{{%CONTENT%}}',"About Page")); //write a response to the client and end the response
      } else if (path.toLocaleLowerCase() === '/contact') {
        res.end(data.replace('{{%CONTENT%}}',"Contact Page")); //write a response to the client and end the response
      } else {
        res.end(data.replace('{{%CONTENT%}}',"Page Not Found")); //write a response to the client and end the response
      }
    
}); 

// start the server
server.listen(3000,'127.0.0.1',() =>{
  console.log('Server is Running on PORT 3000');
}); //the server object listens on port 8080 