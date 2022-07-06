const express = require('express')
const router = express.Router();
const regiter = require('../router_handler/regiter')
router.post('/regiter',  regiter.regiter)

module.exports = router