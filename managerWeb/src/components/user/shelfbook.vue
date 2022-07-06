<template>
<div>
    <div class="header">
        <div class="image"><span>头像</span>
            <img :src="this.userData.image" alt="">
        </div>
        <div class="text">
            <div >用户名：{{this.userData.userName}}</div>
            <div >性别：{{this.userData.sex}}</div>
            <div >邮箱：{{this.userData.email}}</div>

        </div>
        <div class="edit"><button @click="edit()">修改用户</button></div>
    </div>
    <!-- 图书收藏列表 -->
    <div class="bookshelf">
        <el-table v-if="userShelfList" :data="userShelfList">
                <el-table-column
                prop="name"
                label="书名">
                </el-table-column>
                <el-table-column
                prop="auther"
                label="作者">
                </el-table-column>
                <el-table-column
                prop="charpterId"
                label="书签">
                </el-table-column>
                <el-table-column label="删除收藏" >
                  <template slot-scope="scope">
                    <!-- 删除按钮 -->
                    <el-button  icon="el-icon-delete" size="mini" @click="deleteShelfBook(scope.row.id)"></el-button>
                    <el-button size="mini" @click="readBook(scope.row)">开始阅读</el-button>
                  </template>
                  </el-table-column>
            </el-table>
            
    </div>



 <!--修改用户信息对话框-->
    <el-dialog :modal="false" title="修改用户" :visible.sync="changeUserVisible" >
            <!-- :rules="changeFormRef" -->
            <el-form :model="userData[0]"  ref="userData">
                  <el-form-item label="用户名" prop="userName">
                      <el-input v-model="userData.userName" ></el-input>
                  </el-form-item>
                  <el-form-item label="性别" prop="sex">
                      <el-input v-model="userData.sex"></el-input>
                  </el-form-item>
                  <el-form-item label="头像" prop="image">
                      <el-input v-model="userData.image"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                      <el-input v-model="userData.email"></el-input>
                  </el-form-item>
          </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="changeUserVisible = false">取 消</el-button>
                <el-button @click="changerUserTrue" type="primary" >确 定</el-button>
              </span>
    </el-dialog>
</div>

</template>
<script>
export default {
   data(){
       return{
           changeUserVisible:false,
           userData:[
            // userName:"",
            // image:"",
            // id:"",
            // email:"a",
            // password:"",
            // sex:"",
           ],
           userShelfList:[
               {
                   auther:"",
                    bookId:"",
                    charpterId:"",
                    class:"",
                    id:"",
                    img:"",
                    name:"",
                    text:"",
                    userId:"",
                    charpterId:""
               }
            ],
           
           userid:""
        
       }
   },created(){
    this.userid=window.sessionStorage.currentUserId
    this.getuser()
    this.getUsersBookShelf()
   },methods:{
       //阅读图书
       readBook(row){
        //    console.log(row.bookId)
           this.$router.push({path:`/WebCharpter/${row.bookId}/${row.charpterId}`,query:{userid:this.userid,bookid:row.bookId}})
       },
       //修改用户信息按钮
         edit(){
           this.changeUserVisible=!this.changeUserVisible

       },
       //修改用户信息确认按钮
       async changerUserTrue(){
           this.changeUserVisible = false
            const {data:res} =await this.$http.post('changeUser',this.userData)
            if(res.meta.status==200){
                this.$message.success(res.meta.msg);
            }
            this.getuser()
       },
       async getuser(){
           let id=this.userid
           const{data:res} =await this.$http.get(`getUser/${id}`)
        //    console.log(res)
        this.userData=res.data[0]
        // console.log(this.userData)
       },
       //获取收藏图书信息
       async getUsersBookShelf(){         
           const {data:res} =await this.$http(`getUsersBookShelf/${this.userid}`)
           console.log(res)
        this.userShelfList=res.data
        console.log(this.userShelfList)
       },
       //删除图书,根据双id删除收藏图书
        async deleteShelfBook(id){
           let bookid=id
           let userid=this.userid
            const{data:res} =await this.$http(`deleteShelfBook/${userid}/${bookid}`)
            if(res.meta.status==200){
                this.$message.error(res.meta.msg);
                this.getUsersBookShelf()
            }
        }
   }
}
</script>
<style lang='less' scoped>
.header{
    width: 100%;
    height: 200px;
    background:#E9FAFF;
    .image{
        width: 200px;
        float: left;
        img{
            width: 180px;
            border-radius: 100%;
        }
    }
    .text{
        margin-top: 20px;
        width: 500px;
        float: left;
        font-size:30px;
        
    }
    .edit{
         margin-top: 20px;
        float: left;
    }
}
.bookshelf{
    height: 1000px;
}
</style>