function Logs() {
    this.writeLogUrl = 'writeLog.html'
    this.currentlang = sessionStorage.getItem('lang')
}

Logs.prototype = {
    log: function(Page) {
        $('a').on('click', function() {
            try {
                var pageName = Page
                var operation = $(this).attr('operId')
                var unitId = $(this).attr('unitId')
                Logs.writeLog(pageName, operation, unitId)
            } catch (e) {
                alert(e.name + ': ' + e.message)
            }
        })
    },
    writeLog: function(pageName, operation, unitId) {
        if (unitId === undefined) {
            unitId = getUrlVars()['unitId'] ? getUrlVars()['unitId'] : ''
        }

        var postUrl = this.writeLogUrl +
            '?page=' + pageName +
            '&currentlang=' + this.currentlang +
            '&oper=' + operation +
            '&unitId=' + escape(unitId)

        var cardUrl
        var idm = sessionStorage.getItem('idm')
        var eta = sessionStorage.getItem('eta')
        if (idm != '') {
            sessionStorage.setItem('idm', '')
            sessionStorage.setItem('eta', '')
            cardUrl = this.writeLogUrl +
                '?page=' + pageName +
                '&currentlang=' + this.currentlang +
                '&oper=changeLangByTouchOperName' +
                '&unitId=' + 'IDM:'+ idm +',ETA:' + eta
            $.post(cardUrl, function(data, status) {})
        }

        $.post(postUrl, function(data, status) {})
    },
    writeLogAp: function(msg, data) {
        var unitId = getUrlVars()['unitId']
        var type = ''
        if (data === undefined) {
            type = 1
        } else if (data.length < 1) {
            type = 2
        } else if (unitId != undefined && Logs.getItem(data) === false) {
            type = 3
        } else {
            return false
        }

        var postUrl = 'writeLogAp.html?msg=' + msg +
            '&currentlang=' + this.currentlang + '&type=' + type + '&unitId=' + unitId
        if (type != '') {
            $.post(postUrl, function(data, status) {})

        }
    },
    getItem: function(data) {
        var unitId = getUrlVars()['unitId']
        for (var i in data) {
            if (data[i].id == unitId) {
                return true
            }
            
        }
        return false
    }
}