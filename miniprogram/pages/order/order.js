// pages/order/order.js
const app = getApp()
var that = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNum: 0,
		orderList: [],
		statusType: ["进行中", "已完成"],
		currentType: 0,
		tabClass: ["", "", "", "", ""],
		payButtonClicked: false,
  },

  toPayTap(e) {
    wx.showModal({
      title: '模拟付款',
      content: '是否付款，付款不可回退，请确认',
      success(res) {
        if(res.confirm) {
          wx.showLoading({
            title: '付款中',
          })
          app.toPayTap({	
            ids: [e.currentTarget.dataset.id],
						success(res) {
							wx.hideLoading();
							that.onShow();
						}})
        }
      }
    })
  },

  toDoneOrder(e) {
    wx.showModal({
      title: '确认收货',
      content: '请确认货物是否收到？',
      success(res) {
				if (res.confirm) {
					wx.showLoading({
						title: '确认中',
					});
					app.toDoneOrder({
						ids: [e.currentTarget.dataset.id],
						success(res) {
							wx.hideLoading()
							that.onShow();
						}
					})
				}
			}
    })
  },

  cancelOrderTap(e) {
    wx.showModal({
      title: '确认删除',
      content: '删除后将不可以找回，请确认操作',
      success(res) {
        if(res.confirm) {
          wx.showLoading({
            title: '删除中',
          })
          app.delShopCart({
            ids: [e.currentTarget.dataset.id],
            success(res) {
              wx.hideLoading()
              that.onShow()
            }
          })
        }
      }
    })
  },

  statusTap: function (e) {
		const curType = e.currentTarget.dataset.index;
		this.data.currentType = curType
		this.setData({
			currentType: curType
		});
		this.onShow();
	},

  getOrderList() {
    wx.showNavigationBarLoading()
    app.getShopCart({
      cart: false,
      done: that.data.currentType,
      success(res) {
        that.setData({
					orderList: res
				});
				wx.hideNavigationBarLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
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
    wx.showNavigationBarLoading()
    this.getOrderList() 
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