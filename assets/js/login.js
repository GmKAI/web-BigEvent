$(function () {
    $('.link_reg').on('click', function () {
        // console.log('aaa')
        $('#login-box').hide();
        $('#reg-box').show();
    })

    $('.link_login').on('click', function () {
        $('#reg-box').hide();
        $('#login-box').show();
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        // console.log('aa');
        var data = $(this).serialize();
        // var username = $('#username').val()
        // var password = $('#password').val()
        $.ajax({
            type: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: data,
            success: function (res) {
                console.log(res)
            }
        });
    });
});