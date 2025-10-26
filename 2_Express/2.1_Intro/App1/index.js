// Entry point

// USE express module in this file 
const express = require('express')

// Initialization of App
const app = express()

// PORT : localhost:3000
const port = 3000

// 
app.get('/', (req, res) => {
  // console.log(res)
  res.send('Hello World!')
})

// REQUEST : GET / PUT / POST / DELETE
// PATH : / , /about , /article, /other

// start your app or server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})