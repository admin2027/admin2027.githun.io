const db = require('../db/index.js');
exports.deleteShelfBook= function(req,res){
    // console.log(req.params)
    // return res.send("opk")
    let sql="delete from bookshelf where userid=? and bookid=?"
    db.query(sql,[req.params.userid,req.params.bookid],function(err,data){
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
            obj.meta.msg="删除收藏图书成功"
            return res.send(obj)
        }
    })
}
exports.Marking=function(req,res){
    // console.log(req.params)
    // return res.send("ok")
    var bookid=req.params.bookid
    var userid=req.params.userid
    var marking=req.params.marking
    let sql=`select * from marking where bookid=? and userid=?`
    db.query(sql,[bookid,userid],function(err,data){
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

            if(data.length!=0){
                //已经存在评论
                let sql1=`UPDATE marking SET marking=? WHERE userid=? AND bookid=?`
                db.query(sql1,[marking,userid,bookid],function(err,data){
                    // console.log(req.params)
                    if(err){
                        obj.meta.status=500,
                        obj.meta.msg="数据库插入错误"
                        return res.send(obj)
                    }else{
                        obj.meta,status=200
                        obj.meta.msg="评分更改成功"
                        return res.send(obj)
                    }
                })
            }else{
                //第一次评论
                let sql2=`INSERT INTO marking (bookid,userid,marking) VALUES (?,?,?)`
                db.query(sql2,[bookid,userid,marking],function(err,data){
                    if(err){
                        obj.meta.status=500
                        obj.meta.msg="数据库插入错误"
                        return res.send(obj)
                    }else{
                        obj.meta.status=200
                        obj.meta.msg="评分成功"
                        return res.send(obj)
                    }
                })
            }
        }
    })
}
exports.getMarking=function(req,res){
    // console.log(req.params)
    // return res.send("ok")
    let sql=`select * from marking where bookid=? and userid=?`
    db.query(sql,[req.params.bookid,req.params.userid],function(err,data){
        var obj = {
            data: '',
            meta: {
                status: '',
                msg: ''
            }
        }
        if(err){
            obj.meta.status=500
            obj.meta.msg="数据库查询错误"
            return res.send(obj)
        }else{
            obj.data=data
            obj.meta.status=200
            obj.meta.msg="评分查询成功"
            return res.send(obj)
        }

    })
}
exports.getAllBookshelf=function(req,res){
    // console.log("aaa")
    // return res.send("ok")
    let sql=`select * from bookshelf`
    db.query(sql,function(err,data){
        var obj = {
            data: '',
            meta: {
                status: '',
                msg: ''
            }
        }
        if(err){
            obj.meta.status=500
            obj.meta.msg="数据库查询错误"
            return res.send(obj)
        }else{
            obj.data=data
            obj.meta.status=200
            obj.meta.msg="查询用户收藏信息成功"
            return res.send(obj)
        }
    })
}