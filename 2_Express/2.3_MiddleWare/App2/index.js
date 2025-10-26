const express = require('express')

const app = express()
const port = 3000

// Route - specific Middleware

const route = require('./routes/route')

app.use('./api',route)

// -> /api/student
// -> /api/admin

app.get('/', (req, res) => {
    // print req body (contain JSON information)
    console.log("Main route")
    console.log(req.body)
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})