// pages/financialProDeta/financialProDeta.js
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
    list: [],
    show: false,
    fileList: [],
    irId: '',
    iuId: '',
    irPaymentvoucher: ''
  },
  successGetData(res) {
    if (res.code == 200) {
      this.setData({
        list: res.result
      })
    }
  },
  successRemit(res) {
    if (res.code == 200) {
      Toast.success("打款成功")
      util.getRequ(`itemsRate/getListByid?iriuId=${this.data.iuId}`, this.successGetData)
    }
  },
  remit(event) {
    console.log(event.currentTarget)
    this.setData({
      show: true,
      irId: event.currentTarget.dataset['irid']
    })
  },
  getUserInfo() {
    let obj = {
      irId: this.data.irId,
      irPaymentvoucher: this.data.irPaymentvoucher
    }
    util.postRequ(`itemsRate/remit`, obj, this.successRemit)
  },

  onClose() {
    this.setData({
      show: false
    });
  },
  afterRead(event) {
    var that = this
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: `${app.globalData.baseUrl}/sys/file/upload`,
      filePath: file.path,
      name: 'file',
      header: {
        enctype: "multipart/form-data",
        "Admin-Token": wx.getStorageSync('token')
      },
      success(res) {
        // 上传完成需要更新 fileList
        let fileList = []
        fileList.push({
          ...file,
          url: app.globalData.uploadUrl + JSON.parse(res.data).result
        });
        that.setData({
          fileList,
          irPaymentvoucher: JSON.parse(res.data).result
        });
      }
    });
  },
  deleteImg() {
    this.setData({
      fileList: [],
      irPaymentvoucher: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      iuId: options.iuId
    })
    util.getRequ(`itemsRate/getListByid?iriuId=${options.iuId}`, this.successGetData)
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