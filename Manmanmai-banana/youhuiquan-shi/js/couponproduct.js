/**
 * 优惠券列表模块
 * Created by Administrator on 2017/7/9.
 */
require.config({
  baseUrl: "../js",  //设置默认路径
  paths: {
    jquery: "lib/jquery-3.2.1",
    text: "lib/text",
    arttemplate: "lib/template-web",
    Tpls: "../youhuiquan-shi",
    Swiper:"../assets/swiper/swiper-3.4.2.jquery.min"
  },
  shim:{
    Swiper:{
      deps:["jquery"] //依赖jQuery
    }
  }
});
require(["jquery", "text!Tpls/couponproductList.html", "arttemplate","Swiper"], function ($, couponproductListTpl, art,Swiper) {

  var getkey = getQueryString("key");
  var getCouponTitle = getQueryString("couponTitle");
  var couponproductListTpl = couponproductListTpl
  $.get("http://127.0.0.1:9090/api/getcouponproduct", {couponid: getkey}, function (res) {

    res.getCouponTitle=getCouponTitle;
    console.log(res);
    var flag = true;
    var couponproductList = art.render(couponproductListTpl, res);
    var $couponproductList = $(couponproductList)
      .on("click","li",function(){
        var index = $(this).attr("couponProductId");
        console.log(index);
        $(".swiper-pagination-bullet").eq(index).trigger("click");
        setTimeout(function(){
          $couponproductList.find(".lunbo").addClass("show");
        },300)

        $couponproductList.find(".masklayer").css("display","block")
          //阻止滑动
          .on("touchmove",function(e){
            e.preventDefault();
          })
          .on("click",function(e){
            $(this).css("display","none");
            $couponproductList.find(".lunbo").removeClass("show");
          });

      });



    $(".couponproduct").html($couponproductList);

    var mySwiper = new Swiper ('.swiper-container', {
      //direction: 'vertical',
      loop: true,

      // 如果需要分页器
      pagination: '.swiper-pagination',

      // 如果需要前进后退按钮
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',

      paginationClickable :true,

      // 如果需要滚动条
      //scrollbar: '.swiper-scrollbar',
      //paginationBulletRender: function (swiper, index, className) {
      //  return '<span class="' + className + '">' + (6 + 1) + '</span>';
      //}
    })

  });


  ////是用来获取url中的参数的值的 根据参数名获取参数值 下面的有补充
  //function getQueryString(name) {
  //  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  //  var r = window.location.search.substr(1).match(reg);
  //  if (r != null) {
  //    return unescape(r[2]);
  //  }
  //  return null;
  //}

  //是用来获取url中的参数的值的 根据参数名获取参数值升级版
  function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      var str = decodeURI(r[2]);
      var reg = /^'(\S+)'$/;
      if (reg.test(str)) {
        str = str.replace(/'/g, "");
      }
      return str;
    }
    return null;
  }

  //$(document).ready(function () {

  //})




});


