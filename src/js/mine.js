require('../css/mine.less');

document.ready(function () {
    // 服务器地址
    let Url = 'http://139.9.177.51:8099'
    //获取dom节点
    let headsDom = document.querySelector('.heads')
    let btn = document.querySelector('.btn')
    let usernameDom = document.querySelector('.nickname')
    let imgDom = document.querySelector('img')
    let userselfDom = document.querySelector('.selfdom')
    let timeDom = document.querySelector('#time')
    let consumeDom = document.querySelector('#consume')
    let fileBtn = document.querySelector('.file-btn')
    let titelDom = document.querySelector('.titel')
    // 创建底部
    utils.addFooter('mine')

    // 退出登录
    btn.addEventListener('click', function (ev) {
        localStorage.clear()
        location.href = './login.html'
    })
    //点击跳转到修改数据
    headsDom.addEventListener('click', function (ev) {
        location.href = './amend.html'
    })
    titelDom.addEventListener('click', function (ev) {
        location.href = './sportsdata.html'
    })

    // 获取用户id
    let user = JSON.parse(localStorage.getItem('user'))
    // 请求用户数据
    function getuserinfo() {
        $http.get('/users/accountinfo?userId=' + user.userId, function (res) {
            if (res.status == 0) {
                if (res.data.nickname) {
                    usernameDom.textContent = res.data.nickname
                }
                if (res.data.imgurl) {
                    imgDom.src = res.data.imgurl
                }
                if (res.data.sign) {
                    userselfDom.textContent = res.data.sign
                }
            }
        })
    }
    getuserinfo()

    // 请求运动数据
    function getsports() {
        $http.get('/users/mysportsBadge?userId=' + user.userId, function (res) {
            if (res.status === 0) {
                if (res.data.sports.times) {
                    timeDom.textContent = res.data.sports.times
                }
                if (res.data.sports.calorie) {
                    consumeDom.textContent = res.data.sports.calorie
                }
            }
        })
    }
    getsports()

    //上传图片 
    function upImgFile() {
        fileBtn.addEventListener('change', function () {
                // console.log(this.files[0]);
            $updateFile('/users/upload', 'imgurl', this.files[0], function (res) {
                if (res.status == 0) {
                    let data = {
                        userId: user.userId,
                        imgurl: Url + res.data
                    }
                    editImg(data)
                }
            })
        })
    }
    upImgFile()
    //点击上传头像
    imgDom.addEventListener('click', function (ev) {
        fileBtn.click();
        ev.stopPropagation();
    })

    // 修改头像
    function editImg(data) {
        $http.post('/users/userEdit', data, function (res) {
            // 重新渲染
            imgDom.src = data.imgurl
            user.imgurl = data.imgurl
            localStorage.setItem('user', JSON.stringify(user))
        })
    }


})
