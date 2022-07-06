const express = require('express')
const router = express.Router()
const UsersList=require("../router_handler/userList.js")
//获取管理员列表
router.get("/getusersList",UsersList.getUsersList)
//根据userid获取收藏图书
router.get("/getUsersBookShelf/:userId",UsersList.getUsersBookShelf)
//根据id删除用户
router.delete("/deleteUser/:userId",UsersList.deleteUser)
//根据id查找指定用户
router.get('/getUser/:userId',UsersList.getUser)
//改变用户信息
router.post("/changeUser",UsersList.changeUser)
//添加用户
router.post("/addUser",UsersList.addUser)
module.exports = router