//logs.js
const util = require('../../utils/request.js')
const router = require("../../router.js")
const app = getApp()
import Notify from '../../dist/notify/notify';
Page({
  data: {
    active: 0,
    page: 1,
    pageCount: '',
    dataList: []
  },
  detail(event) {
    wx.navigateTo({
      url: `${router.default.userDetail}?iriuId=${event.currentTarget.dataset['id']}&itemsId=${event.currentTarget.dataset['iid']}`
    })
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({
      active: event.detail
    });
    if (event.detail == 1) {
      wx.redirectTo({
        url: router.default.chart,
      })
    } else if (event.detail == 2) {
      wx.redirectTo({
        url: router.default.my,
      })
    }
  },
  successData(res) {
    if (res.code == 200) {
      res.result.data.forEach(item => {
        if (item.iitemstate == 1 && item.iuJoinintention == 1) {
          item.color = '#1989fa'
        } else if (item.iitemstate == 1 && item.iuJoinintention != 1) {
          item.color = '#ff9900'
        } else {
          item.color = '#19be6b'
        }
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
    }
  },
  getDataListFun() {
    let obj = {
      page: this.data.page,
      size: 20,
    }
    util.getRequ(`itemsUser/list?page=${obj.page}&size=${obj.size}&orderType=&orderPermu=`, this.successData)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.data.page = 1;
    this.getDataListFun();
    Notify({
      type: 'success',
      message: '刷新成功'
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.page * 10 < this.data.pageCount) {
      this.data.page++;
      this.getDataListFun()
    } else {
      Notify({
        type: 'warning',
        message: '已经是最后一页了'
      });
    }
  },
  onLoad() {
    let bank = wx.getStorageSync('bank');
    if (bank) {
      Notify({
        type: 'warning',
        message: '请到个人中心完善银行信息'
      });
    }

    this.getDataListFun()
  }
})