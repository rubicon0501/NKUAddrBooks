// pages/update/update.js

const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        colleges: ['全部', '材料科学与工程学院', '电子信息与光学工程学院', '法学院', '环境科学与工程学院',
            '汉语言文化学院', '化学学院', '计算机与控制工程学院', '金融学院', '经济学院', '旅游与服务学院', '历史学院',
            '马克思主义教育学院', '商学院', '生命科学学院', '数学学院', '外国语学院', '文学院', '物理科学学院',
            '药学院', '医学院', '周恩来政府管理学院', '哲学院'
        ],
        indexCollege: 0,
        majors: [
            ['全部'],
            ['全部', '材料化学', '材料物理', '材料工程(硕)', '材料学(硕)', '材料物理与化学(硕)', '材料物理与化学(博)'],
            ['全部', '电子信息科学与技术', '微电子科学与工程', '电子科学与技术', '通信工程', '光电信息科学与工程(合)'],
            ['全部', '法学'],
            ['全部', '环境科学', '环境工程', '资源循环科学与工程'],
            ['全部', '汉语言', '汉语国际教育'],
            ['全部', '化学', '分子科学与工程(合) ', '化学生物学', '应用化学'],
            ['全部', '计算机科学与技术', '物联网工程 ', '自动化', '智能科学与技术', '软件工程', '信息安全'],
            ['全部', '保险学', '金融工程', '金融学'],
            ['全部', '经济学', '国际经济与贸易', '财政学', '国际商务'],
            ['全部', '会展经济与管理', '旅游管理'],
            ['全部', '文物与博物馆学', '世界史', '历史学'],
            ['全部', '思想政治教育'],
            ['全部', '财务管理', '工商管理', '市场营销', '会计学', '人力资源管理', '信息管理与信息系统', '电子商务', '图书馆学', '档案学', '工业工程', '物流管理'],
            ['全部', '生物科学', '生物技术'],
            ['全部', '数学与应用数学', '信息与计算科学', '统计学'],
            ['全部', '日语', '英语', '翻译', '俄语', '法语', '德语', '西班牙语'],
            ['全部', '汉语言文学', '编辑出版学', '绘画', '环境设计', '视觉传达设计', '广播电视学'],
            ['全部', '物理学', '应用物理学', '光电信息科学与工程'],
            ['全部', '药学'],
            ['全部', '临床医学', '口腔医学'],
            ['全部', '城市管理', '应用心理学', '行政管理', '社会工作', '社会学', '国际政治', '政治学与行政学'],
            ['全部', '逻辑学', '哲学'],
        ],
        indexMajor: 0,
        sexs: ['全部', '男', '女'],
        indexSex: 0,

        date: '1980',
        college: "全部",
        major: "全部",
        sex: "全部",
        name: "",
        job: "",
        tel: "",
        region: ""
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

    },
    bindPickerCollegeChange: function (e) {
        this.setData({
            indexCollege: e.detail.value,
            indexMajor: 0,
            college: this.data.colleges[e.detail.value]
        })
        console.log('picker发送选择改变，携带值为', this.data.college)
    },
    bindPickerMajorChange: function (e) {
        this.setData({
            indexMajor: e.detail.value,
            major: this.data.majors[this.data.indexCollege][e.detail.value]
        })
        console.log('picker发送选择改变，携带值为', this.data.major)
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
        console.log('picker发送选择改变，携带值为', this.data.date)
    },
    bindPickerSexChange: function (e) {
        this.setData({
            indexSex: e.detail.value,
            sex: this.data.sexs[e.detail.value]
        })
        console.log('picker发送选择改变，携带值为', this.data.sex)
    },
    bindKeyInputName: function (e) {
        var input = e.detail.value
        console.log("input: " + input)
        this.setData({
            name: input,
        })
    },

    bindKeyInputJob: function (e) {
        var input = e.detail.value
        console.log("input: " + input)
        this.setData({
            job: input,
        })
    },
    bindKeyInputTel: function (e) {
        var input = e.detail.value
        console.log("input: " + input)
        this.setData({
            tel: input,
        })
    },
    bindKeyInputRegion: function (e) {
        var input = e.detail.value
        console.log("input: " + input)
        this.setData({
            region: input,
        })
    },
    updateSelfInfo: function (e) {
        if (!app.globalData.logStatus) {
            wx.showModal({
                title: '提示',
                content: '请先登录哦~',
                confirmText: "我知道了",
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
            wx.navigateTo({
                url: '../index/index',
            })
            return
        }

        //检查信息是否填写完整
        var errMsg = ""
        if (this.data.date == '1980') {
            errMsg = "请选择正确的入学年份"
        } else if (this.data.college == "全部") {
            errMsg = "请选择正确的院系"
        } else if (this.data.major == "全部") {
            errMsg = "请选择正确的专业"
        } else if (this.data.sex == "全部") {
            errMsg = "请选择正确的性别"
        } else if (this.data.name == "") {
            errMsg = "请填写正确的姓名"
        } else if (this.data.job == "") {
            errMsg = "请填写正确的工作信息"
        } else if (this.data.tel == "") {
            errMsg = "请填写正确的电话号码"
        } else if (this.data.region == "") {
            errMsg = "请填写正确的籍贯信息"
        }

        if (errMsg != "") {
            wx.showModal({
                title: '提示',
                content: errMsg,
                confirmText: "我知道了",
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
            return
        }
        wx.showLoading({
            title: '正在修改...',
        })

        wx.cloud.callFunction({
            name: 'nku_update',
            data: {
                name: this.data.name,
                job: this.data.job,
                tel: parseInt(this.data.tel),
                sex: this.data.sex,
                grade: parseInt(this.data.date),
                college: this.data.college,
                major: this.data.major,
                region: this.data.region,
            },
            success: res => {
                wx.hideLoading()
                console.log(res);
                var resLogic = res.result.errCode
                wx.showModal({
                    title: '修改结果',
                    content: res.result.errMsg,
                    confirmText: "我知道了",
                    showCancel: false,
                    success(res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                            if (resLogic == 2) {
                                wx.navigateTo({
                                    url: '../register/register',
                                })
                            }
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            },
            fail: err => {
                wx.hideLoading()
                console.error('[云函数] [nku_update] 调用失败', err)
                wx.showModal({
                    title: '调用失败',
                    content: '请检查云函数[nku_update]是否已部署',
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
        return

    },
})