var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  return new(P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
import {
  mockData
} from '../../public/utils/util';
const app = getApp();
Page({
  options: {
    addGlobalClass: true,
  },
  properties: {},
  computed: {},
  data: {
    nickName: "点击登录",
    avatarUrl: "/images/user-unlogin.png",
    userInfo: {},
    user: {},
    college: ['全部', '材料科学与工程学院', '电子信息与光学工程学院', '法学院', '环境科学与工程学院',
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
    date: '1980',
    curCollege: "全部",
    curMajor: "全部",
    curNname: "",
    curGrade: "",
    tableColumns: [{
      title: "姓名",
      key: "name",
      width: "100rpx",
      type: "action"
    }, {
      title: "电话",
      key: "tel",
      width: "200rpx",
      type: "action"
    }, {
      title: "工作单位",
      key: "job",
      width: "650rpx",
      type: "action"
    }, {
      title: "性别",
      key: "sex",
      width: "100rpx",
      type: "action"
    }, {
      title: "入学年份",
      key: "grade",
      width: "200rpx",
      type: "action"
    }, {
      title: "毕业院系",
      key: "college",
      width: "500rpx",
      type: "action"
    }, {
      title: "专业",
      key: "major",
      width: "500rpx",
      type: "action"
    }, {
      title: "籍贯",
      key: "region",
      width: "100rpx",
      type: "action"
    }],
    dataList: [],
    pageNum: 1,
    pageSize: 10,
    pageCount: 1,
    tableHeight: "800rpx",
    getListLoading: false,
  },
  options: {},

  handleClickItem(e) {
    console.log(e);
    const {
      index,
      item
    } = e.detail.value;
    wx.showToast({
      title: `点击第${index + 1}行`
    });
  },
  nkuLogin(e) {
    if (app.globalData.logStatus == true) {
      console.log("已经成功登录")
      return
    }
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    console.log("djnwjdnjwndwj")
    wx.getUserProfile({
      desc: '用于确认会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
        })
        app.globalData.userInfo = res.userInfo
        console.log(this.data.userInfo)
        wx.cloud.callFunction({
          name: 'nku_login',
          data: {},
          success: res => {
            console.log(res);
            var resLogic = res.result.errCode
            if (resLogic == 0) {
              this.setData({
                nickName: res.result.data.name,
              })
              app.globalData.logStatus = true
              this.searchClassMates()
            } else {
              wx.showModal({
                title: '登录结果',
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
            }
          },
          fail: err => {
            console.error('[云函数] [nku_login] 调用失败', err)
            wx.showModal({
              title: '调用失败',
              content: '请检查云函数[nku_login]是否已部署',
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
      }
    })
  },
  userNameInput: function (e) {
    this.setData({
      curNname: e.detail.value
    })
    //console.log(e.detail.value)
  },
  handleClickAction(e) {

    let str = '';
    const {
      type,
      index,
      item
    } = e.detail.value;
    console.log(item);
    if (type === 'name') {
      wx.setClipboardData({
        data: `${item.name}`,
        // success (res) {
        //   wx.getClipboardData({
        //     success (res) {
        //       console.log("copy"+res.data) // data
        //     }
        //   })
        // }
      })
    } else if (type === 'tel') {
      wx.setClipboardData({
        data: `${item.tel}`,
      })
    } else if (type === 'sex') {
      wx.setClipboardData({
        data: `${item.sex}`,
      })
    } else if (type === 'grade') {
      wx.setClipboardData({
        data: `${item.grade}`,
      })
    } else if (type === 'major') {
      wx.setClipboardData({
        data: `${item.major}`,
      })
    } else if (type === 'college') {
      wx.setClipboardData({
        data: `${item.college}`,
      })
    } else if (type === 'region') {
      wx.setClipboardData({
        data: `${item.region}`,
      })
    } else if (type === 'job') {
      wx.setClipboardData({
        data: `${item.job}`,
      })
    }
  },
  handleOnActionEvent(e) {
    console.log(e);
  },

  getList() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const {
          pageNum,
          pageSize,
          pageCount,
          dataList,
          getListLoading
        } = this.data;
        if (pageNum > pageCount)
          return;
        if (getListLoading)
          return;
        this.setData({
          getListLoading: true,
        });
        const res = yield mockData('list', {
          id: 1,
          name: '兼职人员',
          grade: 2011,
          major: '电子信息',
          tel: 13988888888,
          sex: '男',
          college: '信科院',
          job: '粤港澳大湾区职业农民工',
          region: '毕节',
        }, "name", pageNum, pageSize);
        this.setData({
          dataList: dataList.concat(res.data.list),
          pageCount: res.data.pageCount,
          getListLoading: false,
          pageNum: res.data.list.length > 0 ? pageNum + 1 : pageNum,
        });
      } catch (e) {
        this.setData({
          getListLoading: false,
        });
        console.log(e);
      }
    });
  },
  reloadList() {
    this.setData({
      pageNum: 1,
      pageCount: 1,
      dataList: [],
    }, () => {
      this.getList();
    });
  },
  onLoad(options) {
    console.log(options + "Aloha");
    //this.getList();
  },
  onShow() {
    console.log('onShow');
  },
  onReady() {
    console.log('onReady');
  },
  onShareAppMessage() {
    return app.globalData.transmit;
  },

  bindPickerCollegeChange: function (e) {
    this.setData({
      indexCollege: e.detail.value,
      indexMajor: 0,
      curCollege: this.data.college[e.detail.value]
    })
    console.log('picker发送选择改变，携带值为', this.data.curCollege)
  },
  bindPickerMajorChange: function (e) {
    this.setData({
      indexMajor: e.detail.value,
      curMajor: this.data.majors[this.data.indexCollege][e.detail.value]
    })
    console.log('picker发送选择改变，携带值为', this.data.curMajor)
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      curGrade: e.detail.value
    })
    console.log('picker发送选择改变，携带值为', this.data.curGrade)
  },
  updateSelfInfo: function (e) {
    console.log("ready to update")
    //app.globalData.logStatus = true
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
    } else {
      wx.navigateTo({
        url: '../update/update',
      })
    }
  },
  searchClassMates: function (e) {
    console.log("ready to update")
    //app.globalData.logStatus = true
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
      return
    }
    wx.showLoading({
      title: '正在查询通讯录',
    })


    wx.cloud.callFunction({
      name: 'nku_search',
      data: {
        name: this.data.curNname,
        grade: parseInt(this.data.curGrade),
        college: this.data.curCollege,
        major: this.data.curMajor,
      },
      success: res => {
        console.log(res);
        var resLogic = res.result.errCode
        wx.hideLoading()
        if (resLogic != 0) {
          wx.showModal({
            title: '查询结果',
            content: res.result.errMsg,
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
        } else {
          try {
            this.setData({
              getListLoading: false,
              dataList: res.result.data,
            });
          } catch (e) {
            this.setData({
              getListLoading: false,
            });
            console.log(e);
          }
        }
      },
      fail: err => {
        wx.hideLoading()
        console.error('[云函数] [nku_search] 调用失败', err)
        wx.showModal({
          title: '调用失败',
          content: '请检查云函数[nku_search]是否已部署',
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
  }
})