const express = require('express')
const router = express.Router()
const AutherList=require("../router_handler/auther.js")
//获取作者列表
router.get("/getauthersList",AutherList.getautherlist)
//添加作者
router.post("/addAuther",AutherList.addAuther)
//修改作者
router.post("/changeAuther",AutherList.changeAuther)
//获取作者信息
router.get("/getAuther/:autherId",AutherList.getauhter)
//根据作者名字获取图书
router.get("/getAutherBook/:name",AutherList.getAutherBook)
//删除作者
router.delete("/deleteAuther/:id",AutherList.deleteAuther)
module.exports = router