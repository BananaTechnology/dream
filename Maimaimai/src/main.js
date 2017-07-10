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
        swiper: '../assets/swiper/swiper-3.4.2.jquery.min'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        swiper: {
            deps: ['jquery']
        }
    }
})
require(['jquery', 'text!tpls/baicaijiaList.html', 'baicaijia/baicaijia', 'arttemplate'], function($, baicaijiaListTpl, baicaijia, art) {
    /*底部箭头返回事件*/
    $(window).scroll(function() {
            var scrollTop = $(window, ducument).scrollTop();
            var height = $(window).height();
            console.log(scrollTop + height);
        })
        /*标题tab栏数据请求*/
    $.get('http://127.0.0.1:9090/api/getbaicaijiatitle', {}, function(res) {
        // console.log(res);
        var baicaijiaList = art.render(baicaijiaListTpl, res.result);
        var $baicaijiaList = $(baicaijiaList).on('click', '.bcj-item', function() {
            $(this).addClass('active').parent().siblings().children("a").removeClass('active');
            var titleId = $(this).attr('titleId');
            // 根据id去请求内容
            baicaijia(titleId);
        });
        $('.bcj-topContainer').append($baicaijiaList);
        $('.bcj-item').eq(0).trigger('click');
        // 
        // var mySwiper = new Swiper('.bcj-layout', {
        //     onScroll: function(swiper) {
        //         console.log('您通过滚轮操作了swiper');
        //     }
        // });
        // 导航栏滑动效果,初始化swiper
        var bcjtab = new Swiper('.bcj-tabItem', {
            // direction: 'vertical',
            slidesPerView: 'auto',
            mousewheelControl: true,
            freeMode: true,
            roundLengths: true, //防止文字模糊
        });
    })
})