// define(["zepto","jquery","text!tpls/detailinfo.html","arttemplate"],function (ze,$,detail,art) {
//  return function (id) {

function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

var id = getQueryString('cd_id');
     console.log(id);
     $.get("http://127.0.0.1:9090/api/getdiscountproduct",{productid:id},function (res) {
         console.log(res.result);
         //将这些数据添加到新的模板中。

         var datalistone =template("discountDetail",res.result[0]);

         $(".goodsDetail").empty().append(datalistone);
         console.log(datalistone);



    $(".publish").on("click",function () {
        var content=$(".cont").html();
        var user =$("#ctl00_ContentBody_lbl_fbr").val();
        var goods=$("#ctl00_ContentBody_hid_name").val();


        //把这些val值渲染到页面。
        $(".userName").html(user);
        $(".info").html(content);
        $(".cont").html("");
    })
         $(".publish").trigger("click");

     })
 // }
// })
