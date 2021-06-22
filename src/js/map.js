require('../css/map.less')

document.ready(function () {
    //初始化地图
    var map = new AMap.Map('container', {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 11, //初始地图级别
        center: [106.553263, 29.558692], //初始地图中心点
    });

    //显示地图层级与中心点信息
    function logMapinfo() {
        var zoom = map.getZoom(); //获取当前地图级别
        var center = map.getCenter(); //获取当前地图中心位置

        document.querySelector("#map-zoom").innerText = zoom;
        document.querySelector("#map-center").innerText = center.toString();
    };

    // //绑定地图移动与缩放事件
    // map.on('moveend', logMapinfo);
    // map.on('zoomend', logMapinfo);
})