/**
 * Created by wangyiming on 2017/7/9.
 */
"use strict";
$(function () {
    //请求数据
    $.ajax({
        url: "http://127.0.0.1:9090/api/getcategorytitle",
        type: "get",
        data: null,
        success(response) {
            let data = response.result;
            //取得列表导航数量
            let listNavNums = data.length;
            data.forEach((item, index) => {
                let id = item.titleId;
                $.ajax({
                    url: 'http://127.0.0.1:9090/api/getcategory',
                    type: 'get',
                    data: {titleid: id},
                    success(res) {
                        item.childProduct = res.result;
                        if (listNavNums === index + 1) {
                            let homeTpl = $("#priceSearchHome").html();
                            let homeHTML = template.render(homeTpl, data);

                            //渲染页面
                            $(".wrap").html(homeHTML);

                            //绑定事件
                            $(".productTitleList").on("touchstart", e => {
                                let {target} = e;
                                if ("H3" === target.nodeName) {
                                    if ($(target).siblings(".productChildBox").css("display") === "none") {
                                        $(target).siblings(".productChildBox").show();
                                        $(target).siblings(".pullDown")[0].style.backgroundImage = 'url(../images/arrow2.gif)'
                                    } else {
                                        $(target).siblings(".productChildBox").hide();
                                        $(target).siblings(".pullDown")[0].style.backgroundImage = 'url(../images/arrow1.gif)'
                                    }
                                }
                            }).on("touchstart", e => {
                                let {target} = e;
                                if ($(target).attr("categoryId")) {
                                    localStorage.setItem("categoryId", $(target).attr("categoryId"));
                                    localStorage.setItem("sort", $(target).text());

                                    window.location = "/jian/bijia-wang/search-List.html";
                                }
                            })
                        }
                    }
                });
            })

        }
    });
});

