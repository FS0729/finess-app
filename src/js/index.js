// 导入css
require('../css/index.less')
require('../lib/swiper/swiper-bundle.css')
const Swiper = require('../lib/swiper/swiper-bundle')
document.ready(function () {
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项

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

})