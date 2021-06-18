/**
 * 工具函数
 */

const utils = {}
/***
 * @toast 创建提示模块
 */
utils.toast = function (status, text, timer = 1) {
    let toast = document.createElement('div')
    toast.className = 'toast'
    let html = `
            <div class="icon">
                ${status ? '√' : '!'}
            </div>
            <div class="toast-text">
                ${text}
            </div>
            `
    toast.innerHTML = html
    document.querySelector('body').appendChild(toast)
    setTimeout(function () {
        toast.remove()
    }, timer * 1000)

}

// @addFooter 创建底部导航
utils.addFooter = function (page) {
    let footer = document.createElement('div')
    footer.className = 'footer dpflex'
    let html = `
    <a href='./index.html'>
        <div class="${page === 'index' ? 'icon-text active' : 'icon-text'}">
        <i class="iconfont iconhome"></i>
        <p>首页</p>
    </div></a>
   
    <a href='./sports.html'>
        <div class="${page === 'sports' ? 'icon-text active' : 'icon-text'}">
        <i class="iconfont iconcircle"></i>
        <p>运动</p>
    </div></a>
    
    <a href='./mine.html'>
        <div class="${page === 'mine' ? 'icon-text active' : 'icon-text'}">
            <i class="iconfont iconmine"></i>
            <p>我的</p>
        </div>
    </a>
    
    `
    footer.innerHTML = html
    document.querySelector('body').appendChild(footer)
}


window.utils = utils