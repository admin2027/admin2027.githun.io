const db = require('../db/index.js');
//根据bookid查找图书内容
exports.IdFondBook= function(req,res){
//    return res.send("ok")
// console.log(req.params)
    let sql=`SELECT * FROM noveln.allbook INNER JOIN noveln.classify ON (allbook.class = classify.class) WHERE  noveln.allbook.id=?`
    db.query(sql,req.params.id,function(err,data){
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
//根据书id查找图书下的所有章节，不带text
exports.IdFondCharpter=function(req,res){
    // console.log(req.params)
    // return res.send("ok")
    let sql=`select bookid,chapterId,charpterName from chapter where bookId=?`
    db.query(sql,req.params.id,function(err,data){
        // console.log(data)
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
            obj.meta.msg="查找章节成功"
            return res.send(obj)
        }
    })
}   
exports.deleteCharpter=function(req,res){
    // console.log(req.params)
    // return res.send("ok")
    let sql="DELETE FROM chapter WHERE bookid=? AND chapterId=?"
    db.query(sql,[req.params.bookid,req.params.chapterId],function(err,data){
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
            obj.meta.msg="删除章节成功"
            return res.send(obj)
        }
    })
}
//添加章节
exports.addChapter=function(req,res){
    // console.log(req.body)
    // return res.send("okkk")
    let sql="INSERT INTO chapter (bookid, chapterId,chapterText,charpterName) VALUES (?,?,?,?)"
    db.query(sql,[req.body.bookId,req.body.chapterId,req.body.chapterText,req.body.charpterName],function(err,data){
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
            obj.meta.msg="增加章节成功"
            return res.send(obj)
        }
    })
}
//根据双id查找一个章节，带有text
exports.findAchapter=function(req,res){
    // console.log(req.params)
    // return res.send("okk")
    let sql="select * from chapter where bookid=? and chapterId=?"
    db.query(sql,[req.params.bookid,req.params.chapterId],function(err,data){
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
            obj.meta.msg="查找章节成功成功"
            return res.send(obj)
        }
    })
}
//根据双id修改章节
exports.changeChapter=function(req,res){
    // console.log(req.body)
    // return res.send("okasdasd")
    let sql=`UPDATE chapter SET chapterText=?,charpterName=? WHERE bookid=? and chapterId=?`
    db.query(sql,[req.body.chapterText,req.body.charpterName,req.body.bookid,req.body.chapterId],function(err,data){
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
            obj.meta.msg="修改章节成功"
            return res.send(obj)
        }
    })
}
//更改收藏图书书签
exports.changeBookMark=function(req,res){
    // console.log(req.params)
    // return res.send("ok")
    let sql=`UPDATE bookshelf SET charpterId=? WHERE userId=? AND bookId=?`
    db.query(sql,[req.params.charpterId,req.params.userId,req.params.bookid],function(err,data){
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
            obj.meta.msg="更新书签成功"
            return res.send(obj)
        }
    })
}