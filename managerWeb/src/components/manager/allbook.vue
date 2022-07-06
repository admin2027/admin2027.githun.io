<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manager' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书管理</el-breadcrumb-item>
      <el-breadcrumb-item>所有书</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--搜索区域-->
          <el-row :gutter="20">
                <el-col :span="8">
                  <el-input v-model="queryInfo.searchName" placeholder="请输入内容" clearable ></el-input>
                  </el-col>
                <el-col :span="4">
                  <el-button type="primary" icon="el-icon-search" @click="getBooksList">搜索</el-button>
                  </el-col>
          </el-row>
          <!--表单区域-->
          <el-table  :data="booksData"  style="width: 100%"  >
                <el-table-column type="expand">
                      <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                          <el-form-item label="简介">
                            <span>{{ props.row.text }}</span>
                          </el-form-item>
                          <el-form-item label="封面">
                            <img :src="props.row.img" style="width:200px;height:300px" alt="">
                          </el-form-item>
                        </el-form>
                      </template>
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="图书id"
                    >
                </el-table-column>
                <el-table-column

                    prop="name"
                    label="书名">
                </el-table-column>
                <el-table-column
                    prop="auther"
                    label="作者">
                </el-table-column>
                <el-table-column
                    prop="class"
                    label="分类">
                </el-table-column>
                <el-table-column label="操作" >
                  <template slot-scope="scope">
                    <!-- 修改按钮 -->
                    <el-button type="primary " icon="el-icon-s-tools" size="mini" @click="changebook(scope.row.id)" ></el-button>
                    <!-- 删除按钮 -->
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteBook(scope.row.id)"></el-button>
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

<!--修改图书对话框-->
        <el-dialog title="修改图书" :visible.sync="changeBookVisible" >
            <el-form :model="changeForm"  ref="changeFormRef">
                  <el-form-item label="书名">
                    <el-input v-model="changeForm.name" ></el-input>
                  </el-form-item>
                  <el-form-item label="作者" >
                    <el-input v-model="changeForm.auther"  ></el-input>
                  </el-form-item>
                  <el-form-item label="简介" >
                    <el-input type="textarea" v-model="changeForm.text"></el-input>
                  </el-form-item>
                          <el-form-item label="分类" >
                    <el-input v-model="changeForm.class"></el-input>
                  </el-form-item>
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
            <el-button @click="changeBookVisible = false">取 消</el-button>
            <el-button @click="changeTrue" type="primary" >确 定</el-button>
          </span>
    </el-dialog>
  </div>
</template>
 <script>
 import { Message } from 'element-ui';
    export default {
      data() {
        return {
           headerObj: {
              Authorization: window.sessionStorage.getItem('token')
             },
          //基础地址
          uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
          //查询参数分页信息
            queryInfo: {
                        //查找的书名
              searchName:"",
              pagenum: 1,
              pagesize: 5
            },

          //图书、、是否显示修改对话框
          changeBookVisible:false,
          //总数
          total:0,
          //图书列表信息
          booksData: [          
          // {
          //   id: '1',
          //   name:"asd",
          //   auther: 'qqwe',
          //   text: 'asdasdasdasd',
          //   class:"123",
          //   picture:"asdasd",
          // }
          ],
          changeForm:{
            // name:"asd",
            // auther:"qwe",
            // text:"asdasdfsdf",
            // class:"asd",
            // picture:"asd",
            img:""
          }
        }
      },
      created(){
        this.getBooksList()
        console.log(111)
        console.log(this.booksData)
        
      },methods:{
      handleSuccess(response){
        let img=response.data.url
        console.log(img)
        this.changeForm.img=img
      },

              handleRemove(file, fileList) {
        console.log(file, fileList);

      },
              handlePreview(file) {
        console.log(file);
      },
        handleCurrentChange(newPage){
          this.queryInfo.pagenum = newPage
          this.getBooksList()
        },
        handleSizeChange(newSize){
          this.queryInfo.pagesize = newSize
          this.getBooksList()
        },
        //删除按钮
        async deleteBook(id){
          const confirmResult = await this.$confirm(
                    '此操作将永久删除该用户, 是否继续?',
                    '提示',
                    {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }
              ).catch(err => err)
              // console.log(confirmResult)
              if(confirmResult=="confirm"){
              await this.$http.delete(`deleteBook/${id}`)
                this.getBooksList()
              }else{
                return this.$message.info('已取消删除')
              }

        },
        //修改弹框确定按钮
        async changeTrue(){
          this.changeBookVisible = false
            const {data:result}= await this.$http.post('/changeBook',this.changeForm)
            if(result.meta.status==200){
              this.$message.success(result.meta.msg);
            }else{
              this.$message.error(result.meta.msg);
            }
            this.changeForm={}
        },
        changebook(id){
          // console.log(id)
          this.changeBookVisible=true
          for(var i=0;i<this.booksData.length;i++){
            if(this.booksData[i].id==id){
              this.changeForm=this.booksData[i]
            }
          }
        },
        //获取管理员列表
        async getBooksList(){
          const {data:results}=await this.$http.get('getbooksList',{params: this.queryInfo})
          console.log(results.data.goods)
          this.total=results.data.total 
          this.booksData=results.data.goods
        },
        

      },
    }
  </script>
  <style scoped>
  .text1{
    width:200px;
    height:"100"
  }
  </style>