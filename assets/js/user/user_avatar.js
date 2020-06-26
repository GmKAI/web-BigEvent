$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    var layer = layui.layer
    $('#update').on('click', function () {
        $('#files').click()
    })

    $('#files').on('change', function (e) {
        console.log(e.target)
        var files = e.target.files
        if (files.length === 0) {
            return layer.msg('请选择照片')
        }
        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
        // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    $('#define').on('click', function () {
        var dataURL = $image.cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        }).toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // console.log(dataURL)
        $.ajax({
            type: 'POST',
            url: '/my/update/avatar',
            data: { avatar: dataURL },
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg('更新头像失败！')
                }
                window.parent.getUserInfo();
                layer.msg('更新成功！')
            }
        })
    })
})