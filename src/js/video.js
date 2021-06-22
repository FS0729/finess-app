require('../css/video.less')


document.ready(function () {
    // 服务器地址
    let baseUrl = 'http://139.9.177.51:8099'
    // 获取节点
    let videoDom = document.querySelector('video')
    let msgDom = document.querySelector('.msg')
    let currentDom = document.querySelector('.current')
    let allDom = document.querySelector('.all')
    let titleDom = document.querySelector('.title')
    let imgDom = document.querySelector('#img')
    let curDom = document.querySelector('.cur')
    let curColorDom = document.querySelector('.cur-color')

    let stopBtn = document.querySelector('#stop')
    let startBtn = document.querySelector('.start')
    let proBtn = document.querySelector('#pro');
    let nextBtn = document.querySelector('#next')
    let endBtn = document.querySelector('.end')


    let videoList = JSON.parse(localStorage.getItem('videoList'))
    console.log(videoList);

    let index = 0
    function play(index) {
        videoDom.src = baseUrl + videoList[index].videoUrl
        titleDom.textContent = videoList[index].title
        allDom.textContent = videoList.length
        currentDom.textContent = index + 1
        imgDom.src = baseUrl + videoList[index].imgUrl
        curDom.textContent = videoList[index].title
    }
    play(index)
    // 点击切换下一个
    nextBtn.addEventListener('click', function (ev) {
        if (index < videoList.length - 1) {
            index++;
            play(index);
        }
    })

    // 点击切换上一个
    proBtn.addEventListener('click', function (ev) {
        if (index != 0) {
            index--;
            play(index);
        }
    })

    // 暂停视频+显示蒙层

    stopBtn.addEventListener('click', function (ev) {
        videoDom.pause()
        msgDom.style.display = 'block';
    })

    //继续播放+隐藏蒙层 
    startBtn.addEventListener('click', function (ev) {
        videoDom.play()
        msgDom.style.display = 'none';
    })


    //跳转到课程列表页
    endBtn.addEventListener('click', function (ev) {
        location.href = './sports.html'
    })

    //进度条
    setInterval(function () {
        let width = (videoDom.currentTime / videoDom.duration) * 100
        width = width;
        curColorDom.style.width = width + '%';
    }, 60)

    videoDom.addEventListener('ended', function () {
        if (index < videoList.length - 1) {
            index++;
            play(index);
        }
    })










})