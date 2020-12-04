// pages/detail/detail.js
const app = getApp()
var that = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    interval: 5000,
    duration: 1000,
    loading: true,
    detail: {},
    buyNumMin: 1,
    buyNumMax: 5,
    billNum: 0,
    bill: {
      number: 1
    },
    shopType: '',
    hideShopPopup: true,
    imgheight: 0
  },

  buyNow(){
    if(this.data.bill.options == null) {
      wx.showToast({
        title: '请选择类型',
        icon: 'none'
      })
      return
    }
    this.renderBillOptionToList()
    app.addShopCart({
      data: Object.assign({}, that.data.bill, {
        commodityId: that.data.detail._id
      }),
      cart: false,
      success() {
        that.closePopupTap()
        wx.navigateTo({
          url: '../submit/submit',
        })
      },
      fail() {
        wx.showModal({
          title: "抱歉",
					content: "购物车加入失败，请稍后再试",
          cancelColor: 'false',
        })
      }
    })

  },

  toBuy() {
    this.setData({
      shopType: 'buy',
      hideShopPopup: false
    })
  },

  imgload(e) {
    let height = e.detail.height / e.detail.width * 750
    this.setData({
      imgheight: height
    })
  },

  goShopCart() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },

  toAddShopCart() {
    this.setData({
      shopType: 'addShopCart',
      hideShopPopup: false
    })
  },

  labelItemTap(e) {
    console.log('选择类型：', e)
    let dataset = e.target.dataset || {}
    let options = Object.assign({}, this.data.bill.options)
    options[dataset.key] = dataset.idx
    this.setData({
      'bill.options': options
    })
  },

  addShopCart() {
    if(this.data.bill.options == null) {
      wx.showToast({
        title: "请选择类型",
        icon: 'none'
      })
      return
    }
    this.renderBillOptionToList()
    wx.showLoading({
      title: '加入购物车中'
    })
    app.addShopCart({
      data: Object.assign({}, this.data.bill, {
        commodityId: this.data.detail._id
      }),
      cart: false,
      success() {
        that.closePopupTap()
        wx.navigateTo({
          url: '../submit/submit',
        })
      },
      fail() {
        wx.showModal({
          title: '抱歉',
          content: '购物车加入失败，请稍后再试',
          showCancel: false
        })
      }
    })
  },

  closePopupTap() {
    this.setData({
      hideShopPopup: true
    })
  },

	numMinusTap() {
		if (this.data.bill.number > this.data.buyNumMin) {
			this.setData({
				'bill.number': --this.data.bill.number
			})
		}
	},

	numAddTap() {
		if (this.data.bill.number < this.data.buyNumMax) {
			this.setData({
				'bill.number': ++this.data.bill.number
			})
		}
	},

  renderBillOptionToList() {
  	let optionList = []
		let options = this.data.bill.options
		Object.keys(options).forEach(key => {
			this.data.detail.options.forEach(option => {
				if (option.key === key) {
					optionList.push({
						name: option.name,
						value: option.value[options[key]]
					})
				}
			})
		})
		this.setData({
			'bill.options': optionList
		})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options:", options)
    that = this
    app.getGoodSDetail({
      id: options.id,
      success: function(res) {
        console.log('商品详情：', res)
        that.setData({
          loading: false,
          detail: res
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