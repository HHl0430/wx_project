// pages/newProject/newProject.js
const serves = require('../../utils/request.js')
const router = require("../../router.js")
const app = getApp()
import Notify from '../../dist/notify/notify';
import Toast from '../../dist/toast/toast';
import Dialog from '../../dist/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    list: [],
    value: '',
    date: '',
    datePickerIsShow: false,
    startAt: '',
    endAt: '',
    money: 0,
    form: {
      iid: 0,
      iitemname: '',
      iiteminfo: '',
      ibegintime: '',
      time: '',
      iendtime: '',
      igatheringmoney: '',
      iitemlastdate: '',
      irate: '',
      iitemperiods: '',
      iitemperiodsType: '1',
      iitemperiodsMonth: '',
      iitemperiodsday: ''
    },
    inputVal: [],
    userList: []

  },

  getInputVal: function(e) {
    var nowIdx = e.currentTarget.dataset.idx; //获取当前索引
    var val = e.detail; //获取输入的值
    var oldVal = this.data.inputVal;
    var num = 0;

    oldVal[nowIdx].iuJoinitemmoney = val; //修改对应索引值的内容
    this.setData({
      inputVal: oldVal
    })
    this.data.inputVal.forEach(item => {
      if (oldVal[nowIdx].name == item.name) {
        if (+val > +item.unUsedQuota) {
          Toast.fail("超出可使用额度");
        }
      }
      item.iuJoinitemmoney == "" ?
        (num += 0) :
        (num += +item.iuJoinitemmoney);
    })
    var money = this.data.form.igatheringmoney - num
    this.setData({
      money
    })
  },
  showpicker() {
    this.setData({
      datePickerIsShow: true
    })
  },
  onDatePickerOnSureClick(e) {
    this.setData({
      datePickerIsShow: false,
      endAt: e.detail.endAt,
      startAt: e.detail.startAt,
      ['form.time']: e.detail.startAt + '/' + e.detail.endAt,
      ['form.ibegintime']: e.detail.startAt,
      ['form.iendtime']: e.detail.endAt,
    })

    console.log(e)
  },
  onTouchmask() {
    this.setData({
      datePickerIsShow: false
    })
  },
  bindDateChange(e) {
    if (e.target.dataset.type == "ibegintime") {
      this.setData({
        ['form.ibegintime']: e.detail.value
      })
    } else if (e.target.dataset.type == "iendtime") {
      this.setData({
        ['form.iendtime']: e.detail.value
      })
    } else {
      this.setData({
        ['form.iitemlastdate']: e.detail.value
      })
    }

  },
  radioChange(e) {
    this.setData({
      ['form.iitemperiodsType']: e.detail
    })
  },
  inputWacth(e) {
    let name = e.currentTarget.dataset.name;
    let val = `form.${name}`
    this.setData({
      [val]: e.detail
    })
  },
  activeOnChange(event) {
    console.log(event.detail)
    this.setData({
      active: event.detail
    });
    if (event.detail == 3) {
      wx.redirectTo({
        url: router.default.my,
      })
    } else if (event.detail == 0) {
      wx.redirectTo({
        url: router.default.platform,
      })
    } else if (event.detail == 2) {
      wx.redirectTo({
        url: router.default.chart,
      })
    }
  },
  selectPeople() {
    let data = JSON.stringify(this.data.inputVal)
    let user = JSON.stringify(this.data.userList)
    let form = JSON.stringify(this.data.form)
    console.log(user)
    wx.navigateTo({
      url: router.default.selectPeople + '?data=' + data + '&user=' + user + '&form=' + form,
    })
  },
  toggle(event) {
    const {
      index
    } = event.currentTarget.dataset;

    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
    console.log(index, checkbox)
  },
  searchChange(e) {
    this.setData({
      value: e.detail
    });
  },
  onSearch() {
    serves.getRequ(`user/selectUserName?fuzzy=${this.data.value}`, this.getUserData)
  },
  getUserData(res) {
    if (res.code == 200) {
      this.setData({
        list: res.result
      })
    }
  },
  getBlankData(res) {
    if (res.code == 200) {
      let form = {}
      form = { ...this.data.form,
        ...res.result
      }
      this.setData({
        form
      })
    }
  },
  noop() {},
  save() {

    if (this.data.inputVal.length < 1) {
      Toast.fail('请选择参与人员');
      return
    } else if (this.data.form.iitemname == '') {
      Toast.fail('请输入项目名称');
      return
    } else if (this.data.form.ibegintime == '') {
      Toast.fail('请输入开始时间');
      return
    } else if (this.data.form.iendtime == '') {
      Toast.fail('请输入结束时间');
      return
    } else if (this.data.form.igatheringmoney == '') {
      Toast.fail('请输入项目金额');
      return
    } else if (this.data.form.iitemlastdate == '') {
      Toast.fail('请输入项目截至日期');
      return
    } else if (this.data.form.irate == '') {
      Toast.fail('请输入项目利率');
      return
    } else if (this.data.form.iitemperiods == '') {
      Toast.fail('请输入项目期数');
      return
    } else if (this.data.form.iitemperiodsMonth == '' && this.data.form.iitemperiodsType == 1) {
      Toast.fail('请输入打款日期');
      return
    } else if (this.data.form.iitemperiodsday == '' && this.data.form.iitemperiodsType == 0) {
      Toast.fail('请输入每期天数');
      return
    } else if (this.data.inputVal.length > 1) {
      var count = 0
      this.data.inputVal.forEach(item => {
        count += +item.iuJoinitemmoney
        if (item.iuJoinitemmoney == '') {
          Toast.fail('请输入用户金额');
          return
        }
      })
      console.log(count, this.data.form.igatheringmoney)
      if (count != this.data.form.igatheringmoney) {
        Toast.fail('金额必须相等');
        return
      }
    } else if (this.data.form.ibBank == '') {
      Toast.fail('请输入收款银行名称');
      return
    } else if (this.data.form.ibBankBranch == '') {
      Toast.fail('收款银行支行名称');
      return
    } else if (this.data.form.ibBanknumber == '') {
      Toast.fail('收款银行账户');
      return
    } else if (this.data.form.ibPayee == '') {
      Toast.fail('收款开户人姓名');
      return
    }
    let obj = this.data.form
    obj.userList = this.data.inputVal
    serves.postRequ('items/terrace/addOneItem', obj, this.saveSuccess)

  },
  saveSuccess(res) {
    if (res.code == 200) {
      Notify({
        type: 'success',
        message: '添加项目成功'
      });
      wx.redirectTo({
        url: router.default.platform,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.data) {
      let data = JSON.parse(options.data)
      let user = JSON.parse(options.user)
      console.log(data)
      let form = JSON.parse(options.form)
      if (data.length > 0) {
        this.setData({
          inputVal: data,
          userList: user,
          form: form
        })
      }
    }
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
    serves.getRequ('user/selectUserName', this.getUserData)
    serves.getRequ('itemsBank/getCompanyBank', this.getBlankData)
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