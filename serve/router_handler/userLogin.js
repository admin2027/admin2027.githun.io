const db = require('../db/index.js');
const bcrypt = require('bcryptjs')
    // 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.login = (req, res) => {
    // console.log(req.body)
    // return res.send("ok")
    const sql = 'select * from user where userName=?'
    db.query(sql, req.body.username, function(err, results) {
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
            console.log(results)
            if (results.length === 1) {
                // console.log(results)
                    // console.log(req.body.password)
                    // console.log(results[0].password)
                    //校验密码
                // var compareResult = bcrypt.compareSync(req.body.password, results[0].password)
                // console.log(compareResult)
                if (req.body.password!==results[0].password) {
                    console.log(req.body.password, results[0].password)
                    obj.meta.status = 400;
                    obj.meta.msg = '密码错误';
                    return res.send(obj);
                } else {
                    // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
                    const user = {...results[0], password: '' }
                        // 生成 Token 字符串
                    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
                        expiresIn: '10h', // token 有效期为 10 个小时
                    })
                    obj.meta.status = 200;
                    obj.meta.msg = '用户登录成功';
                    obj.data.userName=results[0].userName
                    obj.data.id = results[0].id
                    obj.data.sex=results[0].sex
                    obj.data.img = results[0].image
                    
                    obj.data.token ='Bearer ' + tokenStr
                    return res.send(obj);
                }
            } else {
                obj.meta.status = 400;
                obj.meta.msg = '用户名不存在';
                return res.send(obj);
            }


        }

    })

}