/**
 * 画面データアドイン
 */
function couponDetailView() {
    this.mapUrl
    this.mapQrCodeUrl
    $.ajaxSettings.async = false
    $.getJSON('data/terminal.js', function(data) {
        couponDetailView.latitude = data.latitude
        couponDetailView.longitude = data.longitude
        couponDetailView.id = data.id
    })
    $.ajaxSettings.async = true
    this.latitude = couponDetailView.latitude // 緯度
    this.longitude = couponDetailView.longitude // 経度
    this.terminalId = couponDetailView.id
}
couponDetailView.prototype = {
    init: function() {
        // 言語
        lang = sessionStorage.getItem('lang')

        // URLに単体ID取得
        var unitId = getUrlVars()['unitId']

        // 情報取得
        var data = this.getItemById(unitId)

        // URLにクーポンIDs取得
        var couponId = getUrlVars()['couponId']

        // スポットにクーポン取得 スポットの詳細ページ時
        var coupons = this.getCouponsByIds(data.couponIds, couponId)

        data.coupons = coupons

        // 生成ページ
        this.createItem(data)

        this.createPrintCoupon()
    },

    // 情報
    getCouponsByIds: function(couponIds, couponId) {
        if (couponIds === undefined) {
            couponIds = ''
        }
        if (couponId === undefined) {
            couponId = ''
        }

        var result = []
        if (couponId != '') {
            result.push(this.getCouponById(couponId))
        }

        var ids = couponIds.split(',')
        var couponObj
        for (var i in ids) {
            if (couponId != '' && ids[i] == couponId) {
                continue
            }
            couponObj = this.getCouponById(ids[i])
            if (!$.isEmptyObject(couponObj)) {
                result.push(this.getCouponById(ids[i]))
            }
        }
        return result
    },
    // クーポン情報取得
    getCouponById: function(id) {
        var result = {}
        for (var i in coupon[lang]) {
            if (coupon[lang][i].id == id && coupon[lang][i].expirationDateTo >= CurrentTime()) {
                result = coupon[lang][i]
                break
            }
        }
        return result
    },
    // 情報取得
    getItemById: function(id) {
        var result = {}
        var data = J2G[lang].concat(spot[lang])
        for (var i in data) {
            if (data[i].id == id) {
                result = data[i]
                break
            }
        }
        return result
    },
    createItem: function(data) {
        couponDetailView.showShop(data,
            couponDetailView.createSlider(data),
            couponDetailView.createAbout(data),
            couponDetailView.createCoupon(data),
            couponDetailView.createCard(data),
            couponDetailView.createMap(data),
            couponDetailView.createButton(data),
            couponDetailView.createDownloadMap(data))

        couponDetailView.showQrcode(this.mapQrCodeUrl, 'qrcode')
    },
    createSlider: function(data) {
        var slider = $(
            '<ul class="p-slider js-image-slider">' +
            '<li><img src="' + image_site + '/spot/' + data.img1 + '"></li>' +
            '<li><img src="' + image_site + '/spot/' + data.img2 + '"></li>' +
            '<li><img src="' + image_site + '/spot/' + data.img3 + '"></li>' +
            '<li><img src="' + image_site + '/spot/' + data.img4 + '"></li></ul>'
        )
        return slider
    },
    createAbout: function(data) {
        var about = $('<h1 class="p-ttl-spot">' + data.name + '</h1>' +
            '<p class="c-label__categpry">' + words[lang].genre[getParentCode(data.category)] + '</p>' +
            '<dl class="p-distantbe"><dt>' + words[lang].disFromPreLoc + '</dt><dd>' + data.distance + 'm</dd></dl>' +
            '<p>' + data.description + '</p>')
        return about
    },
    createCoupon: function(data) {
        var coupon = "<ul class='p-slider js-banner-slider' id='coupons'>"
        for (var i in data.coupons) {
            coupon += "<li><a class='js-modal-open' operId='spotGetCoupon' unitId='" + data.coupons[i].id + "' couponId=" + data.coupons[i].id + " data-target='modal-coupon'>" +
                "<div class='p-slider-bnr'>" +
                "<dl><dt>" + data.coupons[i].title + "</dt>" +
                "<dd><span id='getCoupon'>" + words[lang].titles.getCoupon + "</span></dd></dl>" +
                "</div></a></li>"
        }
        coupon += '</ul>'
        return coupon
    },
    createPrintCoupon: function() {
        $('#coupons a').on('click', function() {
            var result = couponDetailView.getCouponById($(this).attr('couponId'))
            $('.p-coupon__lang #condition').html('【' + result.condition + '】')
            $('.p-coupon__lang #expiration').text(words[lang].titles.expirationDate)
            $('.p-coupon__lang #expirationDate').text(result.expirationDateFrom + '～' + result.expirationDateTo)
            $('.p-coupon__lang #spotName').text(result.shopName)
            $('.p-coupon__lang #addressTitle').text(words[lang].titles.address)
            $('.p-coupon__lang #address').text(result.city + result.town + result.street + result.building)
            $('.p-coupon__lang #telTitle').text(words[lang].telCaption)
            $('.p-coupon__lang #tel').text(result.telephone)
            if (lang != 'ja') {
                // 現在の言語は日本語の場合は、日本語を増加されている。
                var result_ja = {}
                console.log(coupon['ja'])
                for (var i in coupon['ja']) {
                    if (coupon['ja'][i].id == result.id) {
                        result_ja = coupon['ja'][i]
                        break
                    }
                }

                $('#ja #condition').html('【' + result_ja.condition + '】')
                $('#ja #expiration').text(words[lang].titles.expirationDate)
                $('#ja #expirationDate').text(result_ja.expirationDateFrom + '～' + result_ja.expirationDateTo)
                $('#ja #spotName').text(result_ja.shopName)
                $('#ja #addressTitle').text(words[lang].titles.address)
                $('#ja #address').text(result_ja.city + result_ja.town + result_ja.street + result_ja.building)
                $('#ja #telTitle').text(words[lang].telCaption)
                $('#ja #tel').text(result_ja.telephone)
            } else {
                $('#ja').remove()
            }

            $('#couponNote').text(words[lang].titles.couponDownloadContext)
            $('#close').text(words[lang].titles.close)
            $('#btn-print').text(words[lang].titles.print)

            $('#btn-print').attr('unitId', result.id)
            couponDetailView.showQrcode(coupon_site + '?terminal=' + couponDetailView.terminalId + '&coupon=' + result.id + '&lang=' + lang, 'couponQrcode')
        })
    },
    createCard: function(data) {
        var card = $('<tr><th>' + words[lang].addressCaption + '</th><td>' + data.name + '</td></tr>' +
            '<tr><th>' + words[lang].telCaption + '</th><td>' + data.telephone + '</td></tr>' +
            '<tr><th>' + words[lang].openTimeCaption + '</th><td>' + data.businessHours + '</td></tr>' +
            '<tr><th>' + words[lang].budgetCaption + '</th><td>' + data.averageBudget + '</td></tr>' +
            '<tr><th>' + words[lang].accessSection + '</th><td>' + data.access + '</td></tr>')
        return card
    },
    createMap: function(data) {
        var langParm = lang
        switch (lang) {
            case 'cn':
                langParm = 'zh-CN'
                break
            case 'tw':
                langParm = 'zh-TW'
                break
        }
        this.mapQrCodeUrl = 'http://maps.google.com/maps?saddr=' + this.latitude + ',' + this.longitude + '&daddr=' + data.latitude + ',' + data.longitude + '&hl=' + langParm
        this.mapUrl = 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyDyPmQEXKMPAIY1ePwYI77yyi_d-HePBTA&origin=' + this.latitude + ',' + this.longitude + '&destination=' + data.latitude + ',' + data.longitude + '&mode=walking&language=' + langParm
        var routeMap = $("<div><iframe width='450' height='300' frameborder='0' style='zoom:2' style='border:0' src='" + this.mapUrl + "'</div>")
        return routeMap
    },

    createButton: function() {
        var button =
            $('<li><a href="#" id="tab1" operId="spotGoogleMap1" class="current" onclick=couponDetailView.changeMap("walking","tab1")>' + words[lang].travelMode.WALKING + '</a></li>' +
                '<li><a href="#" id="tab2"  operId="spotGoogleMap2" onclick=couponDetailView.changeMap("driving","tab2")>' + words[lang].travelMode.DRIVING + '</a></li>' +
                '<li><a href="#"  id="tab3" operId="spotGoogleMap3" onclick=couponDetailView.changeMap("transit","tab3")>' + words[lang].travelMode.TRANSIT + '</a></li>')
        return button
    },
    changeMap: function(mode, oid) {
        switch (mode) {
            case 'walking':
                this.mapUrl = this.mapUrl.replace(/driving|transit/, mode)
                break
            case 'driving':
                this.mapUrl = this.mapUrl.replace(/walking|transit/, mode)
                break
            case 'transit':
                this.mapUrl = this.mapUrl.replace(/walking|driving/, mode)
                break
        }
        $('.p-tab-nav a').removeClass('current')
        $('.p-tab-nav ' + '#' + oid).addClass('current')

        var routeMap = $("<div><iframe width='450' height='300' frameborder='0' style='zoom:2' style='border:0' src='" + this.mapUrl + "'</div>")
        $(".l-tab-content").empty().append(routeMap)
    },
    createDownloadMap: function(data) {
        $('#downloadMap').text(words[lang].downloadMap)
        var downloadMap =
            $('<p class="c-modal-close js-modal-close"></p>' +
                '<div class="l-modal-block__green">' +
                '<h2 class="p-modal-block__map">' + words[lang].downloadMap + '</h2>' +
                '<p class="u-txt-c" id="qrcode"></p>' +
                '<p class="u-txt-c u-mt35"><strong class="u-fz20 u-color-red">' + words[lang].downloadMapNote + '</strong></p>' +
                '</div>' +
                '<p class="u-mt40 u-txt-c"><a class="c-btn-close js-modal-close">' + words[lang].titles.close + '</a></p>')
        return downloadMap
    },

    showQrcode: function(url, id) {
        var options = {
            render: 'image',
            size: 150,
            background: '#fff',
            quiet: 1,
            minVersion: 1,
            maxVersion: 12,
            ecLevel: 'L',
            text: url
        }
        $('#' + id).empty().qrcode(options)
    },
    // 表示
    showShop: function(data, slider, about, coupon, card, map, button, downloadMap) {
        $('#slider').empty().append(slider)
        $('.l-about').empty().append(about)
        $('#couponSlider').empty().append(coupon)

        $('.p-table-detail').empty().append(card)
        $('.l-tab-content').empty().append(map)
        $('.p-tab-nav').empty().append(button)
        $('#modal-map').empty().append(downloadMap)

        $('.js-image-slider').slick({
            autoplay: true,
            autoplaySpeed: 8000,
            dots: true,
            arrows: false,
            swipe: false,
            slidesToShow: 1,
            slidesToScroll: 1,
        })

        $('.js-banner-slider').slick({
            dots: false,
            arrows: true,
            swipe: false,
            slidesToShow: 1,
            slidesToScroll: 1,
        })

        $('.js-modal-open').click(function() {
            $('body').append('<div class="l-modal-overlay"></div>')
            $('.l-modal-overlay').fadeIn(200)
            var modal = '#' + $(this).attr('data-target')
            modalResize()
            $(modal).fadeIn(200)
            $('.l-modal-overlay, .js-modal-close').off().click(function() {
                $(modal).fadeOut(200)
                $('.l-modal-overlay').fadeOut(200, function() {
                    $('.l-modal-overlay').remove()
                })
            })
            $(window).on('resize', function() {
                modalResize()
            })

            function modalResize() {
                var w = $(window).width()
                var h = $(window).height()
                var x = (w - $(modal).outerWidth(true)) / 2
                var y = (h - $(modal).outerHeight(true)) / 2
                $(modal).css({
                    'left': x + 'px',
                    'top': y + 'px'
                })
            }
        })
    }
}