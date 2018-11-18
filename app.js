var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var apiController = require('./controller/api-controller')

app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(express.static('assets'))

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