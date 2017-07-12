/**
 * Created by wangyiming on 2017/7/9.
 */

$(function () {

    let id = localStorage.getItem("categoryId");
    $.ajax({
        url: "http://127.0.0.1:9090/api/getproductlist",
        type: "get",
        data: {categoryid: id},
        success(response) {
            let productListTpl = $("#priceSearchList").html();
            response.pageNums = new Array(Math.ceil(response.totalCount / response.pagesize));
            let productListHTML = template.render(productListTpl, response);
            console.log(response);
            $(".wrap").html(productListHTML);

            $(".productListBox").on("touchstart", ".productItem", function () {
                localStorage.setItem("productid", $(this).attr("productid"));
                localStorage.setItem("item",$(this).attr("brandName"));
            });

            $(".productSwitch button").on("touchstart", function () {
                let Num = $(".productSwitch select").val() - 0;
                if (this.className === "prev") {
                    Num = Num === 1 ? 1 : Num - 1;
                } else {
                    Num = Num === response.pageNums.length ? response.pageNums.length : Num + 1;
                }
                swith(Num);
            });

            $(".productSwitch select").on("change",function () {
                let Num = $(this).val();
                swith(Num);
            });

            /**
             * 切换页数
             * @param pageNum 页数
             */
            function swith(pageNum) {
                $.ajax({
                    url: "http://127.0.0.1:9090/api/getproductlist",
                    type: "get",
                    data: {categoryid: id, pageid: pageNum},
                    success(res) {
                        console.log(res);
                        let liTPL = $("#liTPL").html();
                        let liHTML = template.render(liTPL, res);
                        $(".productListBox ul").html(liHTML);
                        console.log(pageNum);
                        $(".productSwitch select option").removeAttr("selected");
                        $(".productSwitch select option")[pageNum - 1].setAttribute("selected", "selected")
                    }
                })
            }


        }
    });
});