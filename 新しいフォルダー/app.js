var compression = require('compression')
var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var ejs = require('ejs')
var fs = require('fs')
var app = express()
app.use(compression())

var port = process.env.PORT || 80

var terminal = JSON.parse(fs.readFileSync('data/terminal.js'))
var clientId = terminal.id

var logpath = 'C:/ProgramData/DNP/SmartSignage/Log/'


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
                'filename': logpath + 'WEB_OP',
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
                'filename': logpath + 'WEB_ERR',
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

app.use(function(req, res, next) {
    res.header('X-Frame-Options', 'SAMEORIGIN')
    res.header('X-XSS-Protection', '1')
    res.header('X-Content-Type-Options', 'nosniff')
    if(req.url.match('/lib/1') || req.url.match('/images/')){
        res.header('Cache-Control', 'public, max-age=86400, must-revalidate')
    }
    next()
})

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
app.use('/rf_images', express.static(path.join(__dirname, '/../rf_images')))
app.use(favicon(path.join(__dirname, 'lib', 'favicon.ico')))

app.listen(port)
console.log('server started at port ' + port)