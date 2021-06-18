require('../css/sports.less');

document.ready(function () {
    //创建footer
    utils.addFooter('sports')
    let user = JSON.parse(localStorage.getItem('user'))
    let userid = parseInt(user.userId)
    // 发送请求
    function obj(callback) {
        $http.get('/sports/allcourse', function (res) {
            callback(res)
        })
    }
    let arr1 = obj(function callback(obj) {
        let arr = []
        for (let i = 0; i < obj.data.length; i++) {
            arr.push(obj.data[i])
        }
        // console.log(arr[0].name);
        return arr
    })

    console.log(arr1);

})
