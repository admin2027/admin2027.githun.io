const express = require('express')
const router = express.Router()
const addBook=require("../router_handler/addBook.js")
router.post("/addBook/",addBook.addBook)
//根据userid，bookdid添加用户收藏
router.post('/addbookshelf/:userid/:bookid/:charpterid/:classifyId',addBook.addbookshelf)
module.exports = router