// 导入css
require('../css/index.less')
require('../lib/swiper/swiper-bundle.css')

document.ready(function () {
    // 获取dom节点
    let rankDom = document.querySelector('#rank')
    let isPunchDom = document.querySelector('#isPunch')
    let punchInDom = document.querySelector('#punchIn')
    let insigniaNumDom = document.querySelector('#insigniaNum')

    let user = JSON.parse(localStorage.getItem('user'))
    // 创建底部导航
    utils.addFooter('index')
    // 轮播图
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay: {
            delay: 2000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
        },
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    })

    // 登录成功，请求ajax渲染页面

    function userInfo() {
        $http.get('/headPageInfo?userId=' + user.userId, function (res) {
            // 判断status的值
            if (res.status === 0) {
                rankDom.textContent = res.data.rank
                punchInDom.textContent = res.data.punchIn
                insigniaNumDom.textContent = res.data.insigniaNum
            }
        })
    }
    userInfo();
    // 点击打卡
    isPunchDom.addEventListener('click', function (ev) {
        $http.get('/clockIn?userId=' + user.userId, function (res) {
            if (res.status === 0) {
                isPunchDom.style.display = 'none'
                utils.toast(1, '打卡成功')
                userInfo();
            } else {
                utils.toast(0, res.msg)
                isPunchDom.style.display = 'block'
            }
        })
    })

})