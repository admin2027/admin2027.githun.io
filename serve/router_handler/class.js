const db = require('../db/index.js');

//根据双id修改章节
exports.classBook=function(req,res){
    // console.log(req.params)
    // return res.send("okasdasd")
    let sql=`SELECT * FROM noveln.allbook INNER JOIN noveln.classify ON (allbook.class = classify.class) WHERE  noveln.classify.classid=?`
    db.query(sql,req.params.classid,function(err,data){
        var obj = {
            data: '',
            meta: {
                status: '',
                msg: ''
            }
        }
        if(err){
            obj.meta.status = 500;
            obj.meta.msg = "数据库查询错误";
            return res.send(obj);
        }else{
            obj.data=data
            obj.meta.status=200
            obj.meta.msg="查找图书成功"
            return res.send(obj)
        }
    })
}