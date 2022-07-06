const express = require('express')
const router = express.Router()
const bookshelf=require("../router_handler/bookshelf.js")
//根据双id删除指定收藏
router.get("/deleteShelfBook/:userid/:bookid",bookshelf.deleteShelfBook)
//根据userid，bookid,marking对评分进行增加和删除
router.post('/marking/:bookid/:userid/:marking',bookshelf.Marking)
//根据userid，bookid获取该读者对该图书的评分
router.get('/marking/:bookid/:userid',bookshelf.getMarking)
//获取所有用户收藏信息
router.get('/getAllbooshelf',bookshelf.getAllBookshelf)
module.exports = router