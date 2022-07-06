const express = require('express')
const router = express.Router()
const Class=require("../router_handler/class.js")
//根据分类名称查找图书
router.get("/classBookList/:classid",Class.classBook)
module.exports = router