function brochureView() {
}
brochureView.prototype = {
    init: function() {
        lang = sessionStorage.getItem('lang')
        $('#brochure').empty().text(words[lang].brochureMenu)

        // 詳細画面URL
        this.brochureDetailURL = 'brochure_detail.html'

        // 画面操作名
        this.brochureDetailOper = 'brochureOperDetailName'

        this.createItem()
    },
    createItem: function() {
        $('#brochures').empty()
        var data = brochure[lang]
        var info
        for (var i in data) {
            info = $(
                '<li><a href="' + this.brochureDetailURL +
                '?unitId=' + data[i].id +
                '&lang=' + lang + '"' +
                ' unitId=' + data[i].id + ' operId=' + this.brochureDetailOper + '>' +
                '<p class="p-grid-thumb__space p-grid-thumb__space--four"><img src="../rf_images/brochure/' + data[i].thumbnailImg + '"></p>' +
                '<div class="p-grid-caption p-grid-caption--four">' +
                '<h2 class="p-grid-title p-grid-title--four">' + data[i].title + '</h2></div>' +
                '<p class="p-grid-bottom__arrow">&rarr;</p></a>' +
                '</li>'
            )
            $('#brochures').append(info)
        }
    },
}