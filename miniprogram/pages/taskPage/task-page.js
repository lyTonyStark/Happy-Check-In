// pages/taskPage/task-page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 点击跳转至任务提交表单页
   */
  skipToTaskForm() {
    wx.navigateTo({
      url: '/pages/taskForm/task-form',
      success: (result) => {
        wx.showToast({
          title: '请填写真实信息！',
          duration: 2000,
          icon: 'none'
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '发生意外错误！',
          duration: 0,
          icon: 'error'
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})