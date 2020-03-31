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
    type:''
  },

  projectDet(event) {
    let utype = wx.getStorageSync('utype');
    if (utype == 0) {
      wx.navigateTo({
        url: `${router.default.projectDetail}?itemsId=${event.currentTarget.dataset['iid']}`
      })
    } else if (utype == 2) {
      wx.navigateTo({
        url: `${router.default.financialDetail}?itemsId=${event.currentTarget.dataset['iid']}`
      })
    } else {
      url: `${router.default.userDetail}?iriuId=${event.currentTarget.dataset['iuid']}&itemsId=${event.currentTarget.dataset['iid']}`
    }

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
    serves.getRequ('items/terrace/selectFuzzyOfYear?years=' + options.years, this.successData)
    this.setData({
      type: wx.getStorageSync('utype')
    })
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