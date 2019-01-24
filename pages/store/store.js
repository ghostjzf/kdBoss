// pages/editStore/editStore.js
import http from "../../utils/http/index.js";
import { API } from "../../utils/API/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  editAvatar(e) {
    const detail = this.data.detail;

    wx.navigateTo({
      url: '../edit/avatar/avatar?avatar=' + detail.image + "&phoneno=" + detail.phoneno,
    })
  },

  editStore() {
    const detail = this.data.detail;

    wx.navigateTo({
      url: '../edit/name/name?name=' + detail.name,
    })
  },

  editAddress() {
    const detail = this.data.detail;

    wx.navigateTo({
      url: '../edit/address/address?address=' + detail.address,
    })
  },

  editTypes() {
    const detail = this.data.detail;

    wx.navigateTo({
      url: '../edit/types/types?types=' + detail.type,
    })
  },

  editRecommend() {
    wx.navigateTo({
      url: '../edit/recommend/recommend',
    })
  },

  getDetail(id) {
    http.get(API.storeDetail, {
      id: id
    }).then(resp => {
      console.log(resp);

      this.setData({
        detail: resp.data
      })
    }).catch(error => {
      console.log(error)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id);
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
    const id = wx.getStorageSync("id");

    this.getDetail(id);
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