//index.js
import http from "../../utils/http/index.js";
import { API } from "../../utils/API/index.js"

//获取应用实例
const app = getApp()

Page({
  data: {
    isHasStore: false,
    list: []
  },
  edit() {
    wx.setStorageSync("id", this.data.list[0].id);
    wx.navigateTo({
      url: '../store/store',
    })
  },
  onAddStore() {
    wx.navigateTo({
      url: '../addStore/addStore',
    })
  },
  getList() {
    http.get(API.storeList, {
      phoneno: wx.getStorageSync("phoneno")
    }).then(resp => {
      this.setData({
        list: resp.data
      })
    }).catch(error => {
      
    })
  },
  onShow: function () {
    this.getList();
  }
})
