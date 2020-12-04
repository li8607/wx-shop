// pages/cart/cart.js
const app = getApp()
var that = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    billList: [],
		buyNumMin: 1,
		buyNumMax: 5,
		saveHidden: true,
		totalPrice: 0,
		selectedList: []
  },

  minusBtnTap(e) {
    let id = e.currentTarget.dataset.id 
    this.data.billList.forEach(bill => {
      if(bill._id === id) {
        if(bill.number > this.data.buyNumMin) bill.number--
      }
    })
    this.setData({
      'billList': this.data.billList
    })
  },

  addBtnTap(e) {
    let id = e.currentTarget.dataset.id
    this.data.billList.forEach(bill => {
      if(bill._id === id) {
        if(bill.number < this.data.buyNumMax) bill.number++
      }
    })
    this.setData({
      'billList': this.data.billList
    })
  },

  editTap() {
    this.setData({
      saveHidden: false
    })
  },

  saveTap() {
    this.setData({
      saveHidden: true
    })
  },

  toPayOrder() {
    wx.setStorageSync('ids', this.data.selectedList)
    wx.navigateTo({
      url: '/pages/submit/submit',
    })
  },

  deleteSelected() {
    const selectedList = this.data.selectedList
    let currentBillList = this.data.billList.filter(bill => !selectedList.includes(bill._id))
    this.setData({
    	'billList': currentBillList,
			'selectedList': []
    })
    app.delShopCart({
      list: currentBillList,
			ids: selectedList
    })
  },

  selectTap(e){
    let id = e.currentTarget.dataset.id
    if(this.data.selectedList.includes(id)) {
      let idx = this.data.selectedList.indexOf(id)
      this.data.selectedList.splice(idx, 1)
    }else {
      this.data.selectedList.push(id)
    }

    this.setData({
      'selectedList': this.data.selectedList
    }, () => {
      this.updateBillList()
      this.updateTotalPrice()
    })
  },

  onAllSelect() {
    let currentSelectedList = []
    if(this.data.selectedList.length === this.data.billList.length) {

    }else {
      currentSelectedList = this.data.billList.map(({
				_id
			}) => _id)
    }
    this.setData({
      'selectedList': currentSelectedList
    }, () => {
      this.updateBillList()
      this.updateTotalPrice()
    })
  },

  updateBillList() {
    this.data.billList.forEach(bill => {
      if (this.data.selectedList.includes(bill._id)) bill.active = true
			else bill.active = false
    })
    this.setData({
      'billList': this.data.billList
    })
  },

  updateTotalPrice() {
    let res = 0;
		this.data.billList.forEach(bill => {
			if (this.data.selectedList.includes(bill._id)) res += Number(bill.price) * Number(bill.number)
		});
		this.setData({
			totalPrice: res
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
    app.getShopCart({
      success(list) {
        wx.hideNavigationBarLoading()
        that.setData({
            billList: list
          })
      }
    })
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