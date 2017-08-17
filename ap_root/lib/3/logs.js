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
        if (idm != '') {
            sessionStorage.setItem('idm', '')
            cardUrl = this.writeLogUrl +
                '?page=' + pageName +
                '&currentlang=' + this.currentlang +
                '&oper=changeLangByTouchOperName' +
                '&unitId=' + idm
            $.post(cardUrl, function(data, status) {})
        }

        $.post(postUrl, function(data, status) {
        })
    },
    writeLogAp: function(msg) {
        var postUrl = 'writeLogAp.html?msg=' + msg +
            '&currentlang=' + this.currentlang
        $.post(postUrl, function(data, status) {})
    }
}