// 导入
require('../css/advertisement.css')

let time = document.querySelector('.time')
let jumpBtn = document.querySelector('.jump')
// let index = 5
// let t = setInterval(() => {
//     index--
//     if (index <= 1) {
//         clearInterval(t)
//     }
//     time.innerHTML = index + 's'
// }, 1000);
// setTimeout(function () {
//     location.href = './index.html'
// }, 5000)
jumpBtn.addEventListener('click', function () {
    location.href = './login.html'
})