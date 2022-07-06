<template>
   <div class="login_container">
       <img src="../../assets/background.jpg" width="100%" height="100%">
        <!-- 登录盒子 -->
        <div class="login_box">
            <!-- 头像 -->
            <div class="avatar_box">
                <img src="../../assets/think.png">
            </div>
            <!-- 登录表单 1. form表单绑定数据   :model   2.将input进行数据绑定  v-model--> 

            <el-form class="login_form"  :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
                            管理员登录
                <el-form-item prop="username">
                    <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="iconfont icon-3702mima"  v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item class="login_btn">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button @click="loginFormReset">重置</el-button>
                    <el-button @click="homepage"> 返回主页</el-button>
                </el-form-item>
            </el-form>
        </div>
   </div>
</template>
<script>
    export default{   
        data(){ 
            return { 
            // 3.定义form表单初始数据  
                loginForm:{ 
                    username:'admin',
                    password:'1234567'
                },
                loginFormRules:{ 
                    username: [
                        {
                            required: true,
                            message: '请输入姓名',
                            trigger: 'blur',
                        },
                        {
                            min: 2,
                            max: 5,
                            message: '姓名长度必须在2-5个字之间',
                            trigger: 'blur',
                        },
                    ],
                    password:[
                           {
                                required: true,
                                message: '请输入密码',
                                trigger: 'blur',
                          },
                           {
                                min: 6,
                                max: 15,
                                message: '密码长度必须在6-15个字之间',
                                trigger: 'blur',
                            },
                    ]
                }
            }
        },
        methods:{
            homepage(){
               this.$router.push('/WebHome')
            },
            loginFormReset(){ 
            //   重置表单数据、
            //  1.在el-form中设置 ref
            //  2.查看this中的$refs  
            //  3.对el-form-item设置prop
            //  4.调用重置函数
                console.log(this)
                this.loginForm={}
                this.$refs.loginFormRef.resetFields();
            },
            login(){ 
                this.$refs.loginFormRef.validate(async valid=>{ 
                    if(!valid){ 
                        console.log(valid)
                        this.$message.error("请姓名和密码按要求补全")
                    }else{
                       let {data:res}= await this.$http.post('login/manager',this.loginForm)
                       if(res.meta.status==200){ 
                           this.$message.success(res.meta.msg);
                           window.sessionStorage.setItem("currentManagerId",res.data.managerId)
                           window.sessionStorage.setItem('token',res.data.token)
                           window.sessionStorage.setItem("currentManagerAccount",res.data.account)
                           window.sessionStorage.setItem("currentManagerImage",res.data.img)                           
                           this.$router.push('/managerhome')

                       }else{ 
                          
                           this.$message.error(res.meta.msg);
                       }
                    }
                })
            }
        }
            
    }
</script>
<style lang="less" scoped>
.login_container{
    background-color: #2b5b6b;
    height:100%;
    .login_box{
        width:450px;
        height:300px;
        background:#fff;
        position:absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        .avatar_box{
            height:130px;
            width:130px;
            border:1px solid #eee;
            border-radius: 50%;
            box-shadow: 0 0 10px #ddd;
            padding:10px;
            position:absolute;
            left:50%;
            transform: translate(-50%,-50%);
            img{
                width:100%;
                height:100%;
                border-radius: 50%;
                background-color: #eee;

            }
        }
        .login_form{
            position:absolute;
            bottom:0px;
            width:100%;
            padding:0px 20px;
            box-sizing:border-box ;
            .login_btn{
                display:flex;
                justify-content: flex-end;
            }
        }

    }
}

</style>