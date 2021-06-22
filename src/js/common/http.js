
/***
 * 封装http 请求  get post  ajax
 *作者：fengsen    2021-06-09
 *
 */

const BASE_URL = 'http://139.9.177.51:8099'; // 接口请求的 URL


function urlData(obj) {
  // 定义一个字符串
  let str = '';
  // 把obj里面的属性名拿出来放在arr里面
  let arr = Object.keys(obj)
  // 遍历数组进行字符串拼接
  arr.forEach(function (item) {
    str += '&' + item + '=' + obj[item]
  })
  str = str.substr(1);
  // console.log(str);
  return str;
}


const http = {
  get: function (url, data, callback) {
    if (typeof data === 'function') {
      callback = data
    } else {
      url = url + '?' + urlData(data)
    }
    // 实例化 ajax
    let xhr = new XMLHttpRequest();
    // 请求方式 请求地址
    xhr.open('get', BASE_URL + url);
    // 请求监听 并返回数据
    xhr.onreadystatechange = function () {
      // 判断步骤 状态码
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      }
    }
    // 发送请求
    xhr.send();
  },
  post: function (url, data, callback) {
    // 实例化 ajax
    let xhr = new XMLHttpRequest();
    // 请求方式 请求地址
    xhr.open('post', BASE_URL + url);
    // 模拟form
    xhr.setRequestHeader('Content-Type', 'application/json');
    // 请求监听 并返回数据
    xhr.onreadystatechange = function () {
      // 判断步骤 状态码
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      }
    }
    // 发送请求
    xhr.send(JSON.stringify(data));
  },
  ajax: function (da) {
    if (da.type === 'get' || da.type === 'GET') {
      http.get(da.url, da.data, da.success)
    } else if (da.type === 'post' || da.type === 'POST') {
      http.post(da.url, da.data, da.success)
    } else {
      alert('您输入的type值有误！')
    }
  }

}


// 文件上传
function $updateFile(url, fdKey, fdValue, success) {
  const xhr = new XMLHttpRequest();

  const fd = new FormData();
  fd.append(fdKey, fdValue);

  xhr.open('POST', BASE_URL + url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const resData = JSON.parse(xhr.responseText)
      success(resData)
    }
  }
  xhr.send(fd);
}


// window  挂载
window.$http = http;
window.$updateFile = $updateFile
