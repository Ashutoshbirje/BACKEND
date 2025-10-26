const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv')
const PORT = process.env.PORT;
const productRoute = require('./routes/productRoute')

// express
const app = express();
// body parser
app.use(express.json());
// connect to database
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', productRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})