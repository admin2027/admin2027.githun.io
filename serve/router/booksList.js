const express = require('express')
const router = express.Router()
const BookesList=require("../router_handler/booksList.js")
router.get("/getbooksList",BookesList.getBooksList)
//历史演义
router.get("/getlsyyList",BookesList.getlsyyList)
//英雄传奇
router.get("/getyxcqList",BookesList.getyxcqList)
//神话鬼怪
router.get("/getggshList",BookesList.getggshList)
//世态人情
router.get("/getstrqList",BookesList.getstrqList)
//讽刺悬疑
router.get("/getfcxyList",BookesList.getfcxyList)
//学术杂书
router.get("/getxszsList",BookesList.getxszsList)
//杂剧戏曲
router.get("/getzjxqList",BookesList.getzjxqList)
//笔记日记
router.get("/getbjrjList",BookesList.getbjrjList)
//古典武侠
router.get("/getgdwxList",BookesList.getgdwxList)
router.post("/changeBook",BookesList.changeBook)
router.delete("/deleteBook/:id",BookesList.deleteBook)
//根据书名或者作者查找图书
router.post("/searchBook",BookesList.searchBoook)
module.exports = router