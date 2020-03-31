// pages/projectDetail/projectDetail.js
const serves = require('../../utils/request.js')
const router = require("../../router.js")
const app = getApp()
import Toast from '../../dist/toast/toast';
import Dialog from '../../dist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid: '',
    form: {},
    type: 'start'

  },
  successData(res) {
    if (res.code == 200) {
      this.setData({
        form: res.result
      })
    }
  },
  start() {
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear',
    });
    animation.height(320).step()
    this.setData({
      ani: animation.export(),
      type: 'end'
    })
  },
  end() {
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear',
    });
    animation.height(0).step()
    this.setData({
      ani: animation.export(),
      type: 'start'
    })
  },
  successSave(res) {
    if (res.code == 200) {
      Toast.success('发布成功');
      wx.redirectTo({
        url: router.default.platform
      })
    }
  },
  getDetail() {
    serves.getRequ(`items/terrace/getById?itemsId=${this.data.iid}`, this.successData)
  },
  save(event) {
    Dialog.confirm({
      message: '确认发布?'
    }).then(() => {
      let itemsId = event.currentTarget.dataset['itemsid']
      serves.getRequ(`items/terrace/isState?itemsId=${itemsId}&confirmSend=1`, this.successSave)
    }).catch(() => {
      // on cancel
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      iid: options.itemsId
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
    this.getDetail()
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