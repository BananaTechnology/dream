$(function() {
    // 导航栏数据获取
    $.get('http://127.0.0.1:9090/api/getindexmenu', function(data) {
        // console.log(data);
        var datas = template('nav-buttom', data);
        // console.log(datas);
        $('.nav-buttom ul').html(datas)


        // 导航栏点击事件
        $(".nav-buttom ul li").eq(7).on("click", function() {
            // console.log(123);
            $(this).nextAll().slideToggle();
        })
    })


    // 商品栏数据获取
    $.get('http://127.0.0.1:9090/api/getmoneyctrl', function(data) {
        var datas = template('section-buttom', data.result)
        $('.section-buttom ul').html(datas)
    })






    // 移动栏移动事件
    var winScroll = $(window).height() / 2;
    $(window).scroll(function() {
        if ($(window).scrollTop() > winScroll) {
            $('.aside-buttom').show();
        } else {
            $('.aside-buttom').hide();
        }
    })

})