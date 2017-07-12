/**
 * �յ�ģ��
 * Created by Lynn_ on 2017/7/9.
 */
$(function(){
    //Ĭ�ϼ���ģ��
    $.ajax({
        url:'http://127.0.0.1:9090/api/getgsproduct',
        type:'get',
        data:{
            shopid:0,
            areaid:0
        },
        success:function(res){
            var storeList = template('listShow',res);
            $('.bd ul').html(storeList);
        }
    });

    //�����ȡ��Ӧ������
    $('.filter').on('click','a',function(){
        //���Ƶ�����ļ�ͷ
        $(this).find('span').attr('class', 'glyphicon glyphicon-triangle-top').end().parent().siblings().find('span').attr('class', 'glyphicon glyphicon-triangle-bottom');

        //������
        $('.link-search').find('span').attr('class','glyphicon glyphicon-search');

        //����
        if($(this).hasClass('sort')){
            if($('.popSort').css('display') == 'none'){
                $.ajax({
                    url:'http://127.0.0.1:9090/api/getgsshop',
                    type:'get',
                    success:function(res){
                        var popSort = template('popSort',res);
                        var $popSort=$(popSort)
                            .on('click','li',function(){

                                $('.storeId .jd').html($(this).text());
                                var shopId = $(this).attr('shopId');

                                $('.storeId').attr('shopid', shopId);
                                $.ajax({
                                    url:'http://127.0.0.1:9090/api/getgsproduct',
                                    type:'get',
                                    data:{
                                        shopid:shopId,
                                        areaid:0
                                    },
                                    success:function(res){
                                        // �ڳɹ�֮��ر�������
                                        $('.popSort').css('display', 'none');
                                        $('.storeId span').attr('class', 'glyphicon glyphicon-triangle-bottom');

                                        var storeList = template('listShow',res);
                                        $('.bd ul').html(storeList);
                                    }
                                })
                            })
                        $('.popSort').html($popSort);
                    }
                });
                //��ǰ����������ʾ  ���������������
                $('.popSort').css('display','block').siblings().css('display','none');
                $(this).find('span').attr('class','glyphicon glyphicon-triangle-top');
            }
            else{
                $('.popSort').css('display','none');
                $(this).find('span').attr('class','glyphicon glyphicon-triangle-bottom');
            }
        };

        //����
        if($(this).hasClass('area')){
            if($('.popArea').css('display') == 'none'){
                $.ajax({
                    url:'http://127.0.0.1:9090/api/getgsshoparea',
                    type:'get',
                    success:function(res){
                        var popArea = template('popArea',res);
                        var $popArea = $(popArea)
                            .on('click','li',function(){
                                // �����ʱ���滻����Ӧ���ı���
                                var text = $(this).text().slice(13, 15);
                                $('.area .hb').html(text);
                                $(this).find('span').addClass('active').end().siblings().find('span').removeClass('active');
                                var areaId = $(this).attr('areaId');
                                var shopId = $('.storeId').attr('shopid');
                                $.ajax({
                                    type: 'get',
                                    url: 'http://127.0.0.1:9090/api/getgsproduct',
                                    data: {
                                        shopid: shopId,
                                        areaid: areaId
                                    },
                                    success:function(res){
                                        // �ڳɹ�֮��ر�������
                                        $('.popArea').css('display', 'none');
                                        $('.area span').attr('class', 'glyphicon glyphicon-triangle-bottom');
                                        // ��������Ⱦ��ҳ���ϡ�
                                        var storeList = template('listShow', res);
                                        $('.bd ul').html(storeList);
                                    }
                                })
                            })
                        $('.popArea').html($popArea)
                    }
                })
                $('.popArea').css('display','block').siblings().css('display','none');
                $(this).find('span').attr('class','glyphicon glyphicon-triangle-top');
            }
            else{
                $('.popArea').css('display','none');
                $(this).find('span').attr('class','glyphicon glyphicon-triangle-bottom');
            }
        }

        //ȫ���۸�
        if($(this).hasClass('price')){
            if($('.popPrice').css('display') == 'none'){
                $('.popPrice').css('display','block').siblings().css('display','none');
                $(this).find('span').attr('class','glyphicon glyphicon-triangle-top');
                $('.popPrice').on('click','li',function(){
                    $('.price i').html($(this).find('i').text());
                    $(this).find('span').addClass('active').end().siblings().find('span').removeClass('active');
                    $('.popPrice').css('display','none');
                    $('.filter ul li a').find('span').attr('class','glyphicon glyphicon-triangle-bottom');
                })
            }
            else{
                $('.popPrice').css('display','none');
                $(this).find('span').attr('class','glyphicon glyphicon-triangle-bottom');
            }
        }

        //������
        if($(this).hasClass('link-search')){
            if($('.popSearch').css('display') == 'none'){
                $('.popSearch').css('display','block').siblings().css('display','none');
                $(this).find('span').attr('class','glyphicon glyphicon-search');
            }
            else{
                $('.popSearch').css('display','none');
                $(this).find('span').attr('class','glyphicon glyphicon-search');
            }
        }
    })
})