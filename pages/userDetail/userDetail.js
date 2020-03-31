// pages/userDetail/userDetail.js
var app = getApp()
const util = require('../../utils/request.js')
const tool = require('../../utils/util.js')
const router = require("../../router.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iriuId: '',
    form: {},
    list: [],
    isImage: false,
    fileList: [{
      url: '',
      name: '图片1'
    }],
    fileList1: [

    ]
  },
  successData(res) {
    if (res.code == 200) {
      res.result.forEach(item => {
        item.irPaymentvoucher = app.globalData.uploadUrl + item.irPaymentvoucher
      })
      this.setData({
        list: res.result
      })
      console.log(this.data.list)
    }
  },
  afterRead(event) {
    var that = this
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: `${app.globalData.baseUrl}/sys/file/upload`, // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      header: {
        enctype: "multipart/form-data",
        "Admin-Token": wx.getStorageSync('token')
      },
      success(res) {
        // 上传完成需要更新 fileList
        let fileList1 = []
        fileList1.push({ ...file,
          url: app.globalData.uploadUrl + JSON.parse(res.data).result
        });
        that.setData({
          fileList1
        });
        var obj = {
          iuId: that.data.form.itemsUsers[0].iuId,
          iuMoneyvoucher: JSON.parse(res.data).result
        }
        util.postRequ(
          'itemsUser/join/joinItems',
          obj,
          that.joinSuccess
        )
      }
    });
  },
  deletaImg(event) {
    this.setData({
      fileList1: []
    })

  },
  joinSuccess(res) {
    if (res.code == 200) {
      wx.redirectTo({
        url: router.default.list,
      })
    }
  },
  successFormData(res) {
    if (res.code == 200) {
      this.setData({
        form: res.result
      })
      this.data.form.iuMoneyvoucher = res.result.itemsUsers[0].iuMoneyvoucher
      this.setData({
        form: this.data.form
      })

      let obj = [{
        url: app.globalData.uploadUrl + res.result.itemsUsers[0].iuMoneyvoucher,
        name: '暂无图片'
      }]
      this.setData({
        fileList: obj,
        isImage: true
      })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    util.getRequ(`itemsRate/getListByid?iriuId=${option.iriuId}`, this.successData)
    util.getRequ(`items/terrace/getById?itemsId=${option.itemsId}`, this.successFormData)
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