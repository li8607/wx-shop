// pages/submit/submit.js
const app = getApp()
var that = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    deliveryCost: 0,
		deliveryType: 'fast',
		addressData: {
			name: '张三',
			phone: '18912345678',
			address: "深圳市南山区"
		}
  },

  submitorder() {
    wx.requestSubscribeMessage({
      tmplIds: ['Ael80Bmam7Lyj3AVwUdESQhfUqi22BJ4f4hGuMkWu3o'],
      success (res) {
				console.log(res)
				app.submitorder({
					ids: that.data.ids,
					deliveryType: that.data.deliveryType,
					addressData: that.data.addressData,
					remark: that.remark,
					success() {
						wx.switchTab({
							url: '../order/order',
						})
					}
				})
			}
    })
  },

	onDeliveryTypeChange(e) {
		this.setData({
			deliveryType: e.detail.value
		})
  },
  
	getremark(e) {
		that.remark = e.detail.value;
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    let ids = wx.getStorageSync('ids')
    app.getBillList({
      ids: ids,
      success(list) {
        const totalAmount = list.reduce((amount, good) => {
          return (amount + good.number * good.price);
        }, 0)
        that.setData({
          ids: ids,
					billNum: list.length,
					billList: list,
					totalAmount
        })
      }
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