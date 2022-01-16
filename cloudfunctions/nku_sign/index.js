// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

    // 获取openid
    const wxContext = cloud.getWXContext()
    result = {}
    data = {}
    if (wxContext.OPENID == undefined) {
        // 返回执行结果
        result.errCode = 1
        result.errMsg = '未能正确获取到用户的openid，请退出小程序重试'
        result.data = data
        return result
    }

    // 检查参数
    if (event.phoneNum == undefined) {
        // 返回执行结果
        result.errCode = 2
        result.errMsg = '未传必要参数，请重试'
        result.data = data
        return result
    }

    // 查找手机号是否在数据库
    // 实例化数据库
    const db = cloud.database()
    var user;
    await db.collection('AddrBook_GZ_NKU')
        .where({
            tel: event.phoneNum
        })
        .get()
        .then(res => {
            console.log(res.data)
            user = res.data[0]
        })
    if (user == undefined) {
        console.log('该手机号还不是校友会正式会员')
        // 返回执行结果
        result.errCode = 3
        result.errMsg = '抱歉！请先成为校友会正式会员'
        result.data = data
        return result
    }
    if (user.openid != undefined) {
        console.log('该手机号已被使用')
        // 返回执行结果
        result.errCode = 4
        result.errMsg = '该手机号已被使用！请联系管理员'
        result.data = data
        return result
    }

    console.log('该用户是校友会正式会员')
    // 更新openid
    await db.collection('AddrBook_GZ_NKU')
        .where({
            tel: event.phoneNum
        })
        .update({
            data: {
                // 插入最新openid
                openid: wxContext.OPENID,
            }
        })
        .then(res => {
            console.log('注册成功')
            console.log(res)
            result.errCode = 0
            result.errMsg = '恭喜！注册成功~'
            result.data = data
        })
    return result
}