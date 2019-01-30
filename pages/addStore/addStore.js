// pages/addStore/addStore.js
import http from "../../utils/http/index.js";
import { API } from "../../utils/API/index.js"

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
    data.multiIndex[e.detail.column] = e.detail.value
    switch (column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ["餐饮"]
            break
          case 1:
            data.multiArray[1] = ["运动健康", "幼儿"]
            break
          case 2:
            data.multiArray[1] = ["全部", "KTV", "网咖", "电影院", "台球厅", "电玩", "酒吧", "公园", "旅行", "钓鱼"]
            break
          case 3:
            data.multiArray[1] = ["美发", "美容"]
            break
          case 5:
            data.multiArray[1] = ["星级酒店", "经济旅馆"]
            break
        }
        data.multiIndex[1] = 0
        break
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

  upload() {
    wx.chooseImage({
      success: (res) => {
        console.log(res);
        const tempFilePaths = res.tempFilePaths;

        this.setData({
          preview: tempFilePaths[0]
        })
      },
    })
  },

  recommendUpload() {
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res);
        const tempFilePaths = res.tempFilePaths;

        // this.setData({
        //   preview: tempFilePaths[0]
        // })
      },
    })
  },

  showMessage(field) {
    wx.showModal({
      content: field + "不能为空",
      showCancel: false
    })
  },

  onSubmit(e) {
    const params = e.detail.value;
    const preview = this.data.preview;

    if (!params.name) {
      this.showMessage("门店名称");

      return;
    };

    if (!params.address) {
      this.showMessage("门店地址");

      return;
    };

    if (!params.type) {
      this.showMessage("门店类型");

      return;
    };

    if (!preview) {
      this.showMessage("门店图片");

      return;
    }

    wx.uploadFile({
      url: 'http://172.25.6.158:9999/api/boss/upload', // 仅为示例，非真实的接口地址
      filePath: preview,
      name: 'file',
      formData: {
        phoneno: wx.getStorageSync("phoneno")
      },
      success: (res) => {
        params.type = params.type.map(item => item + 1).join(",");
        this.uploadForm(params, JSON.parse(res.data).data)
      }
    });
  },

  uploadForm(params, image) {
    http.post(API.createStore, {
      ...params,
      image: image,
      phoneno: wx.getStorageSync("phoneno")
    }).then(resp => {
      console.log(resp);
      wx.switchTab({
        url: '../index/index'
      })
    }).catch(error => {
      console.log(error)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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