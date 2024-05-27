// pages/userLogin/user-login.js

const db = wx.cloud.database();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickName: "", //昵称
    headshot: "", //头像
    noLogin: true, //判断是否登录
    userIntegral: 0, //用户积分，初始为0
    newIntegral: "", //输入框输入的积分,
  },

  /**
   * 微信一键登录
   */
  login() {
    wx.getUserProfile({
      desc: "必须授权才可继续",
      success: (res) => {
        console.log("授权成功", res);
        this.setData({
          nickName: res.userInfo.nickName,
          headshot: res.userInfo.avatarUrl,
          noLogin: false,
          userIntegral: 0,
        });
        wx.setStorageSync("userInfo", res.userInfo);
        this.showIntegral();
      },
      fail: (res) => {
        console.log("授权失败", res);
      },
    });
  },

  /**
   * 点击按钮，更新积分
   */
  btnChangeIntegral(data) {
    let isExist = false;
    db.collection("usersIntegral")
      .where({
        wxNickname: wx.getStorageSync("userInfo").nickName,
      })
      .get({
        success: (res) => {
          if (res.data.length != 0) {
            isExist = true;
          }
        },
      });

    setTimeout(() => {
      if (isExist) {
        db.collection("usersIntegral")
          .where({
            wxNickname: wx.getStorageSync("userInfo").nickName,
          })
          .update({
            data: {
              integral: parseInt(data.detail.value.newIntegral),
            },
            success: (res) => {
              this.showIntegral();
              wx.showToast({
                title: "更新成功",
                icon: "success",
                duration: 600, //持续的时间
              });
              this.setData({
                newIntegral: "",
              });
            },
          });
      } else {
        this.showIntegral();
        wx.showToast({
          title: "更新失败",
          icon: "error",
          duration: 600, //持续的时间
        });
      }
    }, 800);
  },

  /**
   * 展示积分
   */
  showIntegral() {
    if (!this.data.noLogin) {
      db.collection("usersIntegral")
        .where({
          wxNickname: wx.getStorageSync("userInfo").nickName,
        })
        .get({
          success: (res) => {
            this.setData({
              userIntegral: res.data[0].integral,
            });
          },
          fail: function (e) {
            console.log("获取积分失败", e);
          },
        });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.showIntegral();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
