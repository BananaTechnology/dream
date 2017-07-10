/**
 * Created by wangyiming on 2017/7/10.
 */

$(function () {
    let id = localStorage.getItem("productid");

    $.ajax({
        url: "http://192.168.17.28:9090/api/getproduct",
        type: "get",
        data: {productid: id},
        success(response) {
            let data = response.result[0];
            console.log(data);
            $.ajax({
                url: "http://192.168.17.28:9090/api/getproductcom",
                type: "get",
                data: {productid: id},
                success(res){
                    data.comment = res.result;

                    let productDetailsTpl = $("#priceSearchDetails").html();

                    let productDetailsHTML = template.render(productDetailsTpl, data);

                    $(".wrap").html(productDetailsHTML);

                }
            })
        }
    })
});