// pages/taskForm/task-form.js
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: "****-**-**",
  },

  /**
   * 提交表单,将打卡信息传入数据库,数据表为usersInfo
   */
  SubTaskInfo(res) {
    console.log(res);
    db.collection("usersInfo").add({
      data: {
        name: res.detail.value.userName,
        phone: res.detail.value.userPhone,
        task: res.detail.value.radio,
        consumerName: res.detail.value.consumerName,
        consumerPhone: res.detail.value.consumerPhone,
        completDate: res.detail.value.picker,
        region: res.detail.value.userRegion,
        company: res.detail.value.userCompany,
      },
    });
    wx.showToast({
      title: '打卡成功！',
      icon:'success'
    });

    let integral = 0;
    if (res.detail.value.radio == "口扫") {
      integral = 2;
    } else if (res.detail.value.radio == "洗牙卡") {
      integral = 99;
    } else if (res.detail.value.radio == "涂氟卡") {
      integral = 99;
    } else if (res.detail.value.radio == "牙膏卡") {
      integral = 99;
    }

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
      if (!isExist) {
        db.collection("usersIntegral").add({
          data: {
            wxNickname: wx.getStorageSync("userInfo").nickName,
            integral: res.detail.value.userName,
            name: res.detail.value.userName,
            phone: res.detail.value.userPhone,
            consumerName: res.detail.value.consumerName,
            consumerPhone: res.detail.value.consumerPhone,
            task: res.detail.value.radio,
            completDate: res.detail.value.picker,
            region: res.detail.value.userRegion,
            company: res.detail.value.userCompany,
            integral: integral,
          },
        });
      } else {
        db.collection("usersIntegral")
          .where({
            wxNickname: wx.getStorageSync("userInfo").nickName,
          })
          .update({
            data: {
              integral: db.command.inc(integral),
            },
          });
      }
    }, 800);
  },

  /**
   * 日期选择器
   */
  bindDateChange: function (e) {
    console.log("picker发送选择改变，携带值为", e.detail.value);
    this.setData({
      date: e.detail.value,
    });
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
  onShow() {},

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
