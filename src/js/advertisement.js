// 导入
require('../css/advertisement.less')

document.ready(function () {
    // 倒计时+跳转

    let time = document.querySelector('.time span')
    let jumpBtn = document.querySelector('.jump')
    let t = setInterval(() => {
        if (parseInt(time.textContent - 1) === 0) {
            clearInterval(t)
            location.href = './login.html'
        } else {
            let num = parseInt(time.textContent) - 1
            time.textContent = num
        }
    }, 1000);

    // 点击跳转
    jumpBtn.addEventListener('click', function (ev) {
        location.href = './login.html'
    })



































})