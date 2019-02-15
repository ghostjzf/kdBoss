// pages/edit/recommend/recommend.js
import http from "../../../utils/http/index.js";
import { API } from "../../../utils/API/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  upload() {
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;

        wx.uploadFile({
          url: 'http://172.25.6.117:9999/api/boss/recommend/upload', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            phoneno: wx.getStorageSync("phoneno")
          },
          success: (res) => {
            const image = JSON.parse(res.data).data

            this.getList();
          }
        });

        // this.setData({
        //   preview: tempFilePaths[0]
        // })
      },
    })
  },

  getList() {
    http.get(API.recommend, {
      phoneno: wx.getStorageSync("phoneno")
    }).then(resp => {
      this.setData({
        list: resp.data.items,
        phoneno: wx.getStorageSync("phoneno")
      })
    }).catch(error => {
      console.log(error)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
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