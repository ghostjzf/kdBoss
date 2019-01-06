//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isHasStore: false
  },
  onAddStore() {
    wx.navigateTo({
      url: '../addStore/addStore',
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
  }
})
