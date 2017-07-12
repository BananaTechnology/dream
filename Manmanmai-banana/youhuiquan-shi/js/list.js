/**
 * 优惠券模块
 * Created by Administrator on 2017/7/9.
 */
require.config({
  baseUrl:"../js",  //设置默认路径
  paths:{
    jquery:"lib/jquery-3.2.1",
    text:"lib/text",
    arttemplate:"lib/template-web",
    Tpls:"../youhuiquan-shi"
  }
})
require(["jquery","text!Tpls/couponbody.html","arttemplate"],function($,couponbodyTpl,art){
  $.get("http://127.0.0.1:9090/api/getcoupon",{},function(res){
    console.log(couponbodyTpl);
    var couponbody = art.render(couponbodyTpl,res);
    var $couponbody = $(couponbody)
      .on("click",".quan-model ul",function(){
        var couponid = $(this).find("a").attr("couponId");

        //return false;
      });
    $(".quan-box").html($couponbody);
  })
})