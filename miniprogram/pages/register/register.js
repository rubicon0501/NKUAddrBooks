// pages/register/register.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phoneNum: ''
    },
    registerWithPhoneNum: function (e) {
        console.log(this.data.phoneNum)
        // 调用云函数
        wx.cloud.callFunction({
            name: 'nku_sign',
            data: {
                phoneNum:  parseInt(this.data.phoneNum),
            },
            success: res => {
                console.log(res);
                var resLogic = res.result.errCode
                wx.showModal({
                    title: '注册结果',
                    content: res.result.errMsg,
                    confirmText: "我知道了",
                    showCancel: false,
                    success(res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                            if (resLogic == 0) {
                                wx.navigateTo({
                                    url: '../index/index',
                                })
                            }
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            },
            fail: err => {
                console.error('[云函数] [nku_sign] 调用失败', err)
                wx.showModal({
                    title: '调用失败',
                    content: '请检查云函数[nku_sign]是否已部署',
                    showCancel: false,
                    success(res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            }
        })
    },
    bindKeyInput: function (e) {
        var input = e.detail.value
        console.log("检测输入：" + input)
        this.setData({
            phoneNum: input,
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