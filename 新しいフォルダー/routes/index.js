var express = require('express')
var fs = require('fs')
var router = express.Router()
var log = require('log4js').getLogger('signage')
var logAp = require('log4js').getLogger('ap')
var logCfg = JSON.parse(fs.readFileSync('log.json'))

// 端末id
var clientId = ''

router.use(function(req, res, next) {
    if (clientId == '') {
        var terminal = JSON.parse(fs.readFileSync('data/terminal.js'))
        clientId = terminal.id
    }
    next()
})

// intro
router.get('/', function(req, res) {
    res.render('intro')
})
router.get('/intro.html', function(req, res) {
    res.render('intro')
})

// 言語選択画面
router.get('/index.html', function(req, res) {
    res.render('index')
})

// トップ画面
router.get('/home.html', function(req, res) {
    res.render('home')
})

// 地図・交通情報
router.get('/map_list.html', function(req, res) {
    res.render('map_list')
})
router.get('/map_detail.html', function(req, res) {
    res.render('map_detail')
})

// 施設・観光情報
router.get('/spot_search.html', function(req, res) {
    res.render('spot_search')
})
router.get('/spot_list_online.html', function(req, res) {
    res.render('spot_list_online')
})
router.get('/spot_list_offline.html', function(req, res) {
    res.render('spot_list_offline')
})
router.get('/spot_detail.html', function(req, res) {
    res.render('spot_detail')
})

// クーポン
router.get('/coupon_search.html', function(req, res) {
    res.render('coupon_search')
})
router.get('/coupon_list.html', function(req, res) {
    res.render('coupon_list')
})
router.get('/coupon_detail.html', function(req, res) {
    res.render('spot_detail')
})
router.get('/coupon_detail_server.html', function(req, res) {
    res.render('coupon_detail_server')
})

// パンフレット
router.get('/brochure_list.html', function(req, res) {
    res.render('brochure_list')
})
router.get('/brochure_detail.html', function(req, res) {
    res.render('brochure_detail')
})

//共通
router.get('/footer.html', function(req, res) {
    res.render('footer')
})
// ログ
router.post('/writeLog.html', function(req, res) {
    var operation = req.query.oper
    var pageName = req.query.page
    var currentLang = req.query.currentlang
    var unitId = '-'

    if (operation === 'changeLangOperName') {
        pageName = 'changeLangPopupPageName'
        unitId = logCfg[req.query.unitId]
    } else {
        currentLang = req.query.currentlang // 言語
        unitId = unescape(req.query.unitId) // 単体id
    }
    log.info(clientId, logCfg[pageName] + '画面', logCfg[currentLang], logCfg[operation], unitId)
    res.render('')
})

router.post('/writeLogAp.html', function(req, res) {
    var msg = unescape(req.query.msg) // 画面名
    var currentLang = req.query.currentlang // 言語
    var errorType = req.query.type
    var errorMsg = ''
    if (errorType == 1) {
        errorMsg = 'が破損しています。'
    } else if (errorType == 2) {
        errorMsg = 'がありません。'
    } else if (errorType == 3) {
        errorMsg = 'がありません。'
    }

    var info = logCfg[msg] + errorMsg 

    if(errorType == 3){
        info = info + '（' + req.query.unitId + ',' + logCfg[currentLang] + '）'
    }else{
        info = info + '（' + logCfg[currentLang] + '）'
    }

    logAp.error(clientId, info)
    res.render('')
})

module.exports = router