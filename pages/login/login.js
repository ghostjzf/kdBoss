// pages/login/login.js
import http from "../../utils/http/index.js";
import {API} from "../../utils/API/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneno: ''
  },

  onSubmit(e) {
    const phoneno = e.detail.value.phoneno;
    const password = e.detail.value.password;
    const source = e.detail.target.dataset.source;

    if (phoneno.length !== 11) {
      wx.showToast({
        title: '手机号不正确',
      });

      return;
    }

    if (password.length === 0) {
      wx.showToast({
        title: '密码不能为空',
      });

      return;
    }

    // 缓存账号密码
    wx.setStorageSync('phoneno', phoneno);
    if (source === 'login') {
      this.login(phoneno, password);
    } else {
      this.register(phoneno, password);
    }
  },

  login(phoneno, password) {
    wx.showLoading({
      title: '正在登录',
      mask: true
    });

    http.post(API.login, {
      phoneno: phoneno,
      password: password
    }).then(resp => {
      console.log(resp);
      wx.showToast({
        title: "登陆成功"
      });

      let timer = setTimeout(function () {
        wx.hideLoading();
        clearTimeout(timer);
        wx.setStorageSync("phoneno", phoneno)

        wx.switchTab({
          url: '../index/index',
        })
      }, 300);
    }).catch(error => {
      wx.hideLoading();
      wx.showModal({
        title: '登录失败',
        content: error.message,
        showCancel: false,
        confirmText: "知道了"
      })
    })
  },

  register(phoneno, password) {
    console.log(typeof phoneno)
    http.post(API.register, {
      phoneno: phoneno,
      password: password
    }).then(resp => {
      console.log(resp);
      wx.showToast({
        title: "注册成功"
      });

      let timer = setTimeout(function () {
        wx.hideLoading();
        clearTimeout(timer);
        wx.setStorageSync("phoneno", phoneno)

        wx.switchTab({
          url: '../index/index',
        })
      }, 300);
    }).catch(error => {
      wx.hideLoading();
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const phoneno = wx.getStorageSync('phoneno');

    if (phoneno) {
      this.setData({
        phoneno: phoneno
      })
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