var brandtitleid = getQueryString("brandtitleid");
$.get('http://127.0.0.1:9090/api/getbrand', {'brandtitleid': brandtitleid}, function (res) {
	// console.log(res);
	//	数据渲染到页面上
	var $detailTop10 = template('answerList', res.result);
	$('.answerListU').append($detailTop10);

	// 追加三级标签
	var goods = localStorage.getItem('goods');
	var good = goods.trim()
	$('.category .three').html(good.substring(0, good.length - 4) + '哪个牌子好')

	//	改变question的内容
	$('.question').html(good.substring(0, good.length - 4) + '哪个牌子好');
	//改变标题
	$('title').html(good.substring(0, good.length - 4) + '哪个牌子好');
//	改变cellRanking的内容
	$('.cellRanking').html(good.substring(0, good.length - 4) + '产品销量排行');
//改变newestComment的内容
	$('.newestComment').html(good.substring(0, good.length - 4) + '最新评论');

})


//品牌标题对应的十大品牌的销量排行商品列表
$.get('http://127.0.0.1:9090/api/getbrandproductlist',{'brandtitleid': brandtitleid}, function (res) {
	// console.log(res);
	var cellRankContStr = template('cellRankCont',res.result);
	$('.cellRankCont ul').html(cellRankContStr)


})
//获取最新评论
$.get('http://127.0.0.1:9090/api/getproductcom',{'productid': brandtitleid}, function (res) {
	console.log(res);
	var newestCommentStr = template('newestCommentCont',res.result);
	$('.newestCommentCont ul').html(newestCommentStr);

	res.result.forEach(function (v,i) {

		var productid = v.comId;

		$.get('http://127.0.0.1:9090/api/getproduct',{'productid':productid} ,function (res) {
			// console.log(res);
			var goodsInfo = template('goodsInfo',res.result);

			$('.goodsInfo').eq(i).prepend(goodsInfo);
		})
	})

})

