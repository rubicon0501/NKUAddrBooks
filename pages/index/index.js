var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
import { mockData } from '../../public/utils/util';
const app = getApp();
Page({
  options: {
      addGlobalClass: true,
  },
  properties: {},
  computed: {},
  data: {
    college: ['物理', '化学', '数学', '周政','信科'],
    indexCollege: 4,
    major: ['电子信息', '自动化', '计算机', '英语', '工商管理', '经济'],
    indexMajor:0,
    date: '2011',
    tableColumns: [{
        title: "姓名",
        key: "name",
        width: "100rpx",
        type: "action"
    }, {
        title: "入学年份",
        key: "grade",
        width: "200rpx",
        type: "action"
    },{
        title: "电话",
        key: "tel",
        width: "200rpx",
        type: "action"
    }, {
        title: "性别",
        key: "sex",
        width: "100rpx",
        type: "action"
    }, {
        title: "毕业学院",
        key: "college",
        width: "500rpx",
        type: "action"
    }, {
        title: "工作单位",
        key: "job",
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
    inputValue: ''
  },
  options: {},
  handleClickItem(e) {
      console.log(e);
      const { index, item } = e.detail.value;
      wx.showToast({
          title: `点击第${index + 1}行`
      });
  },
  userNameInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    //console.log(e.detail.value)
  },
  handleClickAction(e) {
      console.log(e);
      let str = '';
      const { type, index, item } = e.detail.value;
      if (type === 'name') {
          str = `第${index + 1}行姓名字段`;
      }
      else if (type === 'tel') {
          str = `第${index + 1}行电话字段`;
      }
      else if (type === 'sex') {
          str = `第${index + 1}行性别字段`;
      }else if (type === 'grade') {
          str = `第${index + 1}行年级字段`;
      }else if (type === 'college') {
          str = `第${index + 1}行学院字段`;
      }else if (type === 'region') {
          str = `第${index + 1}行籍贯字段`;
      }else if (type === 'job') {
          str = `第${index + 1}行工作字段`;
      }

      wx.showToast({
          title: str
      });
  },
  handleOnActionEvent(e) {
      console.log(e);
  },
  getList() {
      return __awaiter(this, void 0, void 0, function* () {
          try {
              const { pageNum, pageSize, pageCount, dataList, getListLoading } = this.data;
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
          }
          catch (e) {
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
      console.log(options+"Aloha");
      this.getList();
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
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexCollege: e.detail.value
    })
  },
  bindPickerMajorChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexMajor: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
})