require('../css/amend.less')

document.ready(function () {

    function post(url, file) {
        // 实例化 ajax
        let xhr = new XMLHttpRequest();
        // 请求方式 请求地址
        xhr.open('post', url);
        // 模拟form
        xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        // 请求监听 并返回数据
        xhr.onreadystatechange = function () {
            // 判断步骤 状态码
            if (xhr.readyState === 4 && xhr.status === 200) {
                let data = xhr.responseText;
                return data
            }
        }
        // 发送请求
        xhr.send(file);
    }

    post('http://139.9.177.51:8099/users/upload', 'D:/practice/10-源码健身fitness-app项目/源码健身/finess-app/src/img/dog.jpg')




})