// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    // 获取openid
    const wxContext = cloud.getWXContext()
    result = {}
    data = {}
    const MAX_LIMIT = 100
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

    condition = {}
    if (event.college != undefined && event.college != "" && event.college != "全部") {
        condition.college = event.college
    }
    if (event.major != undefined && event.major != "" && event.major != "全部") {
        condition.major = event.major
    }
    if (event.grade != undefined && event.grade != "" && event.grade != "1980") {
        condition.grade = event.grade
    }
    if (event.name != undefined && event.name != "" && event.name != "") {
        condition.name = event.name
    }

    // 先取出集合记录总数
    const countResult = await db.collection('AddrBook_GZ_NKU').where(condition).count()
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    // 承载所有读操作的 promise 的数组
    var tasks = []
    for (let i = 0; i < batchTimes; i++) {
        await db.collection('AddrBook_GZ_NKU')
            .where(condition)
            .orderBy('tel', 'desc')
            .skip(i * MAX_LIMIT)
            .limit(MAX_LIMIT)
            .get()
            .then(res => {
                console.log('第' + i + '页')
                console.log(res.data)
                tasks = tasks.concat(res.data)
            })
    }
    if (tasks.length <= 0) {
        result.errCode = 3
        result.errMsg = '未查到有效数据'
        result.data = data
        return result
    }
    // 等待所有
    result.errCode = 0
    result.errMsg = "查询成功"
    data = tasks
    result.data = data
    return result
}