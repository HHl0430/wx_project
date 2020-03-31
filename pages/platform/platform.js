// pages/platform/platform.js
const serves = require('../../utils/request.js')
const router = require("../../router.js")
const app = getApp()
import Notify from '../../dist/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    dataList: [],
    pageCount: '',
    page: 1,
    size: 20,
    noDataTitle: '',
  },
  detail(event) {
    wx.navigateTo({
      url: `${router.default.projectDetail}?itemsId=${event.currentTarget.dataset['iid']}`
    })
  },
  getData(res) {
    if (res.code == 200) {
      wx.stopPullDownRefresh();
      res.result.data.forEach(item => {
        item.state = item.iitemstate == 0 ? '未发布' : item.iitemstate == 1 ? '已发布' : '已撤回'
        item.color = item.iitemstate == 0 ? '' : item.iitemstate == 1 ? '#1989fa' : '#ff976a'
      })
      var dataList = this.data.dataList;
      dataList = dataList.concat(res.result.data)
      if (this.data.page == 1) {
        this.setData({
          dataList: res.result.data,
          pageCount: res.result.count
        })
      } else {
        this.setData({
          dataList: dataList,
          pageCount: res.result.count
        })
      }
      if (dataList.length == 0) {
        this.setData({
          noDataTitle: '暂时没有项目'
        })
      }
    }
  },
  getdataMethods() {
    let obj = {
      page: this.data.page,
      size: 20,
      iitemname: ""
    }
    serves.postRequ('items/terrace/selectAll', obj, this.getData)
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({
      active: event.detail
    });
    if (event.detail == 3) {
      wx.redirectTo({
        url: router.default.my,
      })
    } else if (event.detail == 1) {
      wx.redirectTo({
        url: router.default.newProject,
      })
    } else if (event.detail == 2) {
      wx.redirectTo({
        url: router.default.chart,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.getdataMethods()
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
    this.data.page = 1;
    this.getdataMethods()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.page * 10 < this.data.pageCount) {
      this.data.page++;
      this.getdataMethods()
    } else {
      Notify({
        type: 'warning',
        message: '已经是最后一页了'
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})