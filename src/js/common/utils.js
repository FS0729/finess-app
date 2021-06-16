/**
 * 工具函数
 */

const utils = {}

utils.toast = function (status, text, timer) {
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

window.utils = utils