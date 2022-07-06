const express = require('express')
const router = express.Router()
const Manager = require('../router_handler/manager.js')
router.get('/getManagerList', Manager.getManagerList)
const DeleteManager=require("../router_handler/manager")
router.delete('/deleteManager/:id',DeleteManager.deleteManager)
router.get("/getAllClass",Manager.getAllClass)
router.get("/getoption1",Manager.getOption1)
router.get("/getoption2",Manager.getOption2)
module.exports = router