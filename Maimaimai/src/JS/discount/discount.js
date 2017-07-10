$(function () {
    $.ajax({
        url:"http://127.0.0.1:9090/api/getinlanddiscount",
        success:function (res) {
            console.log(res.result);
            var $datalist=$(template('discountlist',res.result));
            $datalist.appendTo(".goodpart");
            $(function() {
                $(".everypart").lazyload({
                });
            });
            console.log($(".everypart"));
        }
    })
    //懒加载


})

