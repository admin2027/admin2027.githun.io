const express = require('express')
const router = express.Router()
const charpter=require("../router_handler/charpter.js")
//根据bookid查找图书
router.get("/idfindbook/:id",charpter.IdFondBook)
//查找bookid下的章节内容，包括bookid,chapterid,chapterName   不获取章节内容 适用于list
router.get("/idfindcharpter/:id",charpter.IdFondCharpter)
//根据双id查找一个章节
router.get("/findAchapter/:bookid/:chapterId",charpter.findAchapter)
router.delete("/deletecharpter/:bookid/:chapterId",charpter.deleteCharpter)
router.post("/addchapter",charpter.addChapter)
//根据双id修改章节
router.post('/changeChapter',charpter.changeChapter)
//更改收藏图书的书签
router.post('/changeBookMark/:userId/:bookid/:charpterId',charpter.changeBookMark)
module.exports = router