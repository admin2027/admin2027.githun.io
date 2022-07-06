const express = require('express')
const app = express()
const cors = require('cors')
const joi = require('joi')
app.use(cors())
app.use(express.urlencoded({ extended: false }))
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//使用express.static内置中间件，可以进行静态资源托管，可以用tmp_uploads下的图片读取
app.use('/tmp_uploads', express.static('tmp_uploads'))
// 导入配置文件
const config = require('./config')
// 解析 token 的中间件
const expressJWT = require('express-jwt')
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
// app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\/private\/v1\/login/] }))
app.use((req, res, next) => {
    res.ResData = function(err, status = 1, data = {}) {
        res.send({
            data,
            meta: {
                status,
                msg: err
            }
        })
    }
    next()
})
//管理员登录
const managerLogin = require('./router/managerLogin.js')
app.use('/api/private/v1', managerLogin)
//管理员列表数据
const manager=require('./router/manager.js')
app.use('/api/private/v1',manager)
//所有图书请求
const booksList=require('./router/booksList.js')
app.use("/api/private/v1",booksList)
//用户账号请求
const usersList=require("./router/userList")
app.use("/api/private/v1",usersList)
const uploadRouter = require('./router/upload.js')
app.use('/api/private/v1', uploadRouter)
const addBookRouter=require("./router/addBook.js")
app.use("/api/private/v1",addBookRouter)
const Charpter=require("./router/charpter.js")
app.use("/api/private/v1",Charpter)
const userLogin=require('./router/userLogin.js')
app.use("/api/private/v1",userLogin)
const regiter=require("./router/regiter")
app.use("/api/private/v1",regiter)
const bookshelf=require('./router/bookshelf.js')
app.use('/api/private/v1',bookshelf)
const Class=require('./router/class.js')
app.use('/api/private/v1',Class)
const Auther=require('./router/auther.js')
app.use('/api/private/v1',Auther)
app.use
app.listen(8888, function() {
    console.log('success')
})

app.use(function(err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.send(err)
        // 未知错误
    res.send(err)
})
// app.listen(8888, function() {
//     console.log('success')
// })