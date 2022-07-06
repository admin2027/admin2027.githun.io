const db = require('../db/index.js');
//获取管理员列表
exports.getBooksList = async function(req, res) {
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
        sql1 = `select * from allbook where name like '%${searchName}%'`;
        
    } else {
        sql1 = `select * from allbook`;
    }
    //分页结果查询
    let startPage = (pagenum - 1) * pagesize
    // console.log(searchName)
    if (searchName) {
        console.log(searchName)
        sql2 = `select * from allbook where name like '%${searchName}%'  limit ${startPage},${pagesize}`;
    } else {
        sql2 = `select * from allbook  limit ${startPage},${pagesize}`;
    }

    try {
        let results = await query(sql1)
        obj.data.total = results.length;
        obj.data.pagenum = pagenum;
        // console.log(results.length)
    } catch (err) {
        sqlerr = err;
        console.log(sqlerr)
    }

    try {
        let results = await query(sql2)
        obj.data.goods = results;
    } catch (err) {
        sqlerr = err;
        console.log(sqlerr)
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
exports.changeBook=(req,res)=>{
    console.log(req.body)
    var sql=`UPDATE  allbook SET NAME=?,class=?,img=?,text=? WHERE id='?'`
    db.query(sql,[req.body.name,req.body.class,req.body.img,req.body.text,req.body.id],function(err,results){
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
            obj.meta.msg="更改图书成功"
            return res.send(obj)
        }
    })
    
}
exports.deleteBook=(req,res)=>{
    var sql=`delete from allbook where id=?`
    db.query(sql,req.params.id,function(err,results){
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
            obj.meta.msg="删除图书成功"
            return res.send(obj)
        }
    })
}
exports.searchBoook=(req,res)=>{
    // console.log(req.body)
    var sql=`SELECT * FROM allbook WHERE NAME=? OR auther=?`
    db.query(sql,[req.body.searchName,req.body.searchName,req.body.searchName],function(err,results){
        var obj = {
            data: '',
            meta: {
                status: '',
                msg: ''
            }
        }
        if(err){
            obj.meta.status = 500;
            obj.meta.msg = "找不到相关图书";
            return res.send(obj);
        }else{
            obj.meta.status=200
            obj.meta.msg="找到相关内容"
            obj.data=results
            return res.send(obj)
        }
    })
}
//获取历史演义
exports.getlsyyList=(req,res)=>{
    // return res.send("ok")
    var sql=`select * from allbook where class='历史演义' LIMIT 0,8`   
    db.query(sql,function(err,results){
        var obj={
            data:{},
            meta:{
                status:200,
                msg:"查询失败"
            }
    
        }
         if(err){
            obj.meta.status = 500;
            obj.meta.msg = "历史演义推荐查询失败";
            return res.send(obj);
        }else{
            obj.meta.status=200
            obj.meta.msg="找到历史演义相关内容"
            obj.data=results
            return res.send(obj)
        }
    })
}
//英雄传奇
exports.getyxcqList=(req,res)=>{
    // return res.send("ok")
    var sql=`select * from allbook where class='英雄传奇' LIMIT 0,8`   
    db.query(sql,function(err,results){
        var obj={
            data:{},
            meta:{
                status:200,
                msg:"查询失败"
            }
    
        }
         if(err){
            obj.meta.status = 500;
            obj.meta.msg = "英雄传奇推荐查询失败";
            return res.send(obj);
        }else{
            obj.meta.status=200
            obj.meta.msg="找到英雄传奇相关内容"
            obj.data=results
            return res.send(obj)
        }
    })
}

//获取神话鬼怪
exports.getggshList=(req,res)=>{
    // return res.send("ok")
    var sql=`select * from allbook where class='神话鬼怪' LIMIT 0,8`   
    db.query(sql,function(err,results){
        var obj={
            data:{},
            meta:{
                status:200,
                msg:"查询失败"
            }
    
        }
         if(err){
            obj.meta.status = 500;
            obj.meta.msg = "神话鬼怪推荐查询失败";
            return res.send(obj);
        }else{
            obj.meta.status=200
            obj.meta.msg="找到神话鬼怪相关内容"
            obj.data=results
            return res.send(obj)
        }
    })
}

