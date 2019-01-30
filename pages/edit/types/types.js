// pages/edit/types/types.js
import http from "../../../utils/http/index.js";
import { API } from "../../../utils/API/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [['餐饮', '健康养生', '休闲娱乐', '美容美发', '礼品店', '酒店'], ['餐饮']],
    multiIndex: [0, 0]
  },

  bindMultiPickerColumnChange(e) {
    const column = e.detail.column; // '修改的列'
    const value = e.detail.value; // '修改的值'

    const data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    }
    data.multiIndex[e.detail.column] = e.detail.value;
    if (column === 0) {
      data.multiArray[1] = this.data.list.filter(item => (
        item.pid === data.multiIndex[0] + 1
      )).map(item => item.name)
    }
    
    console.log(data.multiIndex)
    this.setData(data)
  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },

  getList(types) {
    http.get(API.types)
    .then(res => {
      this.setData({
        list: res.data,
      }, () => {
        const data = {
          multiArray: this.data.multiArray,
          multiIndex: types.split(",").map(item => item - 1)
        }

        data.multiArray[1] = this.data.list.filter(item => (
          item.pid === data.multiIndex[0] + 1
        )).map(item => item.name)

        this.setData(data)
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList(options.types);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    http.post(API.update, {
      phoneno: wx.getStorageSync("phoneno"),
      type: this.data.multiIndex.map(item => item + 1).join()
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})