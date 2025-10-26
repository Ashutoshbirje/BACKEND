// Entry point
const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// Request :
app.get('/',(req,res) => {
  // Response
  // res.send('GET request')
  res.sendFile('/dummy.html',{root:__dirname});
  // res.sendFile(__dirname+"/index.html")
})

// Request :
app.post('/item',(req,res) => {
  // Response
  // res.send('POST request')
  res.json({x:1, y:2, z:3})
})

// Request :
app.put('/item/:id',(req,res) => {
  // Response
  res.send('PUT request')
})

// Request :
app.delete('/item/:id',(req,res) => {
  // Response
  res.send('DELETE request')
})

// Chaining of the response is possible
// app.get().post().put().delete()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// inspect >> network >> 