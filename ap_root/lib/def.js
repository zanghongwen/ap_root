/*
 * def.js
 * ・固定文字列の多言語対応の定義。
 *
 */
if (!localStorage) {
    l = location
    p = l.pathname.replace(/(^..)(:)/, '$1$$')
    l.href = l.protocol + '//127.0.0.1' + p
}

// サービスのURLs
var base_site = 'http://localhost:3000'
// クーポン
var coupon_site = base_site + '/webcoupon.html'
// 画像、ＰＤＦ
var imgPDF_site = base_site + '/rf_images/map/'

// 画像サイトのURL
var image_site = '../rf_images/'

// 無操作タイムアウトの時間（ミリ秒）
var timeoutInterval = 10 * 60 * 1000

// 言語
var lang = sessionStorage.getItem('lang')
if (!lang) {
    // 初期起動時はデフォルト日本語
    lang = 'ja'
}

var errorMsg = 'データが取得できませんでした。'

// 言語定義
var words = {
    ja: {
        mapMenu: '地図・交通',
        spotMenu: '周辺検索',
        couponMenu: 'クーポン',
        japan2GoMenu: 'Japan2Go',
        brochureMenu: 'パンフレット',
        map: 'マップ',
        timeTable: '時刻表',
        qrScanView: 'スマホでパンフレットを見る',
        shopSection: '店舗情報',
        accessSection: 'アクセス',
        qrDownload: 'ダウンロード',
        qrSection: '携帯でルートを見る',
        disFromPreLoc: '現在地からの距離',
        downloadMap: '地図をダウンロード',
        downloadMapNote: 'QRコードをスマホで読み取り、<br>地図をダウンロードできます。',
        hot: '最新投稿',
        shop: '最新店舗',
        result: '件数',
        countSuffix: '件',
        listType: {
            hot: '最新投稿',
            shop: '最新店舗'
        },
        spot: {
            all: 'スポット',
            t1: '飲食店',
            t2: '宿泊施設',
            t3: '小売店',
            t4: '観光施設',
            t5: 'その他'
        },
        genre: {
            0: 'ジャンル',
            C_EVT: 'イベント',
            C_VEC: '交通',
            C_STY: '泊まる',
            C_LOK: '見る',
            C_BUY: '買う',
            C_PLY: '遊び',
            C_EAT: '食べる'
        },
        category: [{
            name: 'イベント',
            code: 'C_EVT',
            val: {
                C_EVT_02: 'イベント鑑賞',
                C_EVT_03: '祭事'
            }
        }, {
            name: '交通',
            code: 'C_VEC',
            val: {
                C_VEC_02: 'その他乗り物',
                C_VEC_03: 'レンタカー',
                C_VEC_04: '観光タクシー・ハイヤー・周遊バス',
            }
        }, {
            name: '泊まる',
            code: 'C_STY',
            val: {
                C_STY_02: 'ビジネスホテル等',
                C_STY_03: '日本ホテル協会会員ホテル',
                C_STY_04: '公的宿泊施設',
                C_STY_05: '旅館',
                C_STY_06: 'ペンション等',
                C_STY_07: '民宿',
                C_STY_08: '日本旅館協会会員旅館',
                C_STY_09: '全日本シティホテル連盟会員ホテル'
            }
        }, {
            name: '見る',
            code: 'C_LOK',
            val: {
                C_LOK_02: 'その他',
                C_LOK_03: '公園・庭園',
                C_LOK_04: '動・植物',
                C_LOK_05: '地域風俗・風習',
                C_LOK_06: '文化史跡',
                C_LOK_07: '文化施設',
                C_LOK_08: '神社仏閣',
                C_LOK_09: '施設景観',
                C_LOK_10: '自然景観',
                C_LOK_11: '観光案内'
            }
        }, {
            name: '買う',
            code: 'C_BUY',
            val: {
                C_BUY_02: 'ショッピング店',
                C_BUY_03: '伝統工芸技術',
                C_BUY_04: '特産物（味覚）'
            }
        }, {
            name: '遊ぶ',
            code: 'C_PLY',
            val: {
                C_PLY_02: 'スポーツ・レジャー',
                C_PLY_03: 'レクリエーション',
                C_PLY_04: '文化施設',
                C_PLY_05: '温泉'
            }
        }, {
            name: '食べる',
            code: 'C_EAT',
            val: {
                C_EAT_02: '郷土料理',
                C_EAT_03: '郷土料理店',
                C_EAT_04: 'カフェ・喫茶店',
                C_EAT_05: '和食全般',
                C_EAT_06: '焼肉・ホルモン・ジンギスカン',
                C_EAT_07: '焼き鳥・鶏料理',
                C_EAT_08: 'ラーメン',
                C_EAT_09: '寿司',
                C_EAT_10: 'お好み焼き・もんじゃ',
                C_EAT_11: 'そば・うどん',
                C_EAT_12: 'しゃぶしゃぶ',
                C_EAT_13: '和風創作料理',
                C_EAT_14: '洋食',
                C_EAT_15: 'フランス料理',
                C_EAT_99: 'その他'
            }
        }],
        distance: {
            0: '距離',
            100: '100m',
            300: '300m',
            500: '500m',
            1000: '～1km',
            2000: '～2km',
            3000: '2km～',
            4000: '4km以内',
            999999: '4km以上'
        },
        duration: {
            0: '時間',
            900: '15分以内',
            1800: '30分以内',
            3600: '1時間以内',
            999999: '1時間以上'
        },
        budget: {
            0: '平均予算',
            999: '情報なし',
            1000: '1000円以内',
            3000: '3000円以内',
            5000: '5000円以内',
            8000: '8000円以内',
            999999: '8000円以上'
        },
        travelMode: {
            WALKING: '徒歩',
            DRIVING: 'タクシー',
            TRANSIT: 'バス電車'
        },
        openTimeCaption: '営業時間',
        addressCaption: '住所',
        distanceCaption: '距離',
        telCaption: '電話番号',
        budgetCaption: '平均予算',
        service: {
            s1: 'Wi-Fi',
            s2: 'インターネット',
            s3: 'トイレ',
            s4: '休憩',
            s5: '電話',
            s6: 'コピー',
            s7: 'ファックス',
            s8: '英語対応',
            s9: '中国語対応'
        },
        titles: {
            lang: '言語',
            home: 'ホーム',
            back: 'もどる',
            close: '閉じる',
            pdfDownload: 'PDFファイルをダウンロード',
            pdfDownloadContext: 'QRコードをスマホで読み取り、PDFファイルをダウンロードできます。',
            couponDownloadContext: 'QRコードをスマホで読み取り、クーポンをダウンロードできます。',
            detail: '詳細を見る',
            expirationDate: '有効期限',
            address: '所在地',
            getCoupon: 'クーポンをGETする',
            print: '印刷する',
            recommend: 'オススメ',
            search: '検索',
            brochure: 'パンフレット',
            map: 'マップ',
            others: 'その他',
            shopsHots: '店舗情報＆HOT情報',
            meal: '食べる',
            stay: '泊まる',
            visit: '巡る',
            shop: '買う'
        }
    },
    en: {
        mapMenu: 'Map · Traffic',
        spotMenu: 'Area search',
        couponMenu: 'Coupon',
        japan2GoMenu: 'Japan2Go',
        brochureMenu: 'Brochure',
        map: 'Map',
        timeTable: 'Timetable',
        qrScanView: 'QR scan',
        shopSection: 'Infomation',
        accessSection: 'Access',
        qrDownload: 'Download',
        qrSection: 'View the route on a mobile',
        disFromPreLoc: 'distance from here',
        downloadMap: 'Download the map',
        downloadMapNote: 'QR code reading in a Smartphone, you can download the map.',
        hot: 'HOT Info',
        shop: 'SPOT Info',
        result: 'Search Results',
        countSuffix: '',
        listType: {
            hot: 'HOT Info',
            shop: 'Shop Info'
        },
        spot: {
            all: 'Spot',
            t1: 'Restaurant',
            t2: 'Hotel',
            t3: 'Shop',
            t4: 'Entertainment',
            t5: 'Others'
        },
        genre: {
            0: 'Genre',
            C_EVT: 'イベント_EN',
            C_VEC: '交通_EN',
            C_STY: '泊まる_EN',
            C_LOK: '見る_EN',
            C_BUY: '買う_EN',
            C_PLY: '遊び_EN',
            C_EAT: '食べる_EN'
        },
        category: [{
            name: 'イベント_EN',
            code: 'C_EVT',
            val: {
                C_EVT_02: 'イベント鑑賞_EN',
                C_EVT_03: '祭事_EN'
            }
        }, {
            name: '交通_EN',
            code: 'C_VEC',
            val: {
                C_VEC_02: 'その他乗り物_EN',
                C_VEC_03: 'レンタカー_EN',
                C_VEC_04: '観光タクシー・ハイヤー・周遊バス_EN',
            }
        }, {
            name: '泊まる_EN',
            code: 'C_STY',
            val: {
                C_STY_02: 'ビジネスホテル等_EN',
                C_STY_03: '日本ホテル協会会員ホテル',
                C_STY_04: '公的宿泊施設',
                C_STY_05: '旅館',
                C_STY_06: 'ペンション等',
                C_STY_07: '民宿',
                C_STY_08: '日本旅館協会会員旅館',
                C_STY_09: '全日本シティホテル連盟会員ホテル'
            }
        }, {
            name: '見る_EN',
            code: 'C_LOK',
            val: {
                C_LOK_02: 'その他_EN',
                C_LOK_03: '公園・庭園',
                C_LOK_04: '動・植物',
                C_LOK_05: '地域風俗・風習',
                C_LOK_06: '文化史跡',
                C_LOK_07: '文化施設',
                C_LOK_08: '神社仏閣',
                C_LOK_09: '施設景観',
                C_LOK_10: '自然景観',
                C_LOK_11: '観光案内'
            }
        }, {
            name: '買う_EN',
            code: 'C_BUY',
            val: {
                C_BUY_02: 'ショッピング店_EN',
                C_BUY_03: '伝統工芸技術',
                C_BUY_04: '特産物（味覚）'
            }
        }, {
            name: '遊ぶ_EN',
            code: 'C_PLY',
            val: {
                C_PLY_02: 'スポーツ・レジャー_EN',
                C_PLY_03: 'レクリエーション',
                C_PLY_04: '文化施設',
                C_PLY_05: '温泉'
            }
        }, {
            name: '食べる_EN',
            code: 'C_EAT',
            val: {
                C_EAT_02: '郷土料理_EN',
                C_EAT_03: '郷土料理店',
                C_EAT_04: 'カフェ・喫茶店',
                C_EAT_05: '和食全般',
                C_EAT_06: '焼肉・ホルモン・ジンギスカン',
                C_EAT_07: '焼き鳥・鶏料理',
                C_EAT_08: 'ラーメン',
                C_EAT_09: '寿司',
                C_EAT_10: 'お好み焼き・もんじゃ',
                C_EAT_11: 'そば・うどん',
                C_EAT_12: 'しゃぶしゃぶ',
                C_EAT_13: '和風創作料理',
                C_EAT_14: '洋食',
                C_EAT_15: 'フランス料理',
                C_EAT_99: 'その他'
            }
        }],
        distance: {
            0: 'Distance',
            100: '100m',
            300: '300m',
            500: '500m',
            1000: '～1km',
            2000: '～2km',
            3000: '2km～',
            4000: '- 4km',
            999999: '4km -'
        },
        duration: {
            0: 'Duration',
            900: '- 15 mins',
            1800: '- 30 mins',
            3600: '- 1 hour',
            999999: '1 hour -'
        },
        budget: {
            0: 'Budget',
            999: 'No info',
            1000: '- 1000 yen',
            3000: '- 3000 yen',
            5000: '- 5000 yen',
            8000: '- 8000 yen',
            999999: '8000 yen -'
        },
        travelMode: {
            WALKING: 'Walk',
            DRIVING: 'Taxi',
            TRANSIT: 'Bus train'
        },
        openTimeCaption: 'Operating Hours',
        addressCaption: 'Addresses',
        distanceCaption: 'Distance',
        telCaption: 'TEL',
        budgetCaption: 'Average budget',
        service: {
            s1: 'Wi-Fi',
            s2: 'Internet',
            s3: 'WC',
            s4: 'Rest Area',
            s5: 'Phone',
            s6: 'Copy',
            s7: 'Fax',
            s8: 'English',
            s9: 'Chinese'
        },
        titles: {
            lang: 'Language',
            home: 'Home',
            back: 'Back',
            close: 'Close',
            pdfDownload: 'Download the PDF file',
            pdfDownloadContext: 'QR code reading in a Smartphone, you can download the PDF file.',
            couponDownloadContext: 'QR code reading in a Smartphone, you can download coupons.',
            detail: 'See detail',
            expirationDate: 'Expiration Date',
            address: 'Address',
            getCoupon: 'get the coupon',
            print: 'Print',
            recommend: 'Recommended',
            search: 'Search',
            brochure: 'Brochure',
            map: 'Map',
            others: 'Others',
            shopsHots: 'Shop Info & HOT Info',
            meal: 'Meal',
            stay: 'Stay',
            visit: 'Visit',
            shop: 'Shop'
        }
    },
    cn: {
        mapMenu: '地图·交通',
        spotMenu: '周边的检索',
        couponMenu: '优惠券',
        japan2GoMenu: 'Japan2Go',
        brochureMenu: '宣传册',
        map: '地图',
        timeTable: '时刻表',
        qrScanView: '扫码查看',
        shopSection: '信息',
        accessSection: '访问',
        qrDownload: '下载',
        qrSection: '在移动端查看',
        disFromPreLoc: '来自现在的地方的距离',
        downloadMap: '下载地图',
        downloadMapNote: '由QR编码下载地图',
        hot: 'HOT 信息',
        shop: '店铺信息',
        result: '搜索结果',
        countSuffix: '',
        listType: {
            hot: 'HOT 信息',
            shop: '店铺信息'
        },
        spot: {
            all: '基地',
            t1: '餐馆',
            t2: '住宿',
            t3: '零售的',
            t4: '旅游设施',
            t5: '另'
        },
        genre: {
            0: '体裁',
            C_EVT: 'イベント_CN',
            C_VEC: '交通_CN',
            C_STY: '泊まる_CN',
            C_LOK: '見る_CN',
            C_BUY: '買う_CN',
            C_PLY: '遊び_CN',
            C_EAT: '食べる_CN'
        },
        category: [{
            name: 'イベント',
            code: 'C_EVT',
            val: {
                C_EVT_02: 'イベント鑑賞_CN',
                C_EVT_03: '祭事'
            }
        }, {
            name: '交通',
            code: 'C_VEC',
            val: {
                C_VEC_02: 'その他乗り物',
                C_VEC_03: 'レンタカー',
                C_VEC_04: '観光タクシー・ハイヤー・周遊バス',
            }
        }, {
            name: '泊まる',
            code: 'C_STY',
            val: {
                C_STY_02: 'ビジネスホテル等_CN',
                C_STY_03: '日本ホテル協会会員ホテル',
                C_STY_04: '公的宿泊施設',
                C_STY_05: '旅館',
                C_STY_06: 'ペンション等',
                C_STY_07: '民宿',
                C_STY_08: '日本旅館協会会員旅館',
                C_STY_09: '全日本シティホテル連盟会員ホテル'
            }
        }, {
            name: '見る',
            code: 'C_LOK',
            val: {
                C_LOK_02: 'その他_CN',
                C_LOK_03: '公園・庭園',
                C_LOK_04: '動・植物',
                C_LOK_05: '地域風俗・風習',
                C_LOK_06: '文化史跡',
                C_LOK_07: '文化施設',
                C_LOK_08: '神社仏閣',
                C_LOK_09: '施設景観',
                C_LOK_10: '自然景観',
                C_LOK_11: '観光案内'
            }
        }, {
            name: '買う',
            code: 'C_BUY',
            val: {
                C_BUY_02: 'ショッピング店_CN',
                C_BUY_03: '伝統工芸技術',
                C_BUY_04: '特産物（味覚）'
            }
        }, {
            name: '遊ぶ',
            code: 'C_PLY',
            val: {
                C_PLY_02: 'スポーツ・レジャー_CN',
                C_PLY_03: 'レクリエーション',
                C_PLY_04: '文化施設',
                C_PLY_05: '温泉'
            }
        }, {
            name: '食べる',
            code: 'C_EAT',
            val: {
                C_EAT_02: '郷土料理_CN',
                C_EAT_03: '郷土料理店',
                C_EAT_04: 'カフェ・喫茶店',
                C_EAT_05: '和食全般',
                C_EAT_06: '焼肉・ホルモン・ジンギスカン',
                C_EAT_07: '焼き鳥・鶏料理',
                C_EAT_08: 'ラーメン',
                C_EAT_09: '寿司',
                C_EAT_10: 'お好み焼き・もんじゃ',
                C_EAT_11: 'そば・うどん',
                C_EAT_12: 'しゃぶしゃぶ',
                C_EAT_13: '和風創作料理',
                C_EAT_14: '洋食',
                C_EAT_15: 'フランス料理',
                C_EAT_99: 'その他'
            }
        }],
        distance: {
            0: '距离',
            100: '100m',
            300: '300m',
            500: '500m',
            1000: '～1km',
            2000: '～2km',
            3000: '2km～',
            4000: '- 4 公里',
            999999: '4 公里 -'
        },
        duration: {
            0: '所需时间',
            900: '- 15 分',
            1800: '- 30 分',
            3600: '- 1 小时',
            999999: '1 小时 -'
        },
        budget: {
            0: '平均预算',
            999: '暂无信息',
            1000: '- 1000 日元',
            3000: '- 3000 日元',
            5000: '- 5000 日元',
            8000: '- 8000 日元',
            999999: '8000 日元 -'
        },
        travelMode: {
            WALKING: '徒步',
            DRIVING: '出租车',
            TRANSIT: '公交火车'
        },
        openTimeCaption: '营业时间',
        addressCaption: '住址',
        distanceCaption: '远方',
        telCaption: '电话号码',
        budgetCaption: '平均预算',
        service: {
            s1: '魏圣美 - 网络连接',
            s2: '因特网',
            s3: '马桶',
            s4: '歇',
            s5: '打电话',
            s6: '抄',
            s7: '传真',
            s8: '英语',
            s9: '中文'
        },
        titles: {
            lang: '语言',
            home: '首页',
            back: '返回',
            close: '闭上',
            pdfDownload: '下载PDF文件',
            pdfDownloadContext: '由QR编码下载PDF文件',
            couponDownloadContext: '由QR编码下载优惠券',
            detail: '查看详细',
            expirationDate: '有效期限',
            address: '位置',
            getCoupon: '取得优惠券',
            print: '印刷',
            recommend: '推荐',
            search: '搜索',
            brochure: '小册',
            map: '地图',
            others: '其他',
            shopsHots: '商店信息＆HOT信息',
            meal: '吃',
            stay: '留',
            visit: '访问',
            shop: '购买'
        }
    },
    tw: {
        mapMenu: '地圖·交通',
        spotMenu: '週邊的檢索',
        couponMenu: '優惠券',
        japan2GoMenu: 'Japan2Go',
        brochureMenu: '宣傳冊',
        map: '地圖',
        timeTable: '時刻表',
        qrScanView: '掃碼查看',
        shopSection: '信息',
        accessSection: '訪問',
        qrDownload: '下載',
        qrSection: '在移動端查看',
        disFromPreLoc: '來自現在的地方的距離',
        downloadMap: '下載地圖',
        downloadMapNote: '由QR編碼下載地圖',
        hot: 'HOT 信息',
        shop: '店鋪信息',
        result: '搜索結果',
        countSuffix: '',
        listType: {
            hot: 'HOT 信息',
            shop: '店鋪信息'
        },
        spot: {
            all: '基地',
            t1: '餐馆',
            t2: '住宿',
            t3: '零售的',
            t4: '旅游设施',
            t5: '另'
        },
        genre: {
            0: '體裁',
            C_EVT: 'イベント_TW',
            C_VEC: '交通_TW',
            C_STY: '泊まる_TW',
            C_LOK: '見る_TW',
            C_BUY: '買う_TW',
            C_PLY: '遊び_TW',
            C_EAT: '食べる_TW'
        },
        category: [{
            name: 'イベント_TW',
            code: 'C_EVT',
            val: {
                C_EVT_02: 'イベント鑑賞_TW',
                C_EVT_03: '祭事'
            }
        }, {
            name: '交通_TW',
            code: 'C_VEC',
            val: {
                C_VEC_02: 'その他乗り物_TW',
                C_VEC_03: 'レンタカー',
                C_VEC_04: '観光タクシー・ハイヤー・周遊バス',
            }
        }, {
            name: '泊まる_TW',
            code: 'C_STY',
            val: {
                C_STY_02: 'ビジネスホテル等_TW',
                C_STY_03: '日本ホテル協会会員ホテル',
                C_STY_04: '公的宿泊施設',
                C_STY_05: '旅館',
                C_STY_06: 'ペンション等',
                C_STY_07: '民宿',
                C_STY_08: '日本旅館協会会員旅館',
                C_STY_09: '全日本シティホテル連盟会員ホテル'
            }
        }, {
            name: '見る_TW',
            code: 'C_LOK',
            val: {
                C_LOK_02: 'その他_TW',
                C_LOK_03: '公園・庭園',
                C_LOK_04: '動・植物',
                C_LOK_05: '地域風俗・風習',
                C_LOK_06: '文化史跡',
                C_LOK_07: '文化施設',
                C_LOK_08: '神社仏閣',
                C_LOK_09: '施設景観',
                C_LOK_10: '自然景観',
                C_LOK_11: '観光案内'
            }
        }, {
            name: '買う_TW',
            code: 'C_BUY',
            val: {
                C_BUY_02: 'ショッピング店_TW',
                C_BUY_03: '伝統工芸技術',
                C_BUY_04: '特産物（味覚）'
            }
        }, {
            name: '遊ぶ_TW',
            code: 'C_PLY',
            val: {
                C_PLY_02: 'スポーツ・レジャー_TW',
                C_PLY_03: 'レクリエーション',
                C_PLY_04: '文化施設',
                C_PLY_05: '温泉'
            }
        }, {
            name: '食べる_TW',
            code: 'C_EAT',
            val: {
                C_EAT_02: '郷土料理_TW',
                C_EAT_03: '郷土料理店',
                C_EAT_04: 'カフェ・喫茶店',
                C_EAT_05: '和食全般',
                C_EAT_06: '焼肉・ホルモン・ジンギスカン',
                C_EAT_07: '焼き鳥・鶏料理',
                C_EAT_08: 'ラーメン',
                C_EAT_09: '寿司',
                C_EAT_10: 'お好み焼き・もんじゃ',
                C_EAT_11: 'そば・うどん',
                C_EAT_12: 'しゃぶしゃぶ',
                C_EAT_13: '和風創作料理',
                C_EAT_14: '洋食',
                C_EAT_15: 'フランス料理',
                C_EAT_99: 'その他'
            }
        }],
        distance: {
            0: '距離',
            100: '100m',
            300: '300m',
            500: '500m',
            1000: '～1km',
            2000: '～2km',
            3000: '2km～',
            4000: '- 4 公里',
            999999: '4 公里 -'
        },
        duration: {
            0: '所需時間',
            900: '- 15 分',
            1800: '- 30 分',
            3600: '- 20 小時',
            999999: '20 小時 -'
        },
        budget: {
            0: '平均預算',
            999: '暫無信息',
            1000: '- 1000 日元',
            3000: '- 3000 日元',
            5000: '- 5000 日元',
            8000: '- 8000 日元',
            999999: '8000 日元 -'
        },
        travelMode: {
            WALKING: '徒步',
            DRIVING: '計程車',
            TRANSIT: '公交火車'
        },
        openTimeCaption: '上班時間',
        addressCaption: '住址',
        distanceCaption: '遠方',
        telCaption: '電話號碼',
        budgetCaption: '平均預算',
        service: {
            s1: '魏圣美 - 网络连接',
            s2: '因特网',
            s3: '马桶',
            s4: '歇',
            s5: '打电话',
            s6: '抄',
            s7: '传真',
            s8: '英语',
            s9: '中文'
        },
        titles: {
            lang: '語言',
            home: '首頁',
            back: '返回',
            close: '閉上',
            pdfDownload: '下載 PDF 檔',
            pdfDownloadContext: '由QR編碼下載PDF檔案',
            couponDownloadContext: '由QR編碼下載优惠券',
            detail: '查看詳細',
            expirationDate: '有效期限',
            address: '地址',
            getCoupon: '取得優惠券',
            print: '印刷',
            recommend: '推薦',
            search: '搜索',
            brochure: '小冊',
            map: '地圖',
            others: '其他',
            shopsHots: '商店信息＆HOT信息',
            meal: '吃',
            stay: '留',
            visit: '訪問',
            shop: '購買'
        }
    },
    ko: {
        mapMenu: '지도 · 교통',
        spotMenu: '주변 검색',
        couponMenu: '쿠폰',
        japan2GoMenu: 'Japan2Go',
        brochureMenu: '팸플릿',
        map: '지도',
        timeTable: '시간표',
        qrScanView: '쓸다 코드 보기',
        shopSection: '점포 정보',
        accessSection: '액세스',
        qrDownload: '다운로드',
        qrSection: '휴대 전화에서 보기',
        disFromPreLoc: '현재 위치 로부터의 거리',
        downloadMap: '지도 다운로드',
        downloadMapNote: 'QR코드로 지도를 다운로드',
        hot: '最新投稿',
        shop: '最新店舗',
        result: '件数',
        countSuffix: '件',
        listType: {
            hot: '最新投稿',
            shop: '最新店舗'
        },
        spot: {
            all: 'スポット',
            t1: '飲食店',
            t2: '宿泊施設',
            t3: '小売店',
            t4: '観光施設',
            t5: 'その他'
        },
        genre: {
            0: '장르',
            C_EVT: 'イベント_KR',
            C_VEC: '交通_KR',
            C_STY: '泊まる_KR',
            C_LOK: '見る_KR',
            C_BUY: '買う_KR',
            C_PLY: '遊び_KR',
            C_EAT: '食べる_KR'
        },
        category: [{
            name: 'イベント_KR',
            code: 'C_EVT',
            val: {
                C_EVT_02: 'イベント鑑賞_KR',
                C_EVT_03: '祭事'
            }
        }, {
            name: '交通_KR',
            code: 'C_VEC',
            val: {
                C_VEC_02: 'その他乗り物_KR',
                C_VEC_03: 'レンタカー',
                C_VEC_04: '観光タクシー・ハイヤー・周遊バス',
            }
        }, {
            name: '泊まる_KR',
            code: 'C_STY',
            val: {
                C_STY_02: 'ビジネスホテル等_KR',
                C_STY_03: '日本ホテル協会会員ホテル',
                C_STY_04: '公的宿泊施設',
                C_STY_05: '旅館',
                C_STY_06: 'ペンション等',
                C_STY_07: '民宿',
                C_STY_08: '日本旅館協会会員旅館',
                C_STY_09: '全日本シティホテル連盟会員ホテル'
            }
        }, {
            name: '見る_KR',
            code: 'C_LOK',
            val: {
                C_LOK_02: 'その他_KR',
                C_LOK_03: '公園・庭園',
                C_LOK_04: '動・植物',
                C_LOK_05: '地域風俗・風習',
                C_LOK_06: '文化史跡',
                C_LOK_07: '文化施設',
                C_LOK_08: '神社仏閣',
                C_LOK_09: '施設景観',
                C_LOK_10: '自然景観',
                C_LOK_11: '観光案内'
            }
        }, {
            name: '買う_KR',
            code: 'C_BUY',
            val: {
                C_BUY_02: 'ショッピング店_KR',
                C_BUY_03: '伝統工芸技術',
                C_BUY_04: '特産物（味覚）'
            }
        }, {
            name: '遊ぶ_KR',
            code: 'C_PLY',
            val: {
                C_PLY_02: 'スポーツ・レジャー_KR',
                C_PLY_03: 'レクリエーション',
                C_PLY_04: '文化施設',
                C_PLY_05: '温泉'
            }
        }, {
            name: '食べる_KR',
            code: 'C_EAT',
            val: {
                C_EAT_02: '郷土料理_KR',
                C_EAT_03: '郷土料理店',
                C_EAT_04: 'カフェ・喫茶店',
                C_EAT_05: '和食全般',
                C_EAT_06: '焼肉・ホルモン・ジンギスカン',
                C_EAT_07: '焼き鳥・鶏料理',
                C_EAT_08: 'ラーメン',
                C_EAT_09: '寿司',
                C_EAT_10: 'お好み焼き・もんじゃ',
                C_EAT_11: 'そば・うどん',
                C_EAT_12: 'しゃぶしゃぶ',
                C_EAT_13: '和風創作料理',
                C_EAT_14: '洋食',
                C_EAT_15: 'フランス料理',
                C_EAT_99: 'その他'
            }
        }],
        distance: {
            0: '거리',
            100: '100m',
            300: '300m',
            500: '500m',
            1000: '～1km',
            2000: '～2km',
            3000: '2km～',
            4000: '- 4킬로미터',
            999999: '4킬로미터 -'
        },
        duration: {
            0: '시간',
            900: '- 15분',
            1800: '- 30분',
            3600: '- 1시간',
            999999: '1시간 -'
        },
        budget: {
            0: '평균 예산',
            999: '정보 없음',
            1000: '1000일본 엔',
            3000: '3000일본 엔',
            5000: '5000일본 엔',
            8000: '8000일본 엔',
            999999: '8000일본 엔 -'
        },
        travelMode: {
            WALKING: '도보',
            DRIVING: '택시',
            TRANSIT: '버스 기차'
        },
        openTimeCaption: '영업 시간',
        addressCaption: '주소',
        distanceCaption: '거리',
        telCaption: '전화 번호',
        budgetCaption: '예산',
        service: {
            s1: 'Wi-Fi',
            s2: '인터넷',
            s3: '화장실',
            s4: '쉬다',
            s5: '전화기',
            s6: '프린트',
            s7: '팩시밀리',
            s8: '영어 대응',
            s9: '중국어 대응'
        },
        titles: {
            lang: '언어',
            home: '홈',
            back: '돌아가기',
            close: '닫기',
            pdfDownload: 'PDF 파일을 다운로드',
            pdfDownloadContext: 'QR코드로 PDF파일을 다운로드',
            couponDownloadContext: 'QR코드로 쿠폰을 다운로드 ',
            detail: '자세한 내용은',
            expirationDate: '유효기간',
            address: '소재지',
            getCoupon: '쿠폰을 얻는',
            print: '인쇄 하기',
            recommend: '추천',
            search: '검색',
            brochure: '소책자',
            map: '지도',
            others: '기타',
            shopsHots: '가게 정보 & HOT 정보',
            meal: '먹다',
            stay: '숙박',
            visit: '순시하다',
            shop: '사다'
        }
    },
    th: {
        mapMenu: 'แผนที่และการเดินทาง',
        spotMenu: 'ค้นหาใกล้',
        couponMenu: 'คูปอง',
        japan2GoMenu: 'Japan2Go',
        brochureMenu: 'โบรชัวร์',
        map: 'แผนที่',
        timeTable: 'ตารางเวลาสำหรับ',
        qrScanView: 'รหัสและความคิดเห็น',
        shopSection: 'คณะเทคโนโลยีสารสนเทศ',
        accessSection: 'การเข้าถึง',
        qrDownload: 'ดาวน์โหลด',
        qrSection: 'มุมมองในโทรศัพท์มือถือ',
        disFromPreLoc: 'ระยะทางจากตำแหน่งปัจจุบัน',
        downloadMap: 'ดาวน์โหลดแผนที่',
        downloadMapNote: 'ดาวน์โหลดแผนที่จาก QR code',
        hot: 'โพสต์ล่าสุด',
        shop: 'ข่าวร้าน',
        result: 'หมายเลขของ',
        countSuffix: 'เรื่อง',
        listType: {
            hot: 'โพสต์ล่าสุด',
            shop: 'ข่าวร้าน'
        },
        spot: {
            all: 'จุด',
            t1: 'ร้านอาหาร',
            t2: 'ที่พัก',
            t3: 'ร้านค้าปลีก',
            t4: 'สิ่งอํานวยความสะดวกทางการท่องเที่ยว',
            t5: 'อื่น ๆ'
        },
        genre: {
            0: 'ประเภท',
            C_EVT: 'イベント_TH',
            C_VEC: '交通_TH',
            C_STY: '泊まる_TH',
            C_LOK: '見る_TH',
            C_BUY: '買う_TH',
            C_PLY: '遊び_TH',
            C_EAT: '食べる_TH'
        },
        category: [{
            name: 'イベント_TH',
            code: 'C_EVT',
            val: {
                C_EVT_02: 'イベント鑑賞_TH',
                C_EVT_03: '祭事'
            }
        }, {
            name: '交通_TH',
            code: 'C_VEC',
            val: {
                C_VEC_02: 'その他乗り物_TH',
                C_VEC_03: 'レンタカー',
                C_VEC_04: '観光タクシー・ハイヤー・周遊バス',
            }
        }, {
            name: '泊まる_TH',
            code: 'C_STY',
            val: {
                C_STY_02: 'ビジネスホテル等_TH',
                C_STY_03: '日本ホテル協会会員ホテル',
                C_STY_04: '公的宿泊施設',
                C_STY_05: '旅館',
                C_STY_06: 'ペンション等',
                C_STY_07: '民宿',
                C_STY_08: '日本旅館協会会員旅館',
                C_STY_09: '全日本シティホテル連盟会員ホテル'
            }
        }, {
            name: '見る_TH',
            code: 'C_LOK',
            val: {
                C_LOK_02: 'その他_TH',
                C_LOK_03: '公園・庭園',
                C_LOK_04: '動・植物',
                C_LOK_05: '地域風俗・風習',
                C_LOK_06: '文化史跡',
                C_LOK_07: '文化施設',
                C_LOK_08: '神社仏閣',
                C_LOK_09: '施設景観',
                C_LOK_10: '自然景観',
                C_LOK_11: '観光案内'
            }
        }, {
            name: '買う_TH',
            code: 'C_BUY',
            val: {
                C_BUY_02: 'ショッピング店_TH',
                C_BUY_03: '伝統工芸技術',
                C_BUY_04: '特産物（味覚）'
            }
        }, {
            name: '遊ぶ_TH',
            code: 'C_PLY',
            val: {
                C_PLY_02: 'スポーツ・レジャー_TH',
                C_PLY_03: 'レクリエーション',
                C_PLY_04: '文化施設',
                C_PLY_05: '温泉'
            }
        }, {
            name: '食べる_TH',
            code: 'C_EAT',
            val: {
                C_EAT_02: '郷土料理_TH',
                C_EAT_03: '郷土料理店',
                C_EAT_04: 'カフェ・喫茶店',
                C_EAT_05: '和食全般',
                C_EAT_06: '焼肉・ホルモン・ジンギスカン',
                C_EAT_07: '焼き鳥・鶏料理',
                C_EAT_08: 'ラーメン',
                C_EAT_09: '寿司',
                C_EAT_10: 'お好み焼き・もんじゃ',
                C_EAT_11: 'そば・うどん',
                C_EAT_12: 'しゃぶしゃぶ',
                C_EAT_13: '和風創作料理',
                C_EAT_14: '洋食',
                C_EAT_15: 'フランス料理',
                C_EAT_99: 'その他'
            }
        }],
        distance: {
            0: 'ระยะทาง',
            100: '100m',
            300: '300m',
            500: '500m',
            1000: '～1km',
            2000: '～2km',
            3000: '2km～',
            4000: '- 4 กม.',
            999999: '4 กม. -'
        },
        duration: {
            0: 'เวลา',
            900: '- 15 นาที',
            1800: '- 30 นาที',
            3600: '- หนึ่งชั่วโมง',
            999999: 'หนึ่งชั่วโมง -'
        },
        budget: {
            0: 'งบประมาณเฉลี่ย',
            999: 'ไม่มีข้อมูล',
            1000: '1000 เยน',
            3000: '3000 เยน',
            5000: '5000 เยน',
            8000: '8000 เยน',
            999999: '8000 เยน -'
        },
        travelMode: {
            WALKING: 'เดิน',
            DRIVING: 'รถแท็กซี่',
            TRANSIT: 'รถไฟรถบัส'
        },
        openTimeCaption: 'เวลาทำการ',
        addressCaption: 'ที่อยู่',
        distanceCaption: 'ระยะทาง',
        telCaption: 'หมายเลขโทรศัพท์',
        budgetCaption: 'พิธีกรรมของภูเขา',
        service: {
            s1: 'Wi-Fi',
            s2: 'อินเทอร์เน็ต',
            s3: 'ห้องน้ำ',
            s4: 'แบ่ง',
            s5: 'โทรศัพท์',
            s6: 'คัดลอก',
            s7: 'โทรสาร',
            s8: 'จดหมายภาษาอังกฤษ',
            s9: 'จีนภาษา'
        },
        titles: {
            lang: 'ภาษา',
            home: 'บ้าน',
            back: 'กลับ',
            close: 'ปิด',
            pdfDownload: 'ดาวน์โหลดไฟล์ PDF',
            pdfDownloadContext: 'ดาวน์โหลดไฟล์ PDF จาก QR code',
            couponDownloadContext: 'ดาวน์โหลดคูปองจาก QR code',
            detail: 'ดูรายละเอียด',
            expirationDate: 'ระยะเวลาที่มีประสิทธิภาพ',
            address: 'ที่อยู่',
            getCoupon: 'จะได้รับคูปอง',
            print: 'พิมพ์',
            recommend: 'แท็ก',
            search: 'ค้นหา',
            brochure: 'โบรชัวร์',
            map: 'แผนที่',
            others: 'อื่น ๆ',
            shopsHots: 'ข่าวร้อนข่าว',
            meal: 'กิน',
            stay: 'อยู่',
            visit: 'มากกว่า',
            shop: 'ซื้อ'
        }
    }
}

