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
    if (this.data.username == '') {
      Toast.fail('请输入账号');
      return
    }
    if (this.data.password == '') {
      Toast.fail('请输入密码');
      return
    }
    wx.request({
      url: `${app.globalData.baseUrl}user/login`,
      method: 'POST',
      header: {
        'content-type': 'multipart/form-data; boundary=XXX'
      },
      data: '\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="username"' +
        '\r\n' +
        '\r\n' + this.data.username +
        '\r\n--XXX' +
        '\r\nContent-Disposition: form-data; name="password"' +
        '\r\n' +
        '\r\n' + this.data.password +
        '\r\n--XXX--',
      success(res) {
        if (res.data.code == 200) {
          wx.setStorageSync('token', res.data.result.adminToken);
          wx.setStorageSync('userBank', res.data.result.userBank);
          wx.setStorageSync('utype', res.data.result.user.utype);
          if (res.data.result.user.utype == 1) {
            wx.redirectTo({
              url: '../user/logs'
            })
          } else if (res.data.result.user.utype == 2) {
            wx.redirectTo({
              url: '../financial/financial'
            })
          } else {
            wx.redirectTo({
              url: '../platform/platform'
            })
          }
        } else {
          Toast.fail(res.data.message);
        }
      },
      fail(res) {
        Toast.fail(res);
      }
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