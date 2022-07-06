const express = require('express')
const router = express.Router();
const manegerLogin = require('../router_handler/manegerLogin.js')

const expressJoi = require('@escook/express-joi')
    // 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')
router.post('/login/manager', expressJoi(reg_login_schema), manegerLogin.login)

module.exports = router