require('../css/mine.less');

document.ready(function () {
    //获取dom节点
    let btn = document.querySelector('.btn')
    let timeDom = document.querySelector('#time')
    let consumeDom = document.querySelector('#consume')

    // 创建footer
    utils.addFooter('mine')

    // 退出登录
    btn.addEventListener('click', function (ev) {
        localStorage.clear()
        location.href = './login.html'
    })
    let user = JSON.parse(localStorage.getItem('user'))
    //点击跳转修改信息页面
    $http.get('/users/mysportsBadge?userId=' + user.userId, function (res) {
        if (res.status === 0) {
            timeDom.textContent = res.data.sports.times
            consumeDom.textContent = res.data.sports.calorie
        }
    })
})
