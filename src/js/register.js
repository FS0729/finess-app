// 导入css
require('../css/register.less')

document.ready(function () {
    let msgText = ''
    // 验证码
    let captcha = new CaptchaMini();
    captcha.draw(document.querySelector('#captcha'), function (res) {
        msgText = res
    });
    // 获取dom
    let btnDom = document.querySelector('.btn')
    let telInp = document.querySelector('.tel')
    let pwdInp = document.querySelector('.pwd')
    let pwd2Inp = document.querySelector('.pwd2')
    let yzmInp = document.querySelector('.yzm1')
    let btnDom1 = document.querySelector('.btn1')
    // 点击跳转
    btnDom1.addEventListener('click', function (ev) {
        location.href = './login.html'
    })
    // 正则验证
    telInp.addEventListener('blur', function () {
        let telInpVal = telInp.value;
        if (telInpVal) {
            //  手机号码：**^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$**
            let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
            if (!reg.test(telInpVal)) {
                utils.toast(0, '手机号格式错误', 1.5)
            }
        } else {
            utils.toast(0, '请填写手机号', 1.5)
        }
    })
    yzmInp.addEventListener('blur', function () {
        let yzmInpVal = yzmInp.value
        if (yzmInpVal) {
            if (yzmInpVal.toLowerCase() != msgText.toLowerCase()) {
                utils.toast(0, '验证码错误', 1.5)
            }
        } else {
            utils.toast(0, '请填写验证码', 1.5)
        }
    })
    pwdInp.addEventListener('blur', function () {
        let pwdInpVal = pwdInp.value;
        if (pwdInpVal) {
            //密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：**^[a-zA-Z]\w{5,17}$
            let reg = /^[a-zA-Z]\w{5,17}$/
            if (!reg.test(pwdInpVal)) {
                utils.toast(0, '密码格式错误', 1.5)
            }
        } else {
            utils.toast(0, '密码不能为空', 1.5)
        }
    })
    pwd2Inp.addEventListener('blur', function () {
        let pwd2InpVal = pwd2Inp.value
        if (pwd2InpVal) {
            if (pwd2InpVal != pwdInp.value) {
                utils.toast(0, '两次密码不一致', 1.5)
            }
        } else {
            utils.toast(0, '确认密码不能为空', 1.5)
        }
    })

    btnDom.addEventListener('click', function () {
        if (telInp.value == '') {
            utils.toast(0, '请填写手机号', 1.5)
            return
        }
        if (yzmInp.value == '') {
            utils.toast(0, '请填写验证码', 1.5)
            return
        }
        if (pwdInp.value == '') {
            utils.toast(0, '请填写密码', 1.5)
            return
        }
        if (pwd2Inp.value == '') {
            utils.toast(0, '请填写确认密码', 1.5)
            return
        }
        // 请求并跳转页面
        if (telInp.value != '' && yzmInp.value != '' && pwdInp.value != '' && pwd2Inp.value != '') {
            let data = {
                account: telInp.value,
                password: pwdInp.value
            }
            // ajax请求
            $http.post('/users/add', data, function (res) {
                if (res.msg != 'OK') {
                    utils.toast(0, '该用户已被注册', 1.5)
                } else {
                    utils.toast(1, '注册成功', 1)
                    setTimeout(function () {
                        location.href = './index.html'
                    }, 1000)
                }

            })
        }
    })

})