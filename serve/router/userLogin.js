const express = require('express')
const router = express.Router();
const userLogin = require('../router_handler/userLogin')
router.post('/login/user', userLogin.login)
module.exports = router