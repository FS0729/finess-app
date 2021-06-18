// 导入css
require('../css/login.less')

document.ready(function () {
    // 获取dom
    let telDom = document.querySelector('.tel')
    let pwdDom = document.querySelector('.pwd')
    let btnInp = document.querySelector('.btn')
    let regbtn = document.querySelector('.reg')
    regbtn.addEventListener('click', function (ev) {
        location.href = './register.html'
    })


    //点击跳转
    btnInp.addEventListener('click', function (ev) {
        if (telDom.value == '') {
            utils.toast(0, '请输入用户名', 1)
        }
        if (pwdDom.value == '') {
            utils.toast(0, '请输入密码', 1)
        }
        // 发送请求+页面跳转
        let data = {
            account: telDom.value,
            password: pwdDom.value
        }
        $http.post('/users/login', data, function (res) {
            if (telDom.value != '' && pwdDom.value != '') {
                utils.toast(1, '登录成功', 1)
                setTimeout(function (ev) {
                    location.href = './index.html'
                }, 1500)
                localStorage.setItem('user', JSON.stringify(res.data.user))
            }
        })
    })

})