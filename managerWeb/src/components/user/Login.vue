<template>
   <div class="login_container">
       <img src="../../assets/userBackground.jpg" width="100%" height="100%" >
        <!-- 登录盒子 -->
        <div class="login_box" ref="loginBox">
            <!-- 头像 -->
            <div class="avatar_box">
                <img src="../../assets/think.png">
            </div>

              <el-tabs v-model="activeName"  @tab-click="handleClick" >
                <el-tab-pane  label="登录" name="login">
                                <!-- 登录表单 1. form表单绑定数据   :model   2.将input进行数据绑定  v-model  -->
                        <el-form  class="login_form"  :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
                            <el-form-item prop="username" label="账号">
                                <el-input prefix-icon="iconfont icon-user" placeholder="请输入账号" v-model="loginForm.username"></el-input>
                            </el-form-item>
                            <el-form-item prop="password" label="密码">
                                <el-input prefix-icon="iconfont icon-3702mima" placeholder="请输入密码"  show-password  v-model="loginForm.password" type="password"></el-input>
                            </el-form-item>
                            <el-form-item class="login_btn">
                                <el-button type="primary" @click="login">登录</el-button>
                                <el-button @click="homepage"> 返回主页</el-button>
                            </el-form-item>
                        
                        </el-form>
                </el-tab-pane>
                <el-tab-pane  label="注册" name="register">
                    <!--  注册表单 -->
                        <el-form :inline="true"  class="login_form"  :model="registerForm" :rules="regiterFormRules" ref="regiterForm">
                            <el-form-item prop="username" label="账号">
                                <el-input  placeholder="请输入账号" v-model="registerForm.username"></el-input>
                            </el-form-item>
                            <el-form-item prop="password" label="密码">
                                <el-input  placeholder="请输入密码"  show-password  v-model="registerForm.password" type="password"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model="registerForm.email"></el-input>
                            </el-form-item>
                            <el-form-item label="性别">
                                 <el-radio-group v-model="registerForm.sex">
                                    <el-radio label="男"></el-radio>
                                    <el-radio label="女"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item class="login_btn">
                                <el-button type="primary" @click="regiter()">注册</el-button>
                                <el-button @click="homepage"> 返回主页</el-button>
                            </el-form-item>
                        </el-form>

                </el-tab-pane>
            </el-tabs>
        </div>
   </div>
</template>
<script>
    export default{   
        data(){ 
                 // 验证邮箱的规则
        var checkEmail = (rule, value, cb) => {
        // 验证邮箱的正则表达式
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if (regEmail.test(value)) {
            // 合法的邮箱
            return cb()
        }
        cb(new Error('请输入合法的邮箱'))
        }
            return { 
                //选择器数据
                        
                activeName:'login',
            // 3.定义form表单初始数据  
                loginForm:{ 
                    username:'asd',
                    password:"asdasdasd"
                },
                registerForm:{
                    username:"",
                    password:"",
                    email:"",
                    sex:""
                },
                loginFormRules:{ 
                    username: [
                        {
                            required: true,
                            message: '请输入用户名或账号',
                            trigger: 'blur',
                        },
                        {
                            min: 1,
                            max: 13,
                            message: '姓名长度必须在1-13个字之间',
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
                },
                regiterFormRules:{
                    username: [
                        {
                            required: true,
                            message: '请输入用户名或账号',
                            trigger: 'blur',
                        },
                        {
                            min: 1,
                            max: 13,
                            message: '姓名长度必须在1-13个字之间',
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
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { validator: checkEmail, trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
                        //注册新用户按钮
           async regiter(){
            //    console.log(this.registerForm)
                const {data:res} =await this.$http.post('regiter',this.registerForm)
                console.log(res)
                if(res.meta.msg=="注册成功"){
                    this.registerForm={
                    username:"",
                    password:"",
                    email:"",
                    sex:""
                    }
                }
            },
        //登录和注册的切换
            handleClick(tab){
                var loginBox=this.$refs.loginBox
                if(tab._props.label=="注册"){
                    loginBox.style.height="350px"
                    loginBox.style.width="400px"
                }else{
                    loginBox.style.height="300px"
                    loginBox.style.width="450px"
                }
            },
            //返回主页按钮
            homepage(){
                this.$router.push('/WebHome')
            },
            loginFormReset(){ 
            //   重置表单数据、
            //  1.在el-form中设置 ref
            //  2.查看this中的$refs  
            //  3.对el-form-item设置prop
            //  4.调用重置函数
                // console.log(this)
                this.$refs.loginFormRef.resetFields();
            },
            login(){ 
                this.$refs.loginFormRef.validate(async valid=>{ 
                    if(!valid){ 
                        // console.log(valid)
                        this.$message.error("请账号和密码按要求补全")
                    }else{
                    
                        let {data:result} =await this.$http.post("login/user",this.loginForm)
                        // console.log(result)
                       if(result.meta.status==200){ 
                           this.$message.success(result.meta.msg);
                           console.log(result.data)
                           window.sessionStorage.setItem("currentUserId",result.data.id)
                           window.sessionStorage.setItem('token',result.data.token)
                           window.sessionStorage.setItem("currentUserName",result.data.userName)
                           window.sessionStorage.setItem("currentUserImage",result.data.img)  
                            // let username=result.data.userName
                            // let img=result.data.img            
                           this.$router.push({name:'WebHome'})

                       }else{ 
                           this.$message.error(result.meta.msg);
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
            // position:absolute;
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