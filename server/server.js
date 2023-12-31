require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const app = express()
const port = 8080
const indexRouter = require('./routes/index')

// Connect to database
const uri = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(uri)

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));

app.use('/', indexRouter)

app.listen(port, () => {
  console.log('Server is running')
})