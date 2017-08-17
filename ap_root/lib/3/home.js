function homeView() {
}
homeView.prototype = {
    init: function() {
        $('#map').empty().text(words[lang].mapMenu)
        $('#spot').empty().text(words[lang].spotMenu)
        $('#coupon').empty().text(words[lang].couponMenu)
        $('#japan2Go').empty().text(words[lang].japan2GoMenu)
        $('#brochure').empty().text(words[lang].brochureMenu)
    }
}