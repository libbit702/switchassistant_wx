//index.js

const Promise = require('../../utils/es6-promise.auto')
const util = require('../../utils/util')

//获取应用实例
const app = getApp()

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    page:1,
    pageLoading:false,
    pageHasMore:true,
    games: [],
    searchs:[]
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },

  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },

  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });

    if (this.data.inputVal.length == 0) {
      return;
    }
    var that = this;

    wx.request({
      url: 'https://www.fatedestiny.fun/',
      data: {
        c: 'fd_admin',
        m: 'search',
        q: e.detail.value,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.list.length > 0) {
          that.setData({
            searchs: res.data.list
          });
        }
      },
      fail: function () {
      }
    })
  },
  loadListData: function() {
    var that = this;
    that.data.pageLoading = true;
    // console.log('page', that.data.page);
    wx.request({
      url: 'https://www.fatedestiny.fun/',
      data: {
        c: 'fd_admin',
        m: 'list_nintendo_games',
        page:that.data.page,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.data.pageLoading = false;
        if (res.data.list.length > 0) {
          that.setData({
            games: that.data.games.concat(res.data.list)
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
    // this.loadShareImage();
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
