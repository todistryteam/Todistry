const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
var env = require('./config/environment')
const indexRoutes = require('./routes')
var cors = require('cors')

const PORT = env.port

// app.use(cors());
app.use(cors({
  origin: '*',  // replace with your website's URL
  credentials: true,                  // if you need to send cookies
  methods: 'GET,POST,PUT,DELETE',     // specify allowed methods
}));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const server = http.createServer(app)

app.use('/api', indexRoutes)
app.use('/assets', express.static('assets'));
app.use('/uploads', express.static('uploads'));


app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})


app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    success: 0,
    message: error.message,
    error: error
  })
})

server.listen(PORT, () => {
  console.log('Express listening on port:', 'http://localhost:'+PORT)
})

module.exports = app
