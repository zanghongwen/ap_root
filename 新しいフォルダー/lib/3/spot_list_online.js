function spotListView(Logs) {
    $.ajaxSettings.async = false
    $.getJSON('data/terminal.js', function(data) {
        spotListView.latitude = data.latitude
        spotListView.longitude = data.longitude
    })
    $.ajaxSettings.async = true
    this.latitude = parseFloat(spotListView.latitude) // 緯度
    this.longitude = parseFloat(spotListView.longitude) // 経度
    this.here
    this.map
    this.marker = []
    this.infoWindow = []

    this.markerData = []
    this.images = {
        markers: {
            C_EVT: '../images/icon_pin_event.png',
            C_VEC: '../images/icon_pin_transit.png',
            C_STY: '../images/icon_pin_lodging.png',
            C_LOK: '../images/icon_pin_look.png',
            C_BUY: '../images/icon_pin_shopping.png',
            C_PLY: '../images/icon_pin_play.png',
            C_EAT: '../images/icon_pin_meal.png'
        },
        start: '../images/start.png'
    }

    // リロードボタンクリック
    $('#map-reload').on('click', function() {
        location.reload(true)
    })

    // 地図のズームボタンクリック
    $('#map-zoom-plus').on('click', { num: 1 }, this.setZoom_)
    $('#map-zoom-minus').on('click', { num: -1 }, this.setZoom_)

}
spotListView.prototype = {
    init: function() {
        // 言語
        lang = sessionStorage.getItem('lang')

        // 詳細画面URL
        this.spotDetailURL = 'spot_detail.html'

        // 画面操作名
        this.spotOperSearchName = 'spotOperSearchName'
        this.spotDetailOper = 'spotDetailOperName'

        // 画面多言語初期化
        $('#spot').empty().text(words[lang].spotMenu)

        // 検索条件 def.js
        createSelection()

        // 検索条件取得
        var condition = JSON.parse(sessionStorage.getItem('spotSerach'))

        this.createItem(condition)

        // 条件選択
        if (condition.genre.length > 0) {
            if (words[lang].genre[condition.genre] == undefined) {
                $('.p-btn-genre').text(getTitle(condition.genre))
            } else {
                $('.p-btn-genre').text(words[lang].genre[condition.genre])
            }
        }

        if (condition.distance.length > 0) {
            $('.p-btn-distance').empty().text(words[lang].distance[condition.distance])
        }

        var langParam = lang
        switch (lang) {
            case 'cn':
                langParam = 'zh-CN'
                break
            case 'tw':
                langParam = 'zh-TW'
                break
        }
        $.getScript('https://maps.googleapis.com/maps/api/js?client=gme-nihonunisysltd2&sensor=true&libraries=geometry&callback=spotListView.initMap&language=' + langParam)
//	$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDyPmQEXKMPAIY1ePwYI77yyi_d-HePBTA&sensor=true&libraries=geometry&callback=spotListView.initMap&language=' + langParam)

        // 条件変更
        this.changeCondition(condition)
    },

    createItem: function(condition) {
        try {
            var spotData = findData(spot[lang], condition)
            var j2gData = findData(J2G[lang], condition)
            var data
            if (spotData !== undefined && j2gData !== undefined) {
                data = j2gData.concat(spotData)
            }
            var J2GFolder = 'J2G/'
            var spotFolder = 'spot/'
            var info
            for (var i in data) {
                if (i >= j2gData.length) {
                    J2GFolder = spotFolder
                }
                if (data[i].name != '' && data[i].hotFlag == '1') {
                    info = {
                        image: '<p><img src="' + image_site + J2GFolder + data[i].img1 + '"></p>',
                        name: '<p class="p-iw-title">' + data[i].name + '</p>',
                        button: '<p class="p-iw-btn">' +
                            '<a href="' + this.spotDetailURL +
                            '?unitId=' + data[i].id +
                            '&lang=' + lang + '"' +
                            ' unitId=' + data[i].id + ' operId=' + this.spotDetailOper + ' onclick="Logs.writeLog(\'spotOnlinePageName\', \'spotDetailOperName\', ' + data[i].id +')">' + words[lang].titles.detail + '</a></p>',
                        lat: parseFloat(data[i].latitude),
                        lng: parseFloat(data[i].longitude),
                        type: getParentCode(data[i].category)
                    }
                    this.markerData.push(info)
                }
            }
        } catch (e) {
            alert(errorMsg + e.message)
            console.log(e.message)
        }
    },
    changeCondition: function(condition) {
        var query = condition
        $('.p-btn-genre').click(function() {
            $('.p-btn-genre').prev().slideToggle(300)
        })
        $('.p-btn-distance').click(function() {
            $('.p-btn-distance').prev().slideToggle(300)
        })

        $('.l-dropdown__genre a').on('click', function() {
            $('.p-btn-genre').prev().slideToggle(300)
            $(this).attr('operId', spotListView.spotOperSearchName)
            $(this).attr('unitId', 'ジャンル：' + $(this).attr('value') + ',距離：' + (words['ja'].distance[query.distance] === undefined ? '' : words['ja'].distance[query.distance]))
            query.genre = []
            query.genre.push($(this).attr('value'))
            sessionStorage.setItem('spotSerach', JSON.stringify(query))
            spotListView.clearMarkers()
            spotListView.createItem(query)
            spotListView.initMap()
            $('.p-btn-genre').text($(this).text())
            if ($('#distance').text() != '') {
                $('#slash').empty().text(' / ')
            }
            $('#genre').empty().text($(this).text())
        })

        $('.l-dropdown__distance a').on('click', function() {
            $('.p-btn-distance').prev().slideToggle(300)
            $(this).attr('operId', spotListView.spotOperSearchName)
            $(this).attr('unitId', 'ジャンル：' + query.genre + ',距離：' + words['ja'].distance[$(this).attr('value')])
            query.distance = []
            query.distance.push($(this).attr('value'))
            sessionStorage.setItem('spotSerach', JSON.stringify(query))
            spotListView.clearMarkers()
            spotListView.createItem(query)
            spotListView.initMap()
            $('.p-btn-distance').text($(this).text())
            if ($('#genre').text() != '') {
                $('#slash').empty().text(' / ')
            }
            $('#distance').empty().text($(this).text())
        })
    },
    initMap: function() {
        // 地図の作成
        this.here = new google.maps.LatLng({
            lat: this.latitude,
            lng: this.longitude
        })
        this.map = new google.maps.Map(document.getElementById('map_canvas'), {
            center: this.here,
            zoom: 14,
            disableDefaultUI: true,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.DEFAULT
            }
        })
        this.createStartMarker()

        // マーカー毎の処理
        for (var i = 0; i < this.markerData.length; i++) {
            markerLatLng = new google.maps.LatLng({
                lat: this.markerData[i]['lat'],
                lng: this.markerData[i]['lng']
            })

            this.marker[i] = new google.maps.Marker({
                position: markerLatLng,
                map: this.map,
                animation: google.maps.Animation.DROP,
                icon: this.images.markers[this.markerData[i].type]
            })

            this.infoWindow[i] = new google.maps.InfoWindow({
                content: '<div class="infowindow">' + this.markerData[i]['image'] + this.markerData[i]['name'] + this.markerData[i]['button'] + '</div>'
            })

            var _self = this
            this.markerEvent(_self, i)
        }
    },
    // 現在地マーカー作成
    createStartMarker: function() {
        new google.maps.Marker({
            position: this.here,
            map: this.map,
            zIndex: 9999, // 上になる
            animation: google.maps.Animation.BOUNCE,
            icon: {
                anchor: new google.maps.Point(94, 217),
                size: new google.maps.Size(188, 217),
                url: this.images.start
            }
        })
    },
    // 現在地以外のマーカーを消去
    clearMarkers: function() {
        for (var i in this.marker) {
            this.marker[i].setMap(null)
        }

        this.marker.length = 0
        this.markerData.length = 0

        // 地図の中心を現在地に
        this.map.setCenter(this.here)
    },
    // マーカーにクリックイベントを追加
    markerEvent: function(_self, i) {
        this.marker[i].addListener('click', function() {
            _self.infoWindow[i].open(_self.map, _self.marker[i])
        })
    },
    // ズームレベル変更
    setZoom_: function(param) {
        var level = spotListView.map.getZoom()
        var nextLevel = level + param.data.num
        if (nextLevel > 0 && nextLevel < 21) {
            spotListView.map.setZoom(nextLevel)
            console.log(nextLevel)
        }
    },
}