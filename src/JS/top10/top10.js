/**
 * Created by admin on 2017/7/9.
 */
require.config({
	baseUrl:'JS',
	paths:{
		jquery:'lib/jquery-3.2.1',
		art:'lib/template-web',
		text:'lib/text',
		zepto:'lib/zepto',

	//	配置Tpl文件路径
		Tpls:'../Tpls',
	}
});
require(['zepto','art','text!../top10.html','text!Tpls/top10/brandtitle.html'], function ($,art,top10Tpl,brandtitleTpl) {
	$.get('http://127.0.0.1:9090/api/getbrandtitle',{}, function (res) {
		//测试数据请求成功
		// console.log(res);

		var string = art.render(brandtitleTpl,res.result);
		//
		// var brandtitleid= getQueryString('brandtitleid');
		// console.log(brandtitleid);
		$('.top10-content').append(string)

		//点击事件实现的跳转
		//	touch事件需要在研究一下

			.on('touchstart', "a.goodsTop10a" ,function () {
				var goods = $(this).html();
				localStorage.setItem("goods",goods);//存储
			})






	})
})