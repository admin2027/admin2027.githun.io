const db = require('../db/index.js');
//获取管理员列表
exports.getautherlist = async function(req, res) {
    // console.log(req.query)
    // return res.send("ok")
    const util = require('util');
    const query = util.promisify(db.query).bind(db);
    // 执行 SQL 语句失败
    let obj = {
        meta: {
            msg: "",
            status: ''
        },
        data: {}
    }
    let searchName=req.query.searchName
    let pagenum=req.query.pagenum
    let pagesize=req.query.pagesize
    // console.log(req.query)
    pagenum = Number(pagenum);
    pagesize = Number(pagesize);
    // console.log(pagenum)
    // console.log(pagesize)
    let sql1; //查询语句1 查询总条数
    let sql2; //查询语句2 查询符合条件的
    let sqlerr = '' //存储数据库查询错误信息
        // 总条数查询
    if (searchName) {
        sql1 = `select * from auther where name like'%${searchName}%'`;
    } else {
        sql1 = `select * from auther`;
    }
    //分页结果查询
    let startPage = (pagenum - 1) * pagesize
    // console.log(searchName)
    if (searchName) {

        sql2 = `select * from auther where name like '%${searchName}%'  limit ${startPage},${pagesize}`;
    } else {
        sql2 = `select * from auther  limit ${startPage},${pagesize}`;
    }

    try {
        let results = await query(sql1)
        obj.data.total = results.length;
        obj.data.pagenum = pagenum;

    } catch (err) {
        sqlerr = err;
    }

    try {
        let results = await query(sql2)
        obj.data.goods = results;
    } catch (err) {
        sqlerr = err;
    }
    // console.log(obj)

    // //整理需要传送给前端的数据
    if (sqlerr) {
        // console.log(sqlerr)
        obj.meta.msg = sqlerr;
        obj.meta.status = 500;
        return res.send(obj)
    } else {
        obj.meta.msg = "获取商品列表成功";
        obj.meta.status = 200
        // console.log(obj)
        return res.send(obj)
    }

}
exports.addAuther=function(req,res){
    // console.log(req.body)
    // return res.send("ok")
    var obj = {
        meta: {
            msg: "",
            status: ''
        },
        data: {}
    }
    var name=req.body.params.name
    var text=req.body.params.text
    let sql=`select * from auther where name=?`
    db.query(sql,req.body.params.name,function(err,data){
        if(err){
            obj.meta.msg="数据库错误"
            obj.meta.status=500
            return res.send(obj)
        }else{
            // 查找语句为报错
            if(data.length!==0){
                // 作者已经存在
                obj.meta.msg="该作者已存在"
                obj.meta.status="500"
                return res.send(obj)
            }else{
                //作者不存在，添加
                let sql1=`INSERT INTO auther ( NAME,TEXT) VALUES (?,?)`
                    db.query(sql1,[name,text],function(err,data){
                        if(err){
                            obj.meta.msg="数据库错误"
                            obj.meta.status=500
                            return res.send(obj)
                        }else{
                            obj.meta.msg="添加成功"
                            obj.meta.status=200
                            return res.send(obj)
                        }
                })            
            }
        }

    })
}
exports.changeAuther=function(req,res){
    // console.log(req.body)
    // return res.send("ok")
    let sql=`UPDATE auther SET NAME=?,text=?,image=? WHERE autherId=?`
    var obj = {
        meta: {
            msg: "",
            status: ''
        },
        data: {}
    }
    // var id=parseInt(req.body.params.id)
    // console.log(req.body.params.name)
    // console.log(req.body.params.text)
    // console.log(id) 
    db.query(sql,[req.body.params.name,req.body.params.text,req.body.params.image,req.body.params.id],function(err,data){
        if(err){
            obj.meta.msg="数据库查询错误"
            obj.meta.status=500
            return res.send(obj)
        }else{
            obj.data=data
            obj.meta.msg="作者更新成功"
            obj.meta.status=200
            return res.send(obj)
        }
    })
}
exports.getauhter=function(req,res){
    // console.log(req.params)
    // return res.send("ok")   
    let sql=`select * from auther where autherId=?`
    db.query(sql,req.params.autherId,function(err,data){
        var obj = {
            meta: {
                msg: "",
                status: ''
            },
            data: {}
        }
        if(err){
            obj.meta.msg="数据库查询错误"
            obj.meta.status=500
            return res.send(obj)
        }else{
            obj.data=data
            obj.meta.msg="查找成功"
            obj.meta.status=200
            return res.send(obj)
        }
    })
}
exports.getAutherBook=function(req,res){
    // console.log(req.params)
    // return res.send("ok")
    let sql=`select * from allbook where auther=?`
    db.query(sql,req.params.name,function(err,data){
        var obj = {
            meta: {
                msg: "",
                status: ''
            },
            data: {}
        }
        if(err){
            obj.meta.msg="数据库查询错误"
            obj.meta.status=500
            return res.send(obj)
        }else{
            obj.data=data
            obj.meta.msg="查找成功"
            obj.meta.status=200
            return res.send(obj)
        }
    })
}
exports.deleteAuther=function(req,res){
    // console.log(req.params)
    // console.log(111231)
    // return res.send("ok")
    let sql=`DELETE FROM auther WHERE autherid=?`
    db.query(sql,req.params.id,function(err,data){
        var obj = {
            meta: {
                msg: "",
                status: ''
            },
            data: {}
        }
        if(err){
            obj.meta.msg="数据库查询错误"
            obj.meta.status=500
            return res.send(obj)
        }else{
            obj.data=data
            obj.meta.msg="删除成功"
            obj.meta.status=200
            return res.send(obj)
        }
    })
}
