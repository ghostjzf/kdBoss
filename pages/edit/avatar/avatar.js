// pages/edit/avatar/avatar.js
import http from "../../../utils/http/index.js";
import { API } from "../../../utils/API/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    showMenu: false
  },

  showMenu() {
    this.animation.bottom(0).step();

    this.setData({
      animationData: this.animation.export(),
      showMenu: true
    })
  },

  hideMenu() {
    this.animation.bottom(-this.data.windowHeight).step();

    this.setData({
      animationData: this.animation.export(),
      showMenu: false
    })
  },

  reupload() {
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res);
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          saveImage: tempFilePaths[0]
        })

        wx.uploadFile({
          url: 'http://172.25.6.158:9999/api/boss/upload', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            phoneno: wx.getStorageSync("phoneno")
          },
          success: (res) => {
            http.post(API.update, {
              phoneno: wx.getStorageSync("phoneno"),
              image: JSON.parse(res.data).data
            }).then(() => {
              this.getDetail();
              this.hideMenu();
            })
          }
        });
      },
    })
  },

  getDetail() {
    http.get(API.storeDetail, {
      id: wx.getStorageSync("id")
    }).then(resp => {
      console.log(resp);

      this.setData({
        image: resp.data.image,
        phoneno: resp.data.phoneno
      })
    }).catch(error => {
      console.log(error)
    })
  },

  save() {
    wx.getImageInfo({
      src: `http://172.25.6.158:9999/api/customer${this.data.image}?phoneno=${this.data.phoneno}`,
      success: (res) => {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success: () => {
            wx.showToast({
              title: '保存成功',
            })

            this.hideMenu();
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      const res = wx.getSystemInfoSync()
      
      this.setData({
        windowHeight: res.windowHeight,
        image: options.avatar,
        phoneno: options.phoneno
      })
    } catch (e) {
      // Do something when catch error
    }
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
    const animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })

    this.animation = animation
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