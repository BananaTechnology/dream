define([
    'jquery', 'text!tpls/baicaijiaGoods.html', 'arttemplate', 'bootstrap', 'swiper'
], function($, baicaijiaGoodsTpl, art) {
    return function(titleId) {
        // console.log('按需加载的内容' + titleId);
        $.get('http://127.0.0.1:9090/api/getbaicaijiaproduct', { titleid: titleId }, function(res) {
            console.log(res);
            var baicaijiaGoods = art.render(baicaijiaGoodsTpl, res.result);
            var $baicaijiaGoods = $(baicaijiaGoods);
            if (titleId == 0) {
                $baicaijiaGoods.find('.bcj-banner').addClass('active');
            }
            $('.bcj-container').html($baicaijiaGoods);
        })
    };
});