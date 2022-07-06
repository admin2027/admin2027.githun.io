const express = require('express')
const router = express.Router();
const fs = require("fs");
const multer = require("multer"); //multer处理文件上传的包
//临时上传目录
var upload = multer({ dest: 'tmp_uploads/' });
// 获取第三方配置文件
var upload_config = require("config").get("upload_config")
//upload.single(file)  表示接受一个名字叫做file的文件，所有上传的文件数据都保存在req.file 中
router.post("/upload", upload.single('file'), (req, res, next) => {
    let fileExArray = req.file.originalname.split(".")
    let ext = fileExArray[fileExArray.length - 1]
    var tmp_path = req.file.destination + req.file.filename + "." + ext;
    var url = upload_config.baseURL + tmp_path
    fs.rename(req.file.path, tmp_path, (err) => {
        if (err) return res.ResData("文件上传失败")
    })
    res.ResData("文件上传成功", 200, { tmp_path, url })
})

module.exports = router