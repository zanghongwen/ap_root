/**
 * クーポンリスト画面データアドイン
 * 
 */
function couponListView() {

}
couponListView.prototype = {
    init: function() {
        // 言語
        lang = sessionStorage.getItem('lang')

        // 画面多言語初期化
        $('#coupon').empty().text(words[lang].couponMenu)

        // 検索条件 def.js
        createSelection()

        // 画面操作名
        this.couponOperSearchName = 'couponOperSearchName'
        this.couponDetailOperName = 'couponDetailOperName'

        // 検索条件取得
        var condition = JSON.parse(sessionStorage.getItem('couponSerach'))

        condition.date = CurrentTime()

        // 検索条件
        var searchContext = ''
        if (condition.genre.length > 0) {
            searchContext = words[lang].genre[condition.genre]
			if (searchContext == undefined) {
				searchContext = getTitle(condition.genre)
			}
			$('.p-btn-genre').text(searchContext)
			$('#genre').empty().text(searchContext)
        }
        if (condition.distance.length > 0) {
            searchContext = words[lang].distance[condition.distance]
            $('#distance').empty().text(searchContext)
            $('.p-btn-distance').text(words[lang].distance[condition.distance])
        }
		if (condition.genre.length > 0 && condition.distance.length > 0) {
			$('#slash').empty().text(' / ')
		}

        // クエリデータ
        this.createItem(condition)

        // 条件変更
        this.changeCondition(condition)
    },
    createItem: function(condition) {
        $('#coupons').empty()
        try {
            var data = findData(coupon[lang], condition)
            var info
            var imgFolder = 'J2G/'
            for (var i in data) {
                if (data[i].title != '') {
                    if(data[i].spotClass == '1'){
                        imgFolder = 'spot/'
                    }
                    info = $(
                        '<li><a href="coupon_detail.html?couponId=' + data[i].id + '&unitId=' + data[i].spotId + '&lang=' + lang + '" unitId=' + data[i].id + ' operId=' + this.couponDetailOperName + '>' +
                        '<p class="p-grid-thumb__spot"><img src="' + image_site + imgFolder + data[i].img1 + '"></p>' +
                        '<div class="p-grid-caption">' +
                        '<p class="p-grid-category">' + words[lang].genre[getParentCode(data[i].category)] + '</p>' +
                        '<h2 class="p-grid-title">' + data[i].title + '</h2></div>' +
                        '<ul class="p-grid-bottom"><li>' + data[i].distance + 'm</li><li>&rarr;</li></ul>' +
                        '</a></li>'
                    )
                    $('#coupons').append(info)
                }
            }
        } catch (e) {
            alert('データが取得できませんでした。')
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
            $('.p-btn-genre').prev().slideToggle(300);
            $(this).attr('operId', couponListView.couponOperSearchName)
            $(this).attr('unitId', 'ジャンル：' + $(this).attr('value') + ',距離：' + (words['ja'].distance[query.distance] === undefined ? '' : words['ja'].distance[query.distance]))
            query.genre = []
            query.date = CurrentTime()
            query.genre.push($(this).attr('value'))
            sessionStorage.setItem('couponSerach', JSON.stringify(query))
            couponListView.createItem(query)
            $('.p-btn-genre').text($(this).text())
            if ($('#distance').text() != '') {
                $('#slash').empty().text(' / ')
            }
            $('#genre').empty().text($(this).text())
        })

        $('.l-dropdown__distance a').on('click', function() {
            $('.p-btn-distance').prev().slideToggle(300)
            $(this).attr('operId', couponListView.couponOperSearchName)
            $(this).attr('unitId', 'ジャンル：' + query.genre + ',距離：' + words['ja'].distance[$(this).attr('value')])
            query.distance = []
            query.date = CurrentTime()
            query.distance.push($(this).attr('value'))
            sessionStorage.setItem('couponSerach', JSON.stringify(query))
            couponListView.createItem(query)
            $('.p-btn-distance').text($(this).text())
            if ($('#genre').text() != '') {
                $('#slash').empty().text(' / ')
            }
            $('#distance').empty().text($(this).text())
        })
    },


}