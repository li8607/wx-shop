// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const list = (await db.collection('goods').field({
    title:true,
    price:true,
    origin:true,
    img:true
  }).get()).data
  console.log("商品列表：", list)
  return list
}