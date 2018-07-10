//index.js

const Promise = require('../../utils/es6-promise.auto')
const util = require('../../utils/util')

//获取应用实例
const app = getApp()

Page({
  data: {
    game: null,
    game_id:null,
    name:''
  },
  loadDetailData: function () {
    var that = this;
    wx.request({
      url: 'https://www.fatedestiny.fun/',
      data: {
        c: 'fd_admin',
        m: 'single_nintendo_game',
        id: that.data.game_id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log('detail callback', res);
        if (res.data.list.length > 0) {
          that.setData({
            game: res.data.list[0],
          });
        }
      },
      fail: function () {
      }
    })
  },
  onLoad: function (options) {

    var game_id = options.id;
    // wx.setNavigationBarTitle({ title: name });

    this.setData({
      // name: name,
      game_id: game_id,
    });
    
    this.loadDetailData();
  }
})
