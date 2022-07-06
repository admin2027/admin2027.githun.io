<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manager' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号管理</el-breadcrumb-item>
      <el-breadcrumb-item>读者账号</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!--搜索区域-->
          <el-row :gutter="20">
                <el-col :span="8">
                  <el-input v-model="queryInfo.searchName" placeholder="请输入内容" clearable ></el-input>
                  </el-col>
                <el-col :span="4">
                  <el-button type="primary" icon="el-icon-search" @click="getUsersList">搜索</el-button>
                  </el-col>
                <el-col :span="4">
                  <el-button type="primary" icon="el-icon-plus" @click="addUser">添加用户</el-button>
                </el-col>
          </el-row>

      <el-table :data="userDataList">
        <el-table-column
          prop="id"
          label="用户id">
        </el-table-column>
        <el-table-column
          prop="image"
          label="用户头像">
          <template slot-scope="scope">
            <img class="asd" :src="scope.row.image" height="125px" width="125px" border="1px solid #eee" >
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名称">
        </el-table-column>
        <el-table-column
          prop="id"
          label="书架">
          <template slot-scope="scope">
            <el-button @click="BookShelf(scope.row.id)">书架</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="email"
          label="用户邮箱">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="用户性别">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary " icon="el-icon-s-tools" size="mini" @click="changeUser(scope.row.id)" ></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
               </template>
        </el-table-column>
      </el-table>
       <!--分页模块-->
          <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[5, 10,]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
          </div>  
    </el-card>

    <!--修改用户信息对话框-->
        <el-dialog title="修改用户" :visible.sync="changeUserVisible" >
            <el-form :model="changeUserList" :rules="changeFormRef" ref="changeUserList">
                  <el-form-item label="用户名" prop="userName">
                      <el-input v-model="changeUserList.userName" ></el-input>
                  </el-form-item>
                  <el-form-item label="性别" prop="sex">
                      <el-input v-model="changeUserList.sex"></el-input>
                  </el-form-item>
            <el-form-item>
                <el-upload
              class="upload-demo"
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :headers="headerObj" 
              :on-success="handleSuccess2"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                      <el-input v-model="changeUserList.email"></el-input>
                  </el-form-item>
          </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="changeUserVisible = false">取 消</el-button>
                <el-button @click="changeTrue" type="primary" >确 定</el-button>
              </span>
        </el-dialog>



        <!--添加用户对话框-->
        <el-dialog title="添加用户" :visible.sync="addUserVisible"  @close="addUserClose">
            <el-form :model="addUserList" :rules="addFormRef" ref="addUserList">
                  <el-form-item label="用户名" prop="userName">
                      <el-input v-model="addUserList.userName" ></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                      <el-input v-model="addUserList.password" ></el-input>
                  </el-form-item>
                  <el-form-item label="性别" prop="sex">
                      <el-input v-model="addUserList.sex"></el-input>
                  </el-form-item>
                  <el-form-item label="头像" prop="image">
                      <el-upload
                          class="upload-demo"
                          :action="uploadURL"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          :headers="headerObj" 
                          :on-success="handleSuccess"
                          list-type="picture">
                          <el-button size="small" type="primary">点击上传</el-button>
                          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                      <el-input v-model="addUserList.email"></el-input>
                  </el-form-item>
          </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="addUserVisible = false">取 消</el-button>
                <el-button @click="addTrue" type="primary" >确 定</el-button>
              </span>
        </el-dialog>
  </div>
