// pages/my/my.js
const router = require("../../router.js")
const serves = require("../../utils/request.js")
const utils = require("../../utils/util.js")
import Toast from '../../dist/toast/toast';
import Dialog from '../../dist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 3,
    form: {
      idCard: '',
      udBank: '',
      udBankPayee: '',
      udBankNumber: '',

    },
    utype: '',
    userInfo: {},
    editState: false
  },
  btnclick() {
    this.setData({
      editState: true
    })
  },
  logout() {
    Dialog.confirm({
      message: '确认注销？'
    }).then(() => {
      wx.removeStorageSync('token')
      wx.reLaunch({
        url: router.default.index,
      })
    }).catch(() => {
      // on cancel
    });

  },
  saveSuccess(res) {
    if (res.code == 200) {
      Toast.success('保存成功');
      this.setData({
        editState: false
      })
      serves.getRequ("userBank/getMyBank", this.getData);
      serves.getRequ("user/getLoginUserInfo", this.getUserData)
    }
  },
  save() {
    let obj = { ...this.data.form,
      ...this.data.userInfo
    }
    if (obj.uname == "") {
      Toast.fail('请输入用户名');
      return;
    } else if (!/^1[34578]\d{9}$/.test(obj.uphone)) {
      Toast.fail('手机号码格式错误');
      return;
    } else if (obj.uphone == "") {
      Toast.fail('请输入手机号码');
      return;
    } else if (obj.idCard == "") {
      Toast.fail('请输入身份证');
      return;
    } else if (obj.uaddress == "") {
      Toast.fail('请输入地址');
      return;
    } else if (obj.udName == "") {
      Toast.fail('请输入开户人');
      return;
    } else if (obj.udBank == "") {
      Toast.fail('请输入开户行');
      return;
    } else if (obj.udBankPayee == "") {
      Toast.fail('请输入开户分行');
      return;
    } else if (obj.udBankNumber == "") {
      Toast.fail('请输入开户账号');
      return;
    } else if (obj.idCard.length == 18) {
      if (!utils.isTrueValidateCodeBy18IdCard(obj.idCard)) {
        Toast.fail('身份证格式错误');
        return;
      }
    } else if (obj.idCard.length != 18) {
      Toast.fail('身份证格式错误');
      return
    }
    serves.postRequ("user/updateDetail", obj, this.saveSuccess)
  },
  cancel() {
    this.setData({
      editState: false
    })
    serves.getRequ("userBank/getMyBank", this.getData);
    serves.getRequ("user/getLoginUserInfo", this.getUserData)
  },
  inputWacth(e) {
    let model = e.currentTarget.dataset.model;
    let item = e.currentTarget.dataset.item;
    this.data[model][item] = e.detail
    this.setData({
      [model]: this.data[model]
    })
  },

  onChange(event) {
    // event.detail 的值为当前选中项的索引
    if (event.detail == 0 && wx.getStorageSync('utype') == 1) {
      wx.redirectTo({
        url: router.default.list,
      })
    } else if (event.detail == 0 && wx.getStorageSync('utype') == 2) {
      wx.redirectTo({
        url: router.default.financialPage,
      })
    } else if (event.detail == 0 && wx.getStorageSync('utype') == 0) {
      wx.redirectTo({
        url: router.default.platform,
      })
    } else if (event.detail == 1 && wx.getStorageSync('utype') == 0) {
      wx.redirectTo({
        url: router.default.newProject,
      })
    } else if (event.detail == 2 || (event.detail == 1 && wx.getStorageSync('utype') != 0)) {
      wx.redirectTo({
        url: router.default.chart,
      })
    }
    // if (event.detail == 0) {
    //   if (wx.getStorageSync('utype') == 1) {
    //     wx.redirectTo({
    //       url: router.default.list,
    //     })
    //   } else if (wx.getStorageSync('utype') == 2) {
    //     wx.redirectTo({
    //       url: router.default.financialPage,
    //     })
    //   } else {
    //     wx.redirectTo({
    //       url: router.default.platform,
    //     })
    //   }
    // } else if (event.detail == 1 && wx.getStorageSync('utype') == 0) {
    //   wx.redirectTo({
    //     url: router.default.newProject,
    //   })
    // } else if (event.detail == 2 || event.detail == 1 && wx.getStorageSync('utype') != 0) {
    //   if (wx.getStorageSync('utype') == 0) {} else {
    //     wx.redirectTo({
    //       url: router.default.chart,
    //     })
    //   }

    // }
    this.setData({
      active: event.detail
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getData(res) {
    if (res.code == 200) {
      if (res.result) {
        this.setData({
          form: res.result
        })
      }

    }
  },
  getUserData(res) {
    if (res.code == 200) {
      this.setData({
        userInfo: res.result
      })
    }
  },
  onLoad: function(options) {
    this.setData({
      utype: wx.getStorageSync('utype')
    })
    if (wx.getStorageSync('utype') == 0) {
      this.setData({
        active: 3
      })
    } else {
      this.setData({
        active: 2
      })
    }
    serves.getRequ("userBank/getMyBank", this.getData);
    serves.getRequ("user/getLoginUserInfo", this.getUserData)
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