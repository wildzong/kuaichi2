//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var AV = require('./lib/av-weapp-min.js');

AV.init({
  appId: 'kT0rezjxRTEbMi9Fk5wY3AMV-gzGzoHsz',
  appLey: 'obLEMQ8RRtS48in4dmA0faqJ',
});

App({
  onLaunch: function () {

    qcloud.setLoginUrl(config.service.loginUrl)

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    data: [
      { name: '张三', src: '../../images/11.png', start: '建设路56号3幢28号', destination: '一环路东一段240号', price: '3', state: 'wait' },
      { name: '李四', src: '../../images/12.png', start: '大安西路20号', destination: '一环路西二段20号', price: '4', state: 'wait' },
      { name: '王五', src: '../../images/13.png', start: '建设路54号', destination: '人民南路西一段26号', price: '4.5', state: 'wait' },
      { name: '刘六', src: '../../images/14.png', start: '二环路东二段29号', destination: '成华区建设北路709号', price: '3', state: 'wait' },
      { name: '吴七', src: '../../images/15.png', start: '建设路5454号', destination: '人民南路西一段75号', price: '4.5', state: 'ing' },
      { name: '沈八', src: '../../images/16.png', start: '建设路7346号', destination: '人民南路西一段64365号', price: '4.5', state: 'done' },
      { name: '赵九', src: '../../images/17.png', start: '一环路54号', destination: '建设路西一段26号', price: '4.5', state: 'done' }
    ]
  },
  money: 45,
  latitude_now: null,
  longitude_now: null,
  latitude_search: null,
  longitude_search: null,
  address_now: null

})