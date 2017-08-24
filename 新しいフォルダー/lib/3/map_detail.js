function mapDetail() {
    $.ajaxSettings.async = false
    $.getJSON('data/terminal.js', function(data) {
        mapDetail.id = data.id
    })
    $.ajaxSettings.async = true
    this.terminalId = mapDetail.id
}
mapDetail.prototype = {
    init: function() {
        //ページの内容表示
        $('#map').empty().text(words[lang].mapMenu)
        $('#qrDownload').empty().text(words[lang].qrDownload)
        $('.p-modal-block__access').empty().text(words[lang].titles.pdfDownload)
        $('#pdfDownloadContext').empty().text(words[lang].titles.pdfDownloadContext)
        $('#close').empty().text(words[lang].titles.close)

        var unitId = getUrlVars()['unitId']

        var data = this.getItemById(unitId)

        var fileExt = data.pdf.substr(data.pdf.lastIndexOf('.')).toLowerCase()

        if (fileExt == '.pdf') {
            $('#positionButtonDiv').remove()
            $('#pdf').append('<embed  height="1000" width="100%" src="' + image_site + 'map/' + data.pdf + '#toolbar=0&navpanes=0&scrollbar=1"></embed>')
        } else {
            $('#pdf').append('<img id="imageFullScreen" height="1000" width="100%" src="' + image_site + 'map/' + data.pdf + '#toolbar=0"></img>')
            // $jq('#imageFullScreen').smartZoom({ 'containerClass': 'zoomableContainer' })
            // $jq('#topPositionMap,#leftPositionMap,#rightPositionMap,#bottomPositionMap').bind("click", this.moveButtonClickHandler)
            // $jq('#zoomInButton,#zoomOutButton').bind("click", this.zoomButtonClickHandler)
        }

        var url = service_site + '/rf_images/map/' + data.pdf + '?terminal=' + mapDetailView.terminalId
        this.showQrcode(url)
    },
    getItemById: function(id) {
        var result = {}
        for (var i in map[lang]) {
            if (map[lang][i].id == id) {
                result = map[lang][i]
                break
            }
        }
        return result
    },
    showQrcode: function(url) {
        console.log('QRコード作るよ')
        var options = {
            render: 'image',
            size: 111,
            background: '#fff',
            quiet: 1,
            minVersion: 1,
            maxVersion: 12,
            ecLevel: 'L',
            text: url
        }
        $('#qrCode').empty().qrcode(options)
    },
    zoomButtonClickHandler: function(e) {
        var scaleToAdd = 0.8
        if (e.target.id == 'zoomOutButton')
            scaleToAdd = -scaleToAdd
        $jq('#imageFullScreen').smartZoom('zoom', scaleToAdd)
    },
    moveButtonClickHandler: function(e) {
        var pixelsToMoveOnX = 0
        var pixelsToMoveOnY = 0

        switch (e.target.id) {
            case 'leftPositionMap':
                pixelsToMoveOnX = 50
                break
            case 'rightPositionMap':
                pixelsToMoveOnX = -50
                break
            case 'topPositionMap':
                pixelsToMoveOnY = 50
                break
            case 'bottomPositionMap':
                pixelsToMoveOnY = -50
                break
        }
        $jq('#imageFullScreen').smartZoom('pan', pixelsToMoveOnX, pixelsToMoveOnY)
    }
}