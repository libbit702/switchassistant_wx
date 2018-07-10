//onsale.js
//获取应用实例
const app = getApp()

Page({
  data: {
    page:1,
    pageLoading:false,
    pageHasMore:true,
    test: []
  },
  loadListData: function() {
    var that = this;
    that.data.pageLoading = true;
    console.log('page', that.data.page);
    wx.request({
      url: 'https://www.fatedestiny.fun/',
      data: {
        c: 'fd_admin',
        m: 'list_nintendo_games',
        category:'onsale',
        page:that.data.page,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.data.pageLoading = false;
        if (res.data.list.length > 0) {
          that.setData({
            test: that.data.test.concat(res.data.list)
          });
        } else {
          that.data.pageHasMore = false;
        }
      },
      fail: function () {
        that.data.pageLoading = false;
      }
    })
  },
  onLoad: function () {
    this.loadListData();
  },
  searchScrollLower: function () {
    let that = this;
    if (!that.data.pageLoading && that.data.pageHasMore) {
      that.setData({
        page: that.data.page + 1
      });
      that.loadListData();
    }
  }
})
