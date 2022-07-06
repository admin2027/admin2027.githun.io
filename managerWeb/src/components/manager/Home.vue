<template> 
    <el-container>
      <el-header>
        <div>
            <img  src="../../assets/think.png">
            <span>思维小说台管理系统</span>
        </div>
        <el-button type="info" @click='quit'>退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse? '64px' : '200px'">
            <div class="toggle-button" @click="toggleCollapse">|||</div>
            <el-menu background-color='#333744'  text-color='#fff'  :collapse="isCollapse" :collapse-transition="false" router >
                <el-submenu index="1">
                    <template #title>
                        <i :class="iconsObj[125]"></i>
                        <span>账号管理</span>
                    </template>
                        <el-menu-item index="/manager" >
                         <i class="el-icon-menu"></i>
                            <span>管理员账号</span>
                        </el-menu-item>
                        <el-menu-item index="/user">
                         <i class="el-icon-menu"></i>
                            <span>读者账号管理</span>
                        </el-menu-item>

                </el-submenu>
                <el-submenu index="2">
                    <template #title>
                        <i :class="iconsObj[102]"></i>
                        <span>图书管理</span>
                    </template>
                        <el-menu-item index="/allbook" >
                         <i class="el-icon-menu"></i>
                            <span>所有书</span>
                        </el-menu-item>
                        <el-menu-item index="/addbook" >
                         <i class="el-icon-menu"></i>
                            <span>添加图书</span>
                        </el-menu-item>
                        <el-menu-item index="/charpter" >
                         <i class="el-icon-menu"></i>
                            <span>章节管理</span>
                        </el-menu-item>
                        <el-menu-item index="/auther" >
                         <i class="el-icon-menu"></i>
                            <span>作者管理</span>
                        </el-menu-item>
                </el-submenu>



            </el-menu>
        </el-aside>
        <el-main>                
            <router-view></router-view>
        </el-main>

      </el-container>
    </el-container>
    
</template>

<script>
        export default{
            data(){ 
                return { 
                    menuList:[],
                    iconsObj: {
                        '125': 'iconfont icon-user',
                        '103': 'iconfont icon-tijikongjian',
                        '101': 'iconfont icon-shangpin',
                        '102': 'iconfont icon-danju',
                        '145': 'iconfont icon-baobiao'},
                    activePath:"",
                    //折叠
                    isCollapse:false
                }
            },
            methods:{ 
                quit(){ 
                    window.sessionStorage.clear();
                    this.$router.push('/managerlogin')
                },
                toggleCollapse(){
                    this.isCollapse=!this.isCollapse
                },

            },
            created(){ 

            }
        }
</script>

<style lang='less' scoped>
    img{
        width:  73px;;
        height: 60px;
        opacity:0.8
    }
    .el-container{
        height: 100%;
    }
    .el-header{
        background-color: #373d41;
        display: flex;
        justify-content:space-between;
        color: #fff;
        font-size: 20px;
        padding-left: 0px;
        div{
            display: flex;
            align-items: center;
            span{
                margin-left: 15px;
            }
        }
    }
    .el-aside{
        background-color: #333744;
    }
    .el-main{
        background-color: #eaedf1;
    }
    .toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>