var express = require('express')
var path = require('path')
var ejs = require('ejs')
var fs = require('fs')
var app = express()
var port = process.env.PORT || 80

var terminal = JSON.parse(fs.readFileSync('data/terminal.js'))
var clientId = terminal.id

var log4js = require('log4js')
log4js.configure({
    'appenders': [{
        'type': 'clustered',
        'appenders': [{
            'type': 'DateFile',
            'category': 'signage',
            'layout': {
                'type': 'pattern',
                'pattern': '%d %m'
            },
            'filename': 'log/' + clientId + '_WEB_OP',
            'pattern': '_yyyyMMdd.log',
            'alwaysIncludePattern': true
        },
        {
            'type': 'DateFile',
            'category': 'ap',
            'layout': {
                'type': 'pattern',
                'pattern': '%d %m'
            },
            'filename': 'log/' + clientId + '_WEB_AP',
            'pattern': '_yyyyMMdd.log',
            'alwaysIncludePattern': true
        },
        ]
    }]
})

var logger = log4js.getLogger('ap')
logger.setLevel('ERROR')
app.use(log4js.connectLogger(logger, {
    level: 'auto',
    format: clientId + ' コンテンツがありません。（:url)'
}))

// import router
var router = require('./routes/index')

app.use('/', router)

// set view template
app.set('views', '.')

//set template to html
app.set('view engine', 'html') 
app.engine('.html', ejs.__express)

// set static folders
app.use('/lib', express.static(path.join(__dirname, 'lib')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/data', express.static(path.join(__dirname, 'data')))
app.use('/list', express.static(path.join(__dirname, 'list')))
app.use('/rf_images', express.static(path.join(__dirname, '/../rf_images')))

app.listen(port)
console.log('server started at port ' + port)