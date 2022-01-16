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
    // 查找openid是否在数据库中
    // 实例化数据库
    const db = cloud.database()
    var user;
    await db.collection('AddrBook_GZ_NKU')
        .where({
            openid: wxContext.OPENID
        })
        .get()
        .then(res => {
            console.log(res.data)
            user = res.data[0]
        })
    if (user == undefined) {
        console.log('该用户还未注册')
        // 返回执行结果
        result.errCode = 2
        result.errMsg = '抱歉！请先注册'
        result.data = data
        return result
    }

    // 检查参数
    if (event.name == undefined || event.job == undefined || event.tel == undefined ||
        event.sex == undefined || event.college == undefined || event.major == undefined ||
        event.grade == undefined || event.region == undefined) {
        // 返回执行结果
        result.errCode = 3
        result.errMsg = '未传必要参数，请重试'
        result.data = data
        return result
    }

    await db.collection('AddrBook_GZ_NKU')
        .where({
            openid: wxContext.OPENID
        })
        .update({
            data: {
                name: event.name,
                job: event.job,
                tel: event.tel,
                sex: event.sex,
                grade: event.grade,
                major: event.major,
                college: event.college,
                region: event.region,
            }
        })
        .then(res => {
            console.log('更新成功')
            console.log(res)
        })
    result.errCode = 0
    result.errMsg = '修改资料成功'
    result.data = data
    return result
}