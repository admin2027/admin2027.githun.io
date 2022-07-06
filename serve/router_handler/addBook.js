const db = require('../db/index.js');
exports.addBook= function(req,res){
    if(req.body.name==""||req.body.text==""||req.body.auther==""||req.body.class==""||req.body.img==""){
        return res.send("关键数据为空，添加失败")
    }
    console.log(req.body)
    let sql=`INSERT INTO allbook (NAME, TEXT,class,img,auther) VALUES (?,?,?,?,?)`
    db.query(sql,[req.body.name,req.body.text,req.body.class,req.body.img,req.body.auther],function(err,data){
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
            obj.meta.status=200
            obj.meta.msg="添加图书成功"
            return res.send(obj)
        }
    })
}
//根据userid，bookid添加收藏
//前端已经确定此时是登录状态
exports.addbookshelf=function(req,res){
    console.log(req.params)
    let sql1=`SELECT * FROM bookshelf WHERE userId=? && bookId=?`
    var obj = {
        data: '',
        meta: {
            status: '',
            msg: ''
        }
    }
    db.query(sql1,[req.params.userid,req.params.bookid],function(err,data){
        if(err){
            obj.meta.status = 500;
            obj.meta.msg = "数据库查询错误";
            // console.log(obj.meta.msg)
            // console.log("a")
            return res.send(obj);
        }else{
            if(data.length==1){
                //图书已收藏
                obj.meta.status=500;
                obj.meta.msg="该图书已收藏"
                return res.send(obj)
            }else{
                //图书未收藏
                let sql=`INSERT INTO bookshelf (userid, bookid,charpterId,classifyId) VALUES (?,?,?,?)`
                db.query(sql,[req.params.userid,req.params.bookid,req.params.charpterid,req.params.classifyId],function(err,data){
                    if(err){
                        obj.meta.status = 500;
                        obj.meta.msg = "数据库查询错误";
                        // console.log(obj.meta.msg)
                        // console.log("a")
                        return res.send(obj);
                    }else{
                        obj.meta.status=200
                        obj.meta.msg="添加收藏成功"
                        // console.log(obj.meta.msg)
                        // console.log("b")
                        return res.send(obj)
                    }
                })
            }
        }

    })
    
}