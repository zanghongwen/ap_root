function mapView() {
    this.mapDetailUrl = ''
}
mapView.prototype = {
    init: function() {
        // 言語
        lang = sessionStorage.getItem('lang')

        // 画面多言語初期化
        $('#map').empty().text(words[lang].mapMenu)
        $('#mapHeader').empty().text(words[lang].map)
        $('#timetableHeader').empty().text(words[lang].timeTable)

        // 詳細画面URL
        this.mapDetailURL = 'map_detail.html'

        // 画面操作名
        this.mapDetailOper = 'mapDetailOperName'

        // Map and Timetable category
        this.mapCatetory = '1'
        this.timetableCatetory = '2'

        this.createItem()
    },
    createItem: function() {
        $('#maps').empty()
        try {
            // Map
            var data = this.getItemByCategory(this.mapCatetory)
            var info
            for (var i in data) {
                info = $(
                    '<li><a href="' +
                    this.mapDetailURL +
                    '?unitId=' + data[i].id +
                    '&lang=' + lang + '"' +
                    ' unitId=' + data[i].id + ' operId=' + this.mapDetailOper + '>' +
                    '<p class="p-grid-thumb__space"><img src="../rf_images/map/' + data[i].thumbnailImg + '"></p>' +
                    '<div class="p-grid-caption">' +
                    '<h2 class="p-grid-title">' + data[i].title + '</h2></div>' +
                    '<p class="p-grid-bottom__arrow">&rarr;</p></a>' +
                    '</li>'
                )
                $('#maps').append(info)
            }

            // Timetable
            var data = this.getItemByCategory(this.timetableCatetory)
            var info
            for (var i in data) {
                info = $(
                    '<li><a href="' +
                    this.mapDetailURL +
                    '?unitId=' + data[i].id +
                    '&lang=' + lang + '"' +
                    ' unitId=' + data[i].id + ' operId=' + this.mapDetailOper + '>' +
                    '<p class="p-grid-thumb__space"><img src="../rf_images/map/' + data[i].thumbnailImg + '"></p>' +
                    '<div class="p-grid-caption">' +
                    '<h2 class="p-grid-title">' + data[i].title + '</h2></div>' +
                    '<p class="p-grid-bottom__arrow">&rarr;</p></a>' +
                    '</li>'
                )
                $('#timetables').append(info)
            }
        } catch (e) {
            alert('データが取得できませんでした。' + e.message)
        }
    },
    getItemByCategory: function(category) {
        var result = []
        for (var i in map[lang]) {
            if (map[lang][i].category == category) {
                result.push(map[lang][i])
                continue
            }
        }
        return result
    },
}