$(function () {
    // 调用form方法
    var form = layui.form
    var layer = layui.layer
    // 自定义时的验证规则直接返回文字提示  不用添加layer.msg
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须为6-12位，不能为空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    });

    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        $('.layui-form')[0].reset()
    });

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败')
                }
                layer.msg('更新成功')
                $('.layui-form')[0].reset()
            }
        })
    });
});