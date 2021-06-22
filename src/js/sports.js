require('../css/sports.less');

document.ready(function () {
    // 服务器地址
    let baseUrl = 'http://139.9.177.51:8099'
    // 获取节点
    let newDom = document.querySelector('.new')
    let listDom = document.querySelector('.list')
    //创建footer
    utils.addFooter('sports')
    // 发送请求
    function courseList() {
        $http.get('/sports/allcourse', function (res) {
            let data = res.data;
            // 筛选出最新课程
            let newCourse = data.find(function (item) {
                return item.latest == 1
            })
            console.log(newCourse);
            // 渲染到页面
            let newHtml = `
            <a href="./introduce.html?id=${newCourse.courseId}">
                <div class="img">
                    <img src="${baseUrl + newCourse.imgurl}" alt="">
                </div>
                <div class="text pdl15">
                    <p class="fs18 ">${newCourse.name}</p>
                    <span class="fs12 color9a">${newCourse.desc}</span>
                </div>
            </a>
               `
            newDom.innerHTML = newHtml;
            // 课程列表渲染
            let listHtml = ''
            data.forEach(function (item) {
                listHtml += `
                <a href="./introduce.html?id=${item.courseId}">
                    <div class="box-course mb15">
                        <img src="${baseUrl + item.imgurl}" alt="">
                        <div>
                            <p class="fs20 mt40">${item.name}</p>
                            <p class="fs12 mt15">${item.desc}</p>
                        </div>
                    </div>
                </a>
                `
            })
            listDom.innerHTML = listHtml;
        })
    }
    courseList()



})
