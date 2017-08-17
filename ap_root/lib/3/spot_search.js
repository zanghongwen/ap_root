/**
 * 施設・観光画面データアドイン
 * 
 */
function spotView() {
}
spotView.prototype = {
    init: function() {
        // 言語
        lang = sessionStorage.getItem('lang')

        // 画面操作名
        this.spotOperSearchName = 'spotOperSearchName'

        // 画面名前
        $('#spot').empty().text(words[lang].spotMenu)
        $('#genreName').empty().text(words[lang].genre[0])
        $('#distanceName').empty().text(words[lang].distance[0])
        $('#saerch').empty().text(words[lang].titles.search)

        // genre
        $('#genreLabel1').empty().text(words[lang].category[0].name)
        $('#genreLabel2').empty().text(words[lang].category[1].name)
        $('#genreLabel3').empty().text(words[lang].category[2].name)
        $('#genreLabel4').empty().text(words[lang].category[3].name)
        $('#genreLabel5').empty().text(words[lang].category[4].name)
        $('#genreLabel6').empty().text(words[lang].category[5].name)
        $('#genreLabel7').empty().text(words[lang].category[6].name)

        this.spotListUrl = ''

        if (window.navigator.onLine === false) {
            $('#saerch').attr('operId', 'spotOfflinePageName')
            this.spotListUrl = 'spot_list_offline.html' //  オフライン時
        } else {
            $('#saerch').attr('operId', 'spotOnlinePageName')
            this.spotListUrl = 'spot_list_online.html' // オンライン時
        }

        // 検索
        this.search()
    },

    search: function() {
        // 検索時
        $('.c-btn-search').on('click', function() {
            // 検索条件をセット
            var query = {
                genre: [],
                distance: []
            }

            $(this).attr('operId', spotView.spotOperSearchName)

            var genreValue = $('input[name="genre"]:checked').val()
            var distanceValue = $('input[name="distance"]:checked').val()

            var utitId = ''

            // ジャンル
            if (genreValue != null) {
                query.genre.push(genreValue)
                utitId = utitId + 'ジャンル：' + genreValue + ','
            }

            // 距離
            if (distanceValue != null) {
                query.distance.push(distanceValue)
                utitId = utitId + '距離：' + words['ja'].distance[distanceValue]
            }

            $(this).attr('unitId', utitId)
            var queryStr = JSON.stringify(query)
            sessionStorage.setItem('spotSerach', queryStr)

            location.href = spotView.spotListUrl
        })
    },
}