// 一定時間無操作の場合ホームに戻る（ホームにいる時を除く）
$(function() {
    var url = window.location.href
    if ((url.substr(-1) !== '/') && (url.substr(-10) !== 'intro.html')) {
        var timer = setTimeout(goHome, timeoutInterval)
        $(window).on('click', function() {
            clearTimeout(timer)
            timer = setTimeout(goHome, timeoutInterval)
        })
    }
})

// 無操作タイムアウトの処理
var goHome = function() {
    location.href = 'intro.html?lang=' + lang
}

/**
 * [Returns a key-value array by current url ]
 * @return URL Parameters
 */
function getUrlVars() {
    var vars = [],
        hash
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=')
        vars.push(hash[0])
        vars[hash[0]] = hash[1]
    }
    return vars
}

/**
 * Filter data by condition type and distance 
 * @param  data
 * @param  condition
 * @return filterd data
 */
function findData(data, condition) {
    var genreLength = condition.genre.length
    var distanceLength = condition.distance.length
    if (genreLength == 0 && distanceLength == 0 && condition.date == null) {
        return data
    }

    var result = []
    for (var i in data) {
        // ジャンル
        if (genreLength > 0) {
            if (data[i].category !== condition.genre[0] && data[i].category.substr(0, 5) !== condition.genre[0]) {
                continue
            }
        }

        // 距離
        if (distanceLength > 0) {
            // 2KM~
            if (parseFloat(condition.distance[0]) > 2000 && data[i].distance < 2000) {
                continue
                // ~2KM
            } else if (parseFloat(condition.distance[0]) <= 2000 && data[i].distance > parseFloat(condition.distance[0])) {
                continue;
            }
        }

        if (condition.date != null) {
            if (data[i].expirationDateTo <= condition.date) {
                continue
            }
        }
        result.push(data[i])
    }
    return result
}

