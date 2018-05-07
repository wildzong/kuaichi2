// 引入SDK核心类
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');

var app = getApp();
// 实例化API核心类
var demo = new QQMapWX({
  key: 'VUKBZ-ZRECS-HZZOZ-66QCD-XIMRE-NPBXU'
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:null,
    longitude:null,
    Place_of_Search:null,
    markers:[]
  },

  //用户点击搜索按钮时
  search_address: function(e){
    var that = this;
    console.log(e.detail.value.search_place);
    that.setData({
      Place_of_Search:e.detail.value.search_place
    })

    console.log(that.data.Place_of_Search);

    //调用地图的搜索接口
    demo.geocoder({
      address: that.data.Place_of_Search,
      success: function (res) {
        console.log(res);
        that.setData({
          latitude:res.result.location.lat,
          longitude: res.result.location.lng,
          markers:[{
              iconPath: "../../images/marker-512.png",
              latitude: res.result.location.lat,
              longitude: res.result.location.lng,
              width:50,
              height:50
          }]
        })
        console.log(that.data.markers);
      }
    });
  },

  //点击确认时
  marker_tap: function(event){
    var that = this;
    var address_now = event.currentTarget.dataset.Place_of_Search;
    console.log(that.data.Place_of_Search);

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      address_end: that.data.Place_of_Search
    })

    wx.showLoading({
      title: '稍等',
    })

    wx.navigateBack();
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this;
    //获取用户地址
    wx.getLocation({
      success: function(res) {
        console.log(res);
          that.setData({
            latitude:res.latitude,
            longitude:res.longitude
          })
      },
    })
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