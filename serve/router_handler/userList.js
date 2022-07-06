const db = require('../db/index.js');
//获取用户列表
exports.getUsersList = async function(req, res) {
    
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
    pagenum = Number(pagenum);
    pagesize = Number(pagesize);
    let sql1; //查询语句1 查询总条数
    let sql2; //查询语句2 查询符合条件的
    let sqlerr = '' //存储数据库查询错误信息
        // 总条数查询
        // console.log(searchName)
    if (searchName) {
        sql1 = `select * from user where userName like %${searchName}%`;
    } else {
        sql1 = `select * from user`;
    }
    //分页结果查询
    let startPage = (pagenum - 1) * pagesize
    if (searchName) {
        sql2 = `select * from user where userName like '%${searchName}%' limit ${startPage},${pagesize}`;
    } else {
        sql2 = `select * from user  limit ${startPage},${pagesize}`;
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
        obj.meta.msg = sqlerr;
        obj.meta.status = 500;
        return res.send(obj)
    } else {
        obj.meta.msg = "获取商品列表成功";
        obj.meta.status = 200
        return res.send(obj)
    }

}
//根据userid获取收藏图书
exports.getUsersBookShelf= function(req,res){
    // return res.send("ok")
    // console.log(req.params)
    const userId=req.params.userId
    let sql=`SELECT * FROM noveln.bookshelf INNER JOIN noveln.allbook  ON (bookshelf.bookId = allbook.id) WHERE userId=?`
    db.query(sql,userId,function(err,data){
        // return res.send("ok")
        // console.log(data)
        var obj = {
            data: {},
            meta: {
                status: '',
                msg: ''
            }
        }
        if (err) {
            obj.meta.status = 500;
            obj.meta.msg = '数据库查询错误1';
            return res.send(obj);
        } else {
            obj.data=data
            obj.meta.status=200;
            obj.meta.msg="书架信息查询成功"
            return res.send(obj)
        }
    })
}
//根据id删除用户
exports.deleteUser=function(req,res){
    // console.log(req.params.userId)
    // return res.send("ok")
    let sql=`DELETE FROM USER WHERE id=?`        
    var obj = {
            data: {},
            meta: {
                status: '',
                msg: ''
            }
        }
    db.query(sql,req.params.userId,function(err,data){
        if (err) {
            obj.meta.status = 500;
            obj.meta.msg = '数据库查询错误1';
            return res.send(obj);
        } 
    })
    let sql1='DELETE from bookshelf where userId=?'
    db.query(sql1,req.params.userId,function(err,data){
        if(err){
            obj.meta.status = 500;
            obj.meta.msg = '数据库查询错误1';
            return res.send(obj);
        }
    })
    let sql2='delete from marking where userid=?'
    db.query(sql2,req.params.userId,function(err,data){
        if(err){
            obj.meta.status = 500;
            obj.meta.msg = '数据库查询错误1';
            return res.send(obj);
        }
    })
        obj.meta.status=200;
        obj.meta.msg="用户删除成功"
        return res.send(obj)

}
//根据id查找指定用户
exports.getUser=function(req,res){
    // console.log(req.params.userId)
    // return res.send("ok")
    let sql=`select * from user where id=?`
    db.query(sql,req.params.userId,function(err,data){
        var obj = {
            data: {},
            meta: {
                status: '',
                msg: ''
            }
        }
        if (err) {
            obj.meta.status = 500;
            obj.meta.msg = '数据库查询错误1';
            return res.send(obj);
        } else {
            obj.data=data
            obj.meta.status=200;
            obj.meta.msg="查找用户成功"
            return res.send(obj)
        }
    })
}
//修改用户信息
exports.changeUser=function(req,res){
    console.log(req.body)
    // return res.send("ok")
    let sql=`UPDATE  user SET userName=?,password=?,email=?,sex=?,image=? WHERE id=?`
    db.query(sql,[req.body.userName,req.body.password,req.body.email,req.body.sex,req.body.image,req.body.id],function(err,data){
        var obj = {
            data: "",
            meta: {
                status: '',
                msg: ''
            }
        }
        if (err) {
            obj.meta.status = 500;
            obj.meta.msg = '数据库查询错误1';
            return res.send(obj);
        } else {
            obj.meta.status=200;
            obj.meta.msg="更新用户成功"
            return res.send(obj)
        }
    })
}
//添加用户
exports.addUser=function(req,res){
    // console.log(rea.body)
    // return res.send("okasd")
    let sql=`INSERT INTO USER (userName, PASSWORD,email,sex,image) VALUES (?,?,?,?,?)`
    db.query(sql,[req.body.userName,req.body.password,req.body.email,req.body.sex,req.body.image],function(err,data){
        var obj = {
            data: "",
            meta: {
                status: '',
                msg: ''
            }
        }
        if (err) {
            obj.meta.status = 500;
            obj.meta.msg = '数据库查询错误1';
            return res.send(obj);
        } else {
            obj.meta.status=200;
            obj.meta.msg="添加用户成功"
            return res.send(obj)
        }

    })
}