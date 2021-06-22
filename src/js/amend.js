require('../css/amend.less')

document.ready(function () {
    let iconDom = document.querySelector('.iconfont')
    let sexDom = document.querySelector('#sex')
    let sexTextDom = document.querySelector('#sex-text')
    let birthdayDom = document.querySelector('#birthday')
    let birthdayTextDom = document.querySelector('#birthday-text')
    let provinceDom = document.querySelector('#province')
    let provinceTextDom = document.querySelector('#province-text')
    let cityDom = document.querySelector('#city')
    let cityTextDom = document.querySelector('#city-text')
    let saveDom = document.querySelector('.save')
    let textareaDom = document.querySelector('textarea')
    let nameDom = document.querySelector('.name')

    let user = JSON.parse(localStorage.getItem('user'))

    let data = {
        pro: '',
        nickname: '',
        gender: '',
        birthday: '',
        address: '',
        sign: '',
        userId: '',
        city: ''
    }

    // 发送请求渲染个人信息
    function person() {
        $http.get('/users/accountinfo?userId=' + user.userId, function (res) {
            let obj = res.data;
            nameDom.value = obj.nickname
            data.nickname = obj.nickname
            if (obj.gender) {
                sexTextDom.textContent = obj.gender
                data.gender = obj.gender
            }
            if (obj.birthday) {
                birthdayTextDom.textContent = obj.birthday.substr(0, 10)
                data.birthday = obj.birthday.substr(0, 10)
            }
            if (obj.address) {
                provinceTextDom.textContent = obj.address.split(',')[0]
                cityTextDom.textContent = obj.address.split(',')[1]
                data.address = obj.address.split(',')
            }
            if (obj.sign) {
                textareaDom.value = obj.sign
                data.sign = obj.sign
            }
        })
    }
    person()

    iconDom.addEventListener('click', function () {
        location.href = './mine.html'
    })

    // 性别选择
    sexDom.addEventListener('click', function () {
        weui.picker([{
            label: '男',
            value: 0
        }, {
            label: '女',
            value: 1
        }], {
            onConfirm: function (result) {
                sexTextDom.textContent = result[0].label
                data.gender = result[0].label
            },
            title: '性别选择器'
        });
    });
    // 生日选择
    birthdayDom.addEventListener('click', function () {
        weui.datePicker({
            start: 1920,
            end: new Date().getFullYear(),
            onConfirm: function (result) {
                result[1].value = result[1].value < 10 ? '0' + result[1].value : result[1].value;
                result[2].value = result[2].value < 10 ? '0' + result[2].value : result[2].value;
                birthdayTextDom.textContent = result[0].value + '-' + result[1].value + '-' + result[2].value;
                data.birthday = birthdayTextDom.textContent
            },
            title: '日期选择器'
        });
    });

    // 省份选择
    provinceDom.addEventListener('click', function (ev) {
        $http.get('/address/province', function (res) {
            // 数据拿出来把里面的键名替换为weui组件里面的键名
            let arr = res.data.map(function (item) {
                return {
                    label: item.name,
                    value: item.addressId
                }
            })
            // 清除data里面的省份
            data.pro = ''
            // 恢复页面上城市的初始值
            cityTextDom.textContent = '请选择'
            weui.picker(arr, {
                onConfirm: function (result) {
                    provinceTextDom.textContent = result[0].label
                    data.pro = result[0]
                },
                title: '省份选择'
            });

        })
    })

    // 城市选择
    cityDom.addEventListener('click', function (ev) {
        // 判断有没有选择省份
        if (data.pro == '') {
            utils.toast(0, '请选择省份')
            // 结束
            return
        }
        // 发送请求
        $http.get('/address/city/' + data.pro.value, function (res) {
            // 数据拿出来把里面的键名替换为weui组件里面的键名
            let arr = res.data.map(function (item) {
                return {
                    label: item.name,
                    value: item.addressId
                }
            })
            weui.picker(arr, {
                onConfirm: function (result) {
                    cityTextDom.textContent = result[0].label
                    data.city = result[0]
                },
                title: '城市选择'
            });

        })
    })

    // 保存信息

    saveDom.addEventListener('click', function (ev) {
        data.nickname = nameDom.value
        data.sign = textareaDom.value
        data.userId = user.userId
        if (data.pro.label && data.city.label) {
            data.address = [data.pro.label, data.city.label]
        }
        $http.post('/users/userEdit', data, function (res) {
            console.log(res);
        })
    })




























})