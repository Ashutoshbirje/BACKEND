const express = require('express')

const app = express()
const port = 3000

////////////////////////// Built-In Middleware ////////////////////////// 

// loading middleware into the app --> Order is important
// Below inbuilt middleware is used to parse json file 
app.use(express.json());

////////////////////////// Application Level Middleware ////////////////////////// 

// middleware - logging, auth, validation
const loggingMiddleware = function(req,res,next) {
    console.log('LOGGING IN')
    // res.send("I GOT RESPONSE") --> Act as a break B/W REQ AND RES
    // Move to next middleware
    next();
}

const authMiddleware = function(req,res,next) {
    console.log('authentivation done')
    // res.send("I GOT RESPONSE") --> Act as a break B/W REQ AND RES
    // Move to next middleware
    next();
}

const validationMiddleware = function(req,res,next) {
    console.log('validation done')
    // res.send("I GOT RESPONSE") --> Act as a break B/W REQ AND RES
    // Move to next middleware
    next();
}

// Used to load middleware into application
app.use(loggingMiddleware);
app.use(authMiddleware);
app.use(validationMiddleware);

app.get('/', (req, res) => {
    // print req body (contain JSON information)
    console.log("Main route")
    console.log(req.body)
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})