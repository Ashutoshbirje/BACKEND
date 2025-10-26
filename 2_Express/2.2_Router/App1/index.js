// Entry point
const express = require('express')
const app = express()
const port = 3000

// import item router file 
const item = require('./Router/item')
const birds = require('./Router/birds')

// load into application
app.use('/api', item)
// About 
// --> /api/ --> item home page 
// --> /api/item --> item post request
// --> /api/item/id --> put/delete request

app.use('/api1', birds)
// About 
// --> /api1/ --> bird home page 
// --> /api1/about--> bird get request



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
