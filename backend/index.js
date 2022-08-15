const connectToMongo = require("./db");

connectToMongo();
const express = require('express');
const cors = require('cors');
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())

//Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/products',require('./routes/products'))
app.use('/api/cart',require('./routes/cart'))
app.use('/api/order',require('./routes/order'))

app.listen(port, () => {
  console.log(`HUNGREZY app listening at http://localhost:${port}`)
})