// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('加入购物车', event)
  let data = event.data
  data.openid = event.userInfo.openid
  data.type = 0
  const good = (await db.collection('goods').where({
    _id: data.commodityId
  }).field({
    title:true,
    price:true,
    img:true
  }).get()).data
  if(good.length != null) {
    data.title = good[0].title
    data.price = good[0].price
    data.img = good[0].img
    const res = await db.collection('order').add({
      data:data
    })
    return res._id
  }else {
    return null
  }
}