</template>
<script>
export default {
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
    return{
      uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      handlePreview(file) {
        console.log(file);
      },
            handleRemove(file, fileList) {
        console.log(file, fileList);

      },        headerObj: {
              Authorization: window.sessionStorage.getItem('token')
             },
             
      addUserList:
    {userName:"",sex:"",image:"",email:"",password:""},
      addUserVisible:false,
      //表单改变校验
          addFormRef :{
        userName:[
          {required:true,message:"用户名不能为空",trigger:'blur'},
          {min: 3,max: 10,message: '用户名的长度在3~10个字符之间',trigger: 'blur'}
        ],
        sex:[
          {required:true,message:'性别不能为空', trigger: 'blur' }
        ],      
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        password:[
          {min: 6,max: 15,message: '用户名的长度在6~15个字符之间',trigger: 'blur'},
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      //表单改变校验
          changeFormRef :{
        userName:[
          {min: 3,max: 10,message: '用户名的长度在3~10个字符之间',trigger: 'blur'},
          {required:true,message:"用户名不能为空",trigger:'blur'}],
        sex:[
          {required:true,message:'性别不能为空', trigger: 'blur' }
        ],
        image:[
          {required:true,message:"头像不能为空",trigger: 'blur'}
        ],        
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        password:[
          {min: 6,max: 15,message: '用户名的长度在6~15个字符之间',trigger: 'blur'},
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      changeUserVisible:false,
      total:0,
      changeUserList:
        {
          email: "",
id: "",
image: "",
sex: "",
userName: "",
        },
      userDataList:[
         {
            // id: '1',
            // userName:"asd",
            // image: '',
            // email: 'asdasdasdasd',
            // sex:"123",
          }
      ],
      //查询参数分页信息
      queryInfo: {
                        //查找的书名
              searchName:"",
              pagenum: 1,
              pagesize: 5
            },
    }
  },created(){
      this.getUsersList()
  },methods:{
        //图片上传成功时
        handleSuccess(response){
        console.log(response)
        let img=response.data.url 
        this.addUserList.image=img
        console.log(this.addUserList)
      },
      handleSuccess2(response){
        console.log(response)
        let img=response.data.url 
        this.changeUserList.image=img
        console.log(this.addUserList)
      },
          //添加用户表单确认按钮
            addTrue(){
              this.$refs.addUserList.validate(async valid=>{
                if(!valid){
                  // this.$refs.addFormRules.resetFields()
                  return this.$message.error("格式错误！")
                }
                  // 表单数据通过校验，发送添加请求
                    const {data:result} =await this.$http.post('addUSer',this.addUserList)
                    // console.log(result)
                    if(result.meta.msg=="添加用户成功"){
                    return this.$message.success("添加用户成功")
                      }
              })
              this.addUserVisible=false
            },
          //监听关闭‘添加弹框’
            addUserClose(){
              //清空添加表单
              this.addUserList={userName:"",sex:"",image:"",email:"",password:""}
            },
            addUser(){
              this.addUserVisible=true
            },
          changeTrue(){
            this.$refs.changeUserList.validate(async valid=>{
              // console.log(valid)
              if(!valid){
            // this.$refs.addFormRules.resetFields()
            return this.$message.error("格式错误！")
             } 
             //格式正确发送修改请求
              const {data:result}=await this.$http.post('/changeUser',this.changeUserList)
              this.getUsersList()
              this.changeUserVisible = false
              // console.log(result.meta)
              if(result.meta.msg=="更新用户成功"){
                return this.$message.success("更新用户成功")
              }
            })
            this.changeUserVisible=false
          },
          async getUser(id){
            const {data:result}=await this.$http.get(`getUser/${id}`)
            this.changeUserList=result.data[0]
            // console.log(this.changeUserList)
          },
          changeUser(id){
            this.changeUserVisible=!this.changeUserVisible
            this.getUser(id)
          },
          async deleteUser(id){
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async() => {
            const {data:result}=await this.$http.delete(`deleteUser/${id}`)
            this.getUsersList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });

          },
        async BookShelf(id){

           window.sessionStorage.setItem("userId",id)
           this.$router.push('/usershelf')
        },
            //获取管理员列表
        async getUsersList(){
          const {data:results}=await this.$http.get('getusersList',{params: this.queryInfo})
          this.total=results.data.total 
          this.userDataList=results.data.goods
          // console.log(this.userDataList)
        },
                handleCurrentChange(newPage){
          this.queryInfo.pagenum = newPage
          this.getUsersList()
        },
                handleSizeChange(newSize){
          this.queryInfo.pagesize = newSize
          this.getUsersList()
        },
  }
}
</script>
<style scoped>
 .asd{
border-radius:100%
 }
</style>
