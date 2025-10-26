const express = require('express')
const router = express.Router()

  router.get('/',(req,res) => {
    // Response
    res.send('GET request')
    // res.sendFile('../dummy.html',{root:__dirname});
    // res.sendFile(__dirname+"/index.html")
  })
  
  router.post('/item',(req,res) => {
    // Response
    // res.send('POST request')
    res.json({x:1, y:2, z:3})
  })
  
  router.put('/item/:id',(req,res) => {
    // Response
    res.send('PUT request')
  })
  
  router.delete('/item/:id',(req,res) => {
    // Response
    res.send('DELETE request')
  })

module.exports = router