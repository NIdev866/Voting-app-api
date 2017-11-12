const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const index = require('./routes/index')
const polls = require('./routes/polls')
const cors = require('cors')
require('dotenv').config()

const passportService = require('./services/passport')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGOLAB_URI, function(err, res){
  if(err){
    console.log('DB CONNECTION FAILED '+err)
  }
  else{
    console.log('DB CONNECTION SUCCESS')
  }
})

app.use(morgan('combined'))
app.use(cors())  
app.use(bodyParser.json({ type: '*/*' }))
app.use('/', index)
app.use('/poll', polls)

const port = process.env.PORT || 8080
const server = http.createServer(app) 
server.listen(port)
console.log('Server listening on port', port)
