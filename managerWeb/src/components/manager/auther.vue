<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manager' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书管理</el-breadcrumb-item>
      <el-breadcrumb-item>作者管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
         <!--搜索区域-->
          <el-row :gutter="20">
                <el-col :span="8">
                  <el-input v-model="queryInfo.searchName" placeholder="请输入内容" clearable ></el-input>
                  </el-col>
                <el-col :span="4">
                  <el-button type="primary" icon="el-icon-search" @click="getAuthersList">搜索</el-button>
                  </el-col>
                  <el-col :span="4">
                  <el-button type="primary" icon="el-icon-plus" @click="addAuther()">添加作者</el-button>
                  </el-col>
          </el-row>

          
        <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column>
            <template slot-scope="scope">
                <a href="#" @click="tushu(scope.row.autherId)"> 图书</a>
            </template>
      </el-table-column>
      <el-table-column
      label="操作">
        <template slot-scope="scope">
             <!-- 修改按钮 -->
            <el-button type="primary " icon="el-icon-s-tools" size="mini" @click="changebook(scope.row)" ></el-button>
             <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteBook(scope.row.autherId)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>

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

        <!--修改图书对话框-->
        <el-dialog title="修改作者" :visible.sync="changeAutherVisible" >
            <el-form :model="changeForm"  ref="changeFormRef">
                  <el-form-item label="书名">
                    <el-input v-model="changeForm.name" ></el-input>
                  </el-form-item>                  
                  <el-form-item label="简介" >
                    <el-input type="textarea" v-model="changeForm.text"></el-input>
                  </el-form-item>
                    <!-- 图片上传 -->
                  <el-form-item>
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
        </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changeAutherVisible = false">取 消</el-button>
                <el-button @click="changeAutherTrue" type="primary" >确 定</el-button>
            </span>
        </el-dialog>


            <!-- 添加作者 -->
        <el-dialog title="修改图书" :visible.sync="addAutherVisible" >
                    <el-form :model="addAutherData"  ref="changeFormRef">
                        <el-form-item label="作者" >
                            <el-input v-model="addAutherData.name"  ></el-input>
                        </el-form-item>
                        <el-form-item label="简介" >
                            <el-input type="textarea" v-model="addAutherData.text"></el-input>
                        </el-form-item>
                        <!-- 图片上传 -->
                        <el-form-item>
                          <el-upload
                        class="upload-demo"
                        :action="uploadURL"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :headers="headerObj" 
                        :on-success="addSuccess"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                    </el-form-item>
                </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addAutherVisible = false">取 消</el-button>
                <el-button @click="addAuthertrue" type="primary" >确 定</el-button>
            </span>
        </el-dialog>

  </div>


  
</template>
<script>
  export default {
     data() {
        return {
          //获取token
           headerObj: {
              Authorization: window.sessionStorage.getItem('token')
             },
            //基础地址
          uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
            //修改表单是否显示
            changeAutherVisible:false,
            //修改表单数据
            changeForm:{
                id:"",
                name:"",
                text:"",
                image:"",
            },
            addAutherData:{
                name:"",
                text:"",
                img:"",
            },
            addAutherVisible:false,
          tableData: [{
            name: '施耐庵',
          }],
                    //查询参数分页信息
          queryInfo: {
                        //查找的书名
              searchName:"",
              pagenum: 1,
              pagesize: 5
            },
          //总数
          total:0,
        }
    },created(){
        this.getAuthersList()
    },methods:{
              addSuccess(response){
        // console.log(response)
        let image=response.data.url
        this.addAutherData.img=image
        // console.log(this.changeForm)
      },
        handleSuccess(response){
        // console.log(response)
        let image=response.data.url
        this.changeForm.image=image
        // console.log(this.changeForm)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);

      },
      handlePreview(file) {
        console.log(file);
      },
        //图书按钮
        tushu(autherId){
          console.log(autherId)
            this.$router.push(`/auther/${autherId}`) 
        },
        //修改确认按钮
       async changeAutherTrue(){
         console.log(this.changeForm)
           this.changeAutherVisible = false
           const {data:res}=await this.$http.post("changeAuther",{params:this.changeForm})
            if(res.meta.status==200){
              this.$message.success(res.meta.msg);
            }else{
              this.$message.error(res.meta.msg);
            }
            this.getAuthersList()
            this.changeForm={}
       },
        //添加作者确定按钮
         async addAuthertrue(){
            this.addAutherVisible = false
            const{data:res}=await this.$http.post('addAuther',{params:this.addAutherData})
             if(res.meta.status==200){
              this.$message.success(res.meta.msg);
            }else{
              this.$message.error(res.meta.msg);
            }
        },
        //添加作者按钮
        addAuther(){
            this.addAutherVisible=true
            this.getAuthersList()
        },
        //修改按钮
        changebook(row){
            this.changeAutherVisible=true
            console.log(row.name)
            this.changeForm.name=row.name
            this.changeForm.text=row.text
            this.changeForm.id=row.autherId
        },
        //删除按钮
        async deleteBook(id){
          console.log(id)
              const {data:res}=await this.$http.delete(`deleteAuther/${id}`)
              console.log(res)
                        this.getAuthersList()
        },
        handleCurrentChange(newPage){
          this.queryInfo.pagenum = newPage
          this.getAuthersList()
        },
        handleSizeChange(newSize){
          this.queryInfo.pagesize = newSize
          this.getAuthersList()
        },
        async  getAuthersList(){
            const {data:results}=await this.$http.get(`getauthersList`,{params:this.queryInfo})
            this.tableData=results.data.goods
            this.total=results.data.total  
        }
    }
    
  }
</script>