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
    hasLocation:null,
    address_now:null,
    hiden:true,
    value_start_place:null,
    address_end:null
  },

  //获取用户输入的地址
  start_place_input:function(e){
    wx.navigateTo({
      url: '../search_place/search_place',
    })
  },

  end_place_input:function(e){
    wx.navigateTo({
      url: '../search_place2/search_place2',
    })
  },

  //获取用户当前地址
  getLocalAddress:function(e){
    wx.showToast({
      title: 'wait',
      icon: 'loading'
    })

    console.log(e);
    var that = this;
    wx.getLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          location: {
            longitude: res.longitude,
            latitude: res.latitude
          },
          latitude_now:res.latitude,
          longitude_now:res.longitude,
        })
        wx.hideToast();
        wx.openLocation({
          longitude: Number(res.longitude),
          latitude: Number(res.latitude)
         })

        app.latitude_now = res.latitude;
        app.longitude_now = res.longitude;

        console.log(app.latitude_now);
        console.log(app.longitude_now);
        
      //逆地址解析
        demo.reverseGeocoder({
          location:{
            latitude : app.latitude_now,
            longitude : app.longitude_now
          },
          success:function(result){
            console.log(result);
            app.address_now = result.result.address;
            that.setData({
              address_now: result.result.address.toString()
            })
            console.log(that.data.address_now);
            
          }
          
        })
      },
       }) 

        //显示确认地址窗口
        that.setData({
          hiden:false
        })
      },

  //确认地址后的操作
  address_confirm: function() {
    var that = this;
    that.setData({
      hiden:true
    })
  },

  //选择重置地址后的操作
  address_reset: function(){
    var that = this;
    that.setData({
      hiden:true
    })
  },

  //重置终点地址栏
  endPlace_reset: function(){
    var that = this;
    that.setData({
      address_end:null
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
  onShow: function (options) {
   
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