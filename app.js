var express = require('express')
var bodyParser = require('body-parser')
var Sequelize = require('sequelize')
var cookieParser = require('cookie-parser')
var session = require('express-session')

var appConfig = require('./app-config.js')
var dbConfig = require('./config/config.json')[process.env.NODE_ENV || 'development']
var apiController = require('./controller/api-controller')

var SequelizeStore = require('connect-session-sequelize')(session.Store)
var app = express()

app.set('view engine', 'pug')
app.use(cookieParser())
app.use(session({
  secret: appConfig.sessionConfig.secret,
  store: new SequelizeStore({
    db: new Sequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password, {
        dialect: dbConfig.dialect
      }
    )
  })
}))

app.use(bodyParser.json())
app.use(express.static('assets'))

app.use('*', (req, res, next) => {
  console.log(req.session)
  next()
})

app.use('/api', apiController)

app.get('*', (req, res, next) => {
  res.status(404).send('not found')
})

app.get((err, req, res, next) => {
  res.status(502).send({
    status: false,
    data: err
  })
})

app.listen(3000, () => { console.log('Listening to port 300') })