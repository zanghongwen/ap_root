/**
 * クーポン画面データアドイン
 * 
 */
function couponView() {
}
couponView.prototype = {
    init: function() {
        // 言語
        lang = sessionStorage.getItem('lang')

        // 画面操作名
        this.couponOperSearchName = 'couponOperSearchName'

        // 画面名前
        $('#coupon').empty().text(words[lang].couponMenu)
        $('#genreName').empty().text(words[lang].genre[0])
        $('#distanceName').empty().text(words[lang].distance[0])
        $('#search').empty().text(words[lang].titles.search)

        // genre
        $('#genreLabel1').empty().text(words[lang].category[0].name)
        $('#genreLabel2').empty().text(words[lang].category[1].name)
        $('#genreLabel3').empty().text(words[lang].category[2].name)
        $('#genreLabel4').empty().text(words[lang].category[3].name)
        $('#genreLabel5').empty().text(words[lang].category[4].name)
        $('#genreLabel6').empty().text(words[lang].category[5].name)
        $('#genreLabel7').empty().text(words[lang].category[6].name)

        $('input:radio[name="genre"]').prop('checked',false)
        $('input:radio[name="distance"]').prop('checked',false)
        
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

            $(this).attr('operId', couponView.couponOperSearchName)

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
                utitId = utitId + '距離：'+ words['ja'].distance[distanceValue]
            }
            
            $(this).attr('unitId', utitId)
            var queryStr = JSON.stringify(query)
            sessionStorage.setItem('couponSerach', queryStr)
            location.href = 'coupon_list.html'
        })
    },
}