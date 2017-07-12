$(function () {
    $.get("http://127.0.0.1:9090/api/getmoneyctrl", function (data) {
        var haitaozhekou = template('ht', data);

        $('.neirong-ul').html(haitaozhekou);

        var num = Math.ceil(data.totalCount / data.pagesize);

        var str = '';
        for (var i = 1; i <= num; i++) {
            str += '<option>' +
                +i+
                '/'+
                +num +
                '</option>'
        }
        $(".btn-xiala").html(str);
        var index = 0;
        $(".btn-down").on("click", function () {
        
            index++;
            if (index>14) {
                index=14;
            }
                console.log(index);
            $.get('http://127.0.0.1:9090/api/getmoneyctrl', {
                pageid: index
            }, function (res) {
                var ht = template("ht",res);
                $('.neirong-ul').html(ht);
            })
        })
        $(".btn-up").on("click",function(){
            index--;
            i = index;
            console.log(index);
            if (index<1) {
                index=1;
            }
            $.get('http://127.0.0.1:9090/api/getmoneyctrl', {
                pageid: index
            }, function (res) {
                var ht = template("ht",res);
                $('.neirong-ul').html(ht);
            })
        })
    })
})