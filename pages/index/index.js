//index.js
//获取应用实例
const app = getApp()
import Toast from '../../dist/toast/toast';
Page({
  data: {
    username: '',
    password: '',
  },
  //事件处理函数
  nameblur(e) {
    this.setData({
      username: e.detail
    })
  },
  pawdblur(e) {
    this.setData({
      password: e.detail
    })
  },
  btnclick() {
    wx.redirectTo({
      url: '../login/login'
    })

  },
  onLoad() {
    let token = wx.getStorageSync('token');
    let utype = wx.getStorageSync('utype');
    if (token) {
      console.log(utype)
      if (utype == 1) {
        wx.navigateTo({
          url: '../user/logs'
        })
      } else if (utype == 2) {
        wx.redirectTo({
          url: '../financial/financial'
        })
      } else {
        wx.redirectTo({
          url: '../platform/platform'
        })
      }
    }
  }

})