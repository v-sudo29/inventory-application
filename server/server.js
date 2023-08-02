require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

const indexRouter = require('./routes/index')

// Connect to database
const uri = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(uri)

app.use(cors())
app.use(express.json())
app.use('/', indexRouter)

app.listen(3001, () => {
  console.log('Server is running')
})