function getParentCode(code) {
    if (code !== undefined && code !== null && code != '') {
        return code.substr(0, 5)
    }
}

function CurrentTime() {
    var now = new Date()

    var year = now.getFullYear(); //年
    var month = now.getMonth() + 1; //月
    var day = now.getDate(); //日

    var clock = year + '/'

    if (month < 10)
        clock += '0'

    clock += month + '/'

    if (day < 10)
        clock += '0'

    clock += day
    return (clock)
}

/**
 * 共通の方法
 * 
 */
function createSelection() {
    // genre
    $('.p-btn-genre').empty().text(words[lang].genre[0])

    // distance
    $('.p-btn-distance').empty().text(words[lang].distance[0])
    $('#distanceLabel1').empty().text(words[lang].distance[100])
    $('#distanceLabel2').empty().text(words[lang].distance[300])
    $('#distanceLabel3').empty().text(words[lang].distance[500])
    $('#distanceLabel4').empty().text(words[lang].distance[1000])
    $('#distanceLabel5').empty().text(words[lang].distance[2000])
    $('#distanceLabel6').empty().text(words[lang].distance[3000])

    var data = words[lang].category
    var info
    for (var i in data) {
        info = '<p class="p-accordion__link"><a href="javascript:void(0)" value="' + data[i].code + '">' + data[i].name + '</a></p>' +
            '<span class="p-accordion__open"></span>' +
            '<ul class="p-accordion__content">'
        for (var j in data[i].val) {
            info += '<li><a href="javascript:void(0)" value="' + j + '">' + data[i].val[j] + '</a></li>'
        }
        info += '</ul>'
        $('.p-dropdown__genre').append(info)
    }

    $('.p-accordion__open').click(function() {
        $(this).next('.p-accordion__content').slideToggle(300).siblings('.p-accordion__content').slideUp(300)
        $(this).siblings('.p-accordion__open').removeClass('active')
        $(this).toggleClass('active')
    })
}