// pages/login/login.js
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

    let timer = setTimeout(function () {
      wx.hideLoading();
      clearTimeout(timer);
      // 登陆成功跳转首页
      wx.switchTab({
        url: '../index/index',
      })
    }, 500);
  },

  register(phoneno, password) {
    wx.showToast({
      title: '注册成功',
    })

    setTimeout(function () {
      // 登陆成功跳转首页
      wx.switchTab({
        url: '../index/index',
      })
    }, 500);
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