// pages/financialDetail/financialDetail.js
var app = getApp()
const util = require('../../utils/request.js')
const tool = require('../../utils/util.js')
const router = require("../../router.js")
import Toast from '../../dist/toast/toast';
import Dialog from '../../dist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {},
    fileList: [],
    itemsId: '',
  },
  //接口成功后的函数
  successFormData(res) {
    if (res.code == 200) {
      res.result.time = res.result.ibegintime + "/" + res.result.iendtime;
      res.result.itemsUsers.forEach(item => {
        item.iuMoneyvoucher = app.globalData.uploadUrl + item.iuMoneyvoucher
      })
      this.setData({
        form: res.result
      })
      this.data.form.iuMoneyvoucher = res.result.itemsUsers[0].iuMoneyvoucher
      let obj = [{
        url: app.globalData.uploadUrl + res.result.itemsUsers[0].iuMoneyvoucher,
        name: '暂无图片'
      }]
      this.setData({
        form: this.data.form,
        fileList: obj
      })
    }
  },
  successSaveCount(res) {
    if (res.code == 200) {
      Toast.success('确认打款成功');
      util.getRequ(`items/terrace/getById?itemsId=${this.data.itemsId}`, this.successFormData)
    }
  },
  //确认收款
  saveCount(event) {
    Dialog.confirm({
      message: '确认收款？'
    }).then(() => {
      util.getRequ(`itemsUser/iuToaccount?iuId=${event.currentTarget.dataset['iuid']}`,     this.successSaveCount)
    }).catch(() => {
      // on cancel
    });


  },
  //查看分期
  viewInfo(event) {
    wx.navigateTo({
      url: `${router.default.financialProDeta}?iuId=${event.currentTarget.dataset['iuid']}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      itemsId: options.itemsId
    })
    util.getRequ(`items/terrace/getById?itemsId=${options.itemsId}`, this.successFormData)
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