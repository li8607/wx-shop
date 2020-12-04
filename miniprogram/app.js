//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'abc-5gj73vxe94211025',
        traceUser: true,
      })
    }
    this.globalData = {}
  },

  /**
   * 获取商品列表 
   */
  getGoodSList: function(obj) {
    wx.cloud.callFunction({
      name:'getGoodlist',
      success: function(res) {
        if(obj != null && obj.success != null) {
          obj.success(res.result)
        }
      }
    })
  },

  /**
   * 获取商品详情
   */
  getGoodSDetail: function(obj) {
    wx.cloud.callFunction({
      name: 'getGooddetail',
      data: {
        id: obj.id
      },
      success: function(res) {
        if(obj != null && obj.success != null) {
          obj.success(res.result)
        }
      }
    })
  },

  /**
   * 加入购物车
   */
  addShopCart: function(obj) {
    let data = obj.data
    wx.cloud.callFunction({
      name: 'addShopcart',
      data:{data},
      success(res) {
        if(obj != null && obj.success != null) {
          if(obj.cart == false) {
            wx.setStorageSync('ids', [res.result])
          }
          obj.success()
        }
      }
    })
  },

  /**
   * 获取购物车列表
   */
  getShopCart(obj){
    wx.cloud.callFunction({
      name: "getShopcart",
      data: {
        cart: obj.cart,
        done: obj.done
      },
      success(res) {
        if(obj != null && obj.success != null) {
          obj.success(res.result)
        }
      }
    })
  },

  /**
   * 删除购物车 
   */
  delShopCart(obj) {
    wx.cloud.callFunction({
      name: 'delShopcart',
      data: {
        ids: obj.ids
      },
      success(res) {
        if(obj != null && obj.success != null) {
          obj.success()
        }
      }
    })
  },

  /**
   * 购买列表
   */
  getBillList(obj) {
    wx.cloud.callFunction({
      name: 'getShopcart',
      data: {
        ids: obj.ids
      },  
      success(res) {
        if(obj != null && obj.success != null) {
          obj.success(res.result)
        }
      }
    })
  },

  submitorder(obj) {
    wx.cloud.callFunction({
      name: 'submitShopcart',
      data: {
        ids:obj.ids,
        deliveryType:obj.deliveryType,
        remark:obj.remark,
        addressData:obj.addressData
      },
      success(res) {
        if (obj != null && obj.success != null) {
          obj.success();
        }
      }
    })
  }
})
