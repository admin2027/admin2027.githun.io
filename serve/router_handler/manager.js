const db = require('../db/index.js');
const config = require('../config');
//获取管理员列表
exports.getManagerList = (req, res) => {
        // return res.send("ok")
        let sql='select * from manager'
        db.query(sql,function(err,results){
            var obj = {
                data: '',
                meta: {
                    status: '',
                    msg: ''
                }
            }
            if(err){
                obj.meta.status = 500;
                obj.meta.msg = "数据库查询错误13";
                return res.send(obj);
            }else{
                var alldata=[]
                for(var i=0;i<results.length;i++){
                    alldata.push(results[i])
                }
                obj.data=alldata
                obj.meta.status = 200;
                obj.meta.msg = "获取管理员列表成功";
                return res.send(obj)
            }
        })
}
//删除管理员数据
exports.deleteManager=(req,res)=>{
    // return res.send("ok")
    // console.log(req.query)
    var managerId=req.params.id
    // console.log(req.params)
    let sql1 = 'delete from manager where managerId=?'
    db.query(sql1,managerId,function(err,data){
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
            obj.meta.status=200;
            obj.meta.msg="删除管理员成功"
        }
    })
    return res.send(obj)
}
exports.getAllClass=(req,res)=>{
    let sql=`select * from classify`
    db.query(sql,function(err,data){
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
            obj.meta.msg="分类查询成功"
            return res.send(obj)
        }
    })
    // return res.send("ok")
}
exports.getOption1=(req,res)=>{
    // return res.send("ok")
    let sql=`select * from allbook`
    db.query(sql,function(err,results){
        var obj = {
            data: '',
            total:"",
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
            obj.total=results.length
            const asd = {}
            for (var i = 0; i < results.length; i++) {
                if (results[i].class) {
                    var a = results[i].class
                }
                if (a in asd) {
                    asd[a]++
                } else {
                    asd[a] = 0
                    asd[a]++
                }
            }
            obj.data=asd
            obj.meta.status=200
            obj.meta.msg="分类查询成功"
            return res.send(obj)
        }
    })
    var data= [
        { value: 3, name: '古典武侠' },
        { value: 5, name: '讽刺悬疑' },
      ]

}
exports.getOption2=(req,res)=>{
    // return res.send("ok")
    let sql=`select * from user`
    db.query(sql,function(err,results){
        var obj = {
            data: '',
            total:"",
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
            obj.total=results.length
            const asd=[0,0]
            for (var i=0;i<results.length;i++){
                if(results[i].sex=="男"){
                    asd[0]=asd[0]+1
                }else if(results[i].sex="女"){
                    asd[1]=asd[1]+1
                }
            }
            obj.data=asd
            obj.meta.status=200
            obj.meta.msg="分类查询成功"
            return res.send(obj)
        }
    })


}