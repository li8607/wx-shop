// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

const { templateId } = require('key.json')

// 云函数入口函数
exports.main = async (event, context) => {
  const res = await db.collection('order').where({
    _id: _.in(event.ids)
  }).update({
    data: {
      type: 2
    }
  })
  try {
    const send = await cloud.openapi.subscribeMessage.send({
      touser: event.userInfo.openapi,
      page: 'pages/order/order',
      lang: 'zh_CN',
      data: {
        number1: {
          value: '887218237238'
        },
        phrase12: {
          value: '待收货'
        },
        thing15: {
          value: '你订购的商品已发货，请耐心等待收取～'
        }
      },
      templateId: templateId,
      miniprogramState: 'developer'
    })
    console.log(send)
  } catch (error) {
    console.log(err)
  }
  return res
}