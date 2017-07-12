require.config({
    baseUrl: "JS",
    paths: {
        jquery: "lib/jquery-3.2.1",
        text: "lib/text",
        arttemplate: "lib/template-web",
        //配置tpls文件夹路径
        tpls: "../Tpls",
        bootstrap: "../assets/bootstrap/js/bootstrap",
        // 配置swiper的路径
        swiper: '../assets/swiper/swiper-3.4.2.jquery.min',
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        swiper: {
            deps: ['jquery']
        },
    }
})
require(['jquery', 'text!tpls/baicaijiaList.html', 'baicaijia/baicaijia', 'arttemplate', ], function($, baicaijiaListTpl, baicaijia, art) {
    /*标题tab栏数据请求*/
    $.get('http://127.0.0.1:9090/api/getbaicaijiatitle', {}, function(res) {
        // console.log(res);
        var baicaijiaList = art.render(baicaijiaListTpl, res.result);
        var $baicaijiaList = $(baicaijiaList)
            .on('click', '.bcj-item', function() {
                $(this).addClass('active').siblings().removeClass('active');
                var val = $(this).children('a').html() + '-淘宝内部券';
                // console.log(val);
                var titleId = $(this).attr('titleId');
                if (titleId != 0) {
                    $baicaijiaList.find('h1').html(val);
                }
                // 根据id去请求内容
                baicaijia(titleId);
            });
        $('.bcj-topContainer').append($baicaijiaList);
        /*搜索框的显示隐藏*/
        var flag = true;
        $('.bcj-search').on('click', function() {
            if (flag) {
                $(this).children('i').addClass('icon-remove').removeClass('icon-align-left');
            } else {
                $(this).children('i').addClass('icon-align-left').removeClass('icon-remove');
            }
            flag = !flag;
            $('.bcj-searchHide').toggleClass('show');
        })
        $('.bcj-item').eq(0).trigger('click');
        // 导航栏滑动效果,初始化swiper
        var bcjtab = new Swiper('.bcj-swiperContent', {
            // direction: 'vertical',
            slidesPerView: 'auto',
            // mousewheelControl: true,
            freeMode: true,
            roundLengths: true, //防止文字模糊
        });
        /*底部箭头显示隐藏*/
        $('body').on('touchmove mousewheel', function(e) {
            var deviceHeight = $(window).height();
            var scrollHeight = $('body').scrollTop();
            // console.log(scrollHeight
            if (scrollHeight > deviceHeight / 2) {
                $('.bcj-toTop').css('display', 'block');
            } else {
                $('.bcj-toTop').css('display', 'none');
            }
        })
        $('.bcj-toTop').on('click', function() {
            $('body').scrollTop('0px');
            $('.bcj-toTop').css('display', 'none');
        })
    })
})