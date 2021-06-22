require('../css/sportsdata.less')

var echarts = require('echarts')

document.ready(function () {
    // 获取节点
    let timeDom = document.querySelector('#time')
    let calorieDom = document.querySelector('#calorie')
    let imgDom = document.querySelector('img')

    let iconfontBtn = document.querySelector('.iconfont')

    iconfontBtn.addEventListener('click', function (ev) {
        location.href = './mine.html'
    })

    let user = JSON.parse(localStorage.getItem('user'))
    function heads() {
        imgDom.src = user.imgurl
    }
    heads()
    // 运动数据

    function sportsTime() {
        $http.get('/users/mysportsBadge?userId=' + user.userId, function (res) {
            let data = res.data.sports
            timeDom.textContent = data.times
            calorieDom.textContent = data.calorie
        })
    }
    sportsTime()
    // 模拟数据
    let data = [
        {
            date: '6-21',
            time: '500'
        },
        {
            date: '6-21',
            time: '150'
        },
        {
            date: '6-21',
            time: '300'
        },
        {
            date: '6-21',
            time: '450'
        },
        {
            date: '6-21',
            time: '800'
        },
        {
            date: '6-21',
            time: '200'
        },
        {
            date: '6-21',
            time: '600'
        }
    ]
    let arr = []
    let dateArr = []
    data.forEach(function (item) {
        arr.push(item.date);
        dateArr.push(item.time);
    })
    function zu() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '近7天运动时长'
            },
            tooltip: {},
            legend: {
                data: ['运动量']
            },
            xAxis: {
                data: arr
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: dateArr
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    zu();
    function yuan() {
        var chartDom = document.getElementById('main1');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            title: {
                text: '运动分类',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 1048, name: '跑步' },
                        { value: 735, name: '骑行' },
                        { value: 580, name: '训练' },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        option && myChart.setOption(option);
    }
    yuan()

    function heng() {
        var chartDom = document.getElementById('main2');
        var myChart = echarts.init(chartDom);
        var option;
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // Use axis to trigger tooltip
                    type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
                }
            },
            legend: {
                data: ['Direct', 'Mail Ad', 'Affiliate Ad', 'Video Ad', 'Search Engine']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: arr
            },
            series: [
                {
                    name: '骑行',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [320, 302, 301, 334, 390, 330, 320]
                },
                {
                    name: '跑步',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '训练',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                }
            ]
        };

        option && myChart.setOption(option);


    }
    heng()

    function ze() {
        var chartDom = document.getElementById('main3');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            xAxis: {
                type: 'category',
                data: arr
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: dateArr,
                type: 'line'
            }]
        };

        option && myChart.setOption(option);

    }
    ze()
})