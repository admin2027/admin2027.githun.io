const db = require('../db/index.js');

exports.regiter = (req, res) => {
    // console.log(req.body)
    // return res.send("okk")
    const sql=`select * from user`
    const sql1 = `INSERT INTO USER (userName,password,email,sex,image) VALUES (?,?,?,?,'http://127.0.0.1:8888/tmp_uploads/b01eb6d9e168a4fdbabce97f183a4b90.jpg')`
    db.query(sql,function(err,allbook){
        var obj = {
            data: {},
            meta: {
                status: '',
                msg: ''
            }
        }
        for(var i=0;i<allbook.length;i++){
            if(allbook[i].userName==req.body.username){
                obj.meta.status=201
                obj.meta.msg="用户名已经存在"
                return res.send(obj)
            }
        }
        db.query(sql1,[req.body.username,req.body.password,req.body.email,req.body.sex], function(err, results) {
            if (err) {
                obj.meta.status = 500;
                obj.meta.msg = '数据库查询错误1';
                return res.send(obj);
            } else {
                obj.meta.status=200
                obj.meta.msg="注册成功"
                return res.send(obj)
    
            }
    
        })
    })

}