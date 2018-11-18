var express = require('express')
var app = express()

app.set('view engine', 'pug')

app.use(express.static('assets'))

app.get('/', (req, res, next) => {
  res.locals.roomList = [
    {
      tenant: 'A',
      room: {
        id: 1,
        name: 'C01'
      }
    }, {
      tenant: 'B',
      room: {
        id: 2,
        name: 'C02'
      }
    }, {
      tenant: 'C',
      room: {
        id: 3,
        name: 'C03'
      }
    }, {
      tenant: 'D',
      room: {
        id: 4,
        name: 'C04'
      }
    }, {
      tenant: 'E',
      room: {
        id: 5,
        name: 'C05'
      }
    }
  ]
  res.locals.thisYear = new Date().getFullYear()
  res.locals.monthList = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Des'
  ]
  res.render('home')
})

app.get('*', (req, res, next) => {
  res.status(404).send('not found')
})

app.listen(3000, () => { console.log('Listening to port 300') })