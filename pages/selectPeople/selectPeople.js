// pages/selectPeople/selectPeople.js
const serves = require('../../utils/request.js')
const router = require("../../router.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexList: [],
    value: '',
    userList: [],
    show: false,
    list: [],
    form: {},
    inputVal: [],
    scrollTop: 0,
  },
  searchChange(e) {
    this.setData({
      value: e.detail
    });
  },
  onSearch() {
    serves.getRequ(`user/firstUserList?fuzzy=${this.data.value}`, this.getUserData)
  },
  getUserData(res) {
    if (res.code == 200) {
      this.setData({
        list: res.result.list,
        show: true,
        indexList: res.result.initials
      })
    }
  },
  save() {
    let data = JSON.stringify(this.data.inputVal)
    let user = JSON.stringify(this.data.userList)
    let form = JSON.stringify(this.data.form)
    wx.navigateTo({
      url: router.default.newProject + '?data=' + data + '&user=' + user + '&form=' + form,
    })
  },
  onChange(event) {
    var newUserList = []
    event.detail.forEach((item, index) => {
      var obj = {
        name: '',
        iuJoinitemmoney: '',
        iuUserid: '',
      }
      obj.name = item.split("-")[0]
      obj.iuUserid = +item.split("-")[1]
      obj.unUsedQuota = +item.split("-")[2]
      newUserList.push(obj)
    })
    //第一种情况：从0开始添加
    //第二种情况：在原有基础上添加
    //第三种情况：在原有基础上删除
    if (this.data.inputVal.length != 0) {
      newUserList.forEach(item => {
        this.data.inputVal.forEach(item2 => {
          if (item.name == item2.name) {
            item.iuJoinitemmoney = item2.iuJoinitemmoney
          }
        })
      })
    }

    this.setData({
      inputVal: newUserList
    })
    this.setData({
      userList: event.detail
    });
  },
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  },
  toggle(event) {
    const {
      index
    } = event.currentTarget.dataset;

    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let data = JSON.parse(options.data)
    let user = JSON.parse(options.user)
    let form = JSON.parse(options.form)
    if (data.length > 0) {
      this.setData({
        inputVal: data,
        userList: user,

      })
    }
    this.setData({
      form: form
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
    serves.getRequ('user/firstUserList', this.getUserData)
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