$(function () {
    $('.text-login').on('click', function () {
        $('#reg-box').hide();
        $('#login-box').show();
    })
    $('.text-reg').on('click', function () {

        $('#reg-box').show();
        $('#login-box').hide();
    })

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位'],
        rep: function (value) {
            var rep = $('#reg-box [name=repassword]').val()
            if (rep !== value) {
                return ('两次密码不一致')
            }
        }
    })
    //------------------ 监听注册页面 ------------------
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        }
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功');
                $('.text-login').click()
            }
        })
    })


    // ------------------ 监听登录页面 -------------------
    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: data,
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    layer.msg('登陆失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})