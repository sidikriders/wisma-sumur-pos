var express = require('express')
var bodyParser = require('body-parser')
var Sequelize = require('sequelize')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var morgan = require('morgan')

var appConfig = require('./app-config.js')
var dbConfig = require('./config/config.json')[process.env.NODE_ENV || 'development']
var apiController = require('./controller/api-controller')

var SequelizeStore = require('connect-session-sequelize')(session.Store)
var sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  dialect: dbConfig.dialect,
  logging: () => process.env.NODE_ENV === 'development'
})

deleteExpiredSessions(sequelize)

var app = express()

app.set('view engine', 'pug')
app.use(morgan('default'))
app.use(session({
  secret: appConfig.sessionConfig.secret,
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize
  })
}))
app.use(bodyParser.json())
app.use(express.static('assets'))
// api routing
app.use('/api', apiController)


// route not found
app.get('*', (req, res, next) => {
  res.status(404).send('not found')
})

// error
app.use((err, req, res, next) => {
  console.error(err)
  var isAPI = req.path.split('/')[1] === 'api'
  if (isAPI) {
    res.status(err.code || 500).send(err)
  } else {
    res.status(err.code || 500).send({
      status: false,
      data: err
    })
  }
})

app.listen(appConfig.port, () => { console.log('Listening to port ' + appConfig.port) })

function deleteExpiredSessions(sequelize) {
  var destoyer = {
    expires: {
      [Sequelize.Op.lte]: new Date()
    }
  }
  var model = sequelize['import']('./models/session.js')
  sequelize.models[model.name] = model
  sequelize.models.Session.destroy({
    where: destoyer
  }).then(() => {
    console.log(`Executing (default): DELETE FROM \`Sessions\` WHERE \`expires\` <= '${new Date().toISOString()}'`)
  }).catch(err => {
    throw new Error(err)
  })
}