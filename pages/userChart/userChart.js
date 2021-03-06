// pages/chart/chart.js
const router = require("../../router.js")
const serves = require("../../utils/request.js")
const utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    endTime: '2020',
    beginTime: '2020'
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    if (event.detail == 0 && wx.getStorageSync('utype') == 0) {
      wx.redirectTo({
        url: router.default.platform,
      })
    } else if (event.detail == 0 && wx.getStorageSync('utype') == 1) {
      wx.redirectTo({
        url: router.default.list,
      })
    } else if (event.detail == 0 && wx.getStorageSync('utype') == 2) {
      wx.redirectTo({
        url: router.default.financialPage,
      })
    } else if (event.detail == 1 && wx.getStorageSync('utype') == 0) {
      wx.redirectTo({
        url: router.default.newProject,
      })
    } else if (event.detail == 3 || (event.detail == 2 && wx.getStorageSync('utype') != 0)) {
      wx.redirectTo({
        url: router.default.my,
      })
    }
    this.setData({
      active: event.detail
    });
  },
  btnclick() {
    wx.redirectTo({
      url: `${router.default.chart}`
    })
  },
  projectDet(event) {
    wx.navigateTo({
      url: `${router.default.userChartDetail}?userId=${event.currentTarget.dataset['uid']}`
    })
  },
  successData(res) {
    if (res.code == 200) {
      this.setData({
        list: res.result
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    if (wx.getStorageSync('utype') == 0) {
      this.setData({
        active: 2
      })
    } else {
      this.setData({
        active: 1
      })
    }
    this.setData({
      endTime: new Date().getFullYear() + ''
    })
    serves.getRequ(`items/user/statistics?beginTime=${this.data.beginTime}&endTime=${this.data.endTime}&userName=`, this.successData)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})