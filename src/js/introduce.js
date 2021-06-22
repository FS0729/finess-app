const { time } = require('echarts')

require('../css/introduce.less')


document.ready(function () {
    // 服务器地址
    let baseUrl = 'http://139.9.177.51:8099'
    // 获取节点
    let iconfont = document.querySelector('.iconfont')
    let imgDom = document.querySelector('img')
    let titleDom = document.querySelector('#title')
    let descDom = document.querySelector('#desc')
    let startDom = document.querySelector('.start')
    let peopleDom = document.querySelector('.people')
    let calorieDom = document.querySelector('#calorie')
    let timeDom = document.querySelector('#time-text')
    let instrumentDom = document.querySelector('#instrument')

    iconfont.addEventListener('click', function (ev) {
        location.href = './sports.html'
    })

    let data1 = '';
    function getSportsInfo() {
        let str = location.search
        let str1 = str.substr(1)
        let arr = str1.split('=')
        let id = arr[1]
        $http.get('/sports/courseDetail?id=' + id, function (res) {
            let data = res.data;
            data1 = data;
            console.log(data)
            imgDom.src = baseUrl + data.imgurl
            titleDom.textContent = data.name
            descDom.textContent = data.desc
            peopleDom.textContent = data.peoplenum
            calorieDom.textContent = data.calorie
            timeDom.textContent = data.time
            instrumentDom.textContent = data.instrument
        })

    }
    getSportsInfo()


    startDom.addEventListener('click', function (ev) {
        console.log(data1);
        localStorage.setItem('videoList', JSON.stringify(data1.fragments))
        //跳转页面
        location.href = './video.html'
    })























})