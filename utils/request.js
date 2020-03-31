var app = getApp();
var host = app.globalData.baseUrl;
const router = require("../router.js")


function startLoading() {
  wx.showLoading({
    title: 'Loading...',
    icon: 'none'
  })
}

function endLoading() {
  wx.hideLoading();
}
// 声明一个对象用于存储请求个数
var needLoadingRequestCount = 0;

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
};

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
};


/**
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */
function postRequ(url, postData, doSuccess, doFail) {
  // wx.showNavigationBarLoading();
  showFullScreenLoading();
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8",
      "Admin-Token": wx.getStorageSync('token')
    },
    data: postData,
    method: 'POST',
    success: function(res) {
      //参数值为res.data,直接将返回的数据传入
      doSuccess(res.data);
      if (res.data.code == 9003) {
        wx.removeStorageSync("token");
        wx.redirectTo({
          url: router.default.login,
        })
      }
      tryHideFullScreenLoading();
    },
    fail: function() {
      doFail();
      tryHideFullScreenLoading();
    },
  })
}
//GET请求，不需传参，直接URL调用，
function getRequ(url, doSuccess, doFail) {
  // wx.showNavigationBarLoading();
  showFullScreenLoading();
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8",
      "Admin-Token": wx.getStorageSync('token')
    },
    method: 'GET',
    success: function(res) {
      if (res.data.code == 9003) {
        wx.removeStorageSync("token");
        wx.redirectTo({
          url: router.default.login,
        })
        return
      }
      doSuccess(res.data);
      tryHideFullScreenLoading();
    },
    fail: function() {
      doFail();
      tryHideFullScreenLoading();
    },
  })
}

module.exports.postRequ = postRequ;
module.exports.getRequ = getRequ;