//获取世态人情
exports.getstrqList=(req,res)=>{
    // return res.send("ok")
    var sql=`select * from allbook where class='世态人情' LIMIT 0,8`   
    db.query(sql,function(err,results){
        var obj={
            data:{},
            meta:{
                status:200,
                msg:"查询失败"
            }
    
        }
         if(err){
            obj.meta.status = 500;
            obj.meta.msg = "世态人情推荐查询失败";
            return res.send(obj);
        }else{
            obj.meta.status=200
            obj.meta.msg="找到世态人情相关内容"
            obj.data=results
            return res.send(obj)
        }
    })
}

//获取讽刺悬疑
exports.getfcxyList=(req,res)=>{
    // return res.send("ok")
    var sql=`select * from allbook where class='讽刺悬疑' LIMIT 0,8`   
    db.query(sql,function(err,results){
        var obj={
            data:{},
            meta:{
                status:200,
                msg:"查询失败"
            }
    
        }
         if(err){
            obj.meta.status = 500;
            obj.meta.msg = "讽刺悬疑";
            return res.send(obj);
        }else{
            obj.meta.status=200
            obj.meta.msg="找到讽刺悬疑s相关内容"
            obj.data=results
            return res.send(obj)
        }
    })
}

//获取学术杂书
exports.getxszsList=(req,res)=>{
    // return res.send("ok")
    var sql=`select * from allbook where class='学术杂书' LIMIT 0,8`   
    db.query(sql,function(err,results){
        var obj={
            data:{},
            meta:{
                status:200,
                msg:"查询失败"
            }
    
        }
         if(err){
            obj.meta.status = 500;
            obj.meta.msg = "学术杂书推荐查询失败";
            return res.send(obj);
        }else{
            obj.meta.status=200
            obj.meta.msg="找到学术杂书相关内容"
            obj.data=results
            return res.send(obj)
        }
    })
}

//获取杂剧戏曲
exports.getzjxqList=(req,res)=>{
    // return res.send("ok")
    var sql=`select * from allbook where class='杂剧戏曲' LIMIT 0,8`   
    db.query(sql,function(err,results){
        var obj={
            data:{},
            meta:{
                status:200,
                msg:"查询失败"
            }
    
        }
         if(err){
            obj.meta.status = 500;
            obj.meta.msg = "杂剧戏曲推荐查询失败";
            return res.send(obj);
        }else{
            obj.meta.status=200
            obj.meta.msg="找到杂剧戏曲相关内容"
            obj.data=results
            return res.send(obj)
        }
    })
}

//获取笔记日记
exports.getbjrjList=(req,res)=>{
    // return res.send("ok")
    var sql=`select * from allbook where class='笔记日记' LIMIT 0,8`   
    db.query(sql,function(err,results){
        var obj={
            data:{},
            meta:{
                status:200,
                msg:"查询失败"
            }
    
        }
         if(err){
            obj.meta.status = 500;
            obj.meta.msg = "笔记日记推荐查询失败";
            return res.send(obj);
        }else{
            obj.meta.status=200
            obj.meta.msg="找到笔记日记相关内容"
            obj.data=results
            return res.send(obj)
        }
    })
}

//获取古典武侠
exports.getgdwxList=(req,res)=>{
    // return res.send("ok")
    var sql=`select * from allbook where class='古典武侠' LIMIT 0,8`   
    db.query(sql,function(err,results){
        var obj={
            data:{},
            meta:{
                status:200,
                msg:"查询失败"
            }
    
        }
         if(err){
            obj.meta.status = 500;
            obj.meta.msg = "古典武侠推荐查询失败";
            return res.send(obj);
        }else{
            obj.meta.status=200
            obj.meta.msg="找到古典武侠相关内容"
            obj.data=results
            return res.send(obj)
        }
    })
}

