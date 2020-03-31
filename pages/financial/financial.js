// pages/financial/financial.js
const util = require('../../utils/request.js')
const router = require("../../router.js")
const app = getApp()
import Notify from '../../dist/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    dataList: []
  },
  successData(res) {
    if (res.code == 200) {
      res.result.data.forEach(item => {
        if (item.iitemstate == 1) {
          item.color = '#1989fa'
        } else {
          item.color = '#19be6b'
        }
      })
      this.setData({
        dataList: res.result.data
      })
    }
  },
  detail(event) {
    wx.navigateTo({
      url: `${router.default.financialDetail}?itemsId=${event.currentTarget.dataset['iid']}`
    })
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({
      active: event.detail
    });
    if (event.detail == 2) {
      wx.redirectTo({
        url: router.default.my,
      })
    } else if (event.detail == 1) {
      wx.redirectTo({
        url: router.default.chart,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let obj = {
      iitemname: '',
      page: 1,
      size: 100
    }
    util.postRequ('items/terrace/selectAll', obj, this.successData)
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