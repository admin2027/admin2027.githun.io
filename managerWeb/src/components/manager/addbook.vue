<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manager' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加图书</el-breadcrumb-item>
    </el-breadcrumb>


    <el-card>
       
      <el-form ref="addBook" :model="addBook" :rules="addFormRules"  label-width="80px">
            <el-form-item label="书名" prop="name">
              <el-input v-model="addBook.name" placeholder="书名"></el-input>
            </el-form-item>
          <el-form-item label="作者" prop="auther">
            <el-input v-model="addBook.auther"></el-input>
          </el-form-item>
          <el-form-item label="小说类型" prop="class">
            <template>
              <el-select v-model="addBook.class"  placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="简介" prop="text">
            <el-input type="textarea" v-model="addBook.text"></el-input>
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

          
          <el-form-item align="right"> 
            <el-button  type="primary" @click="onSubmit">添加</el-button>
          </el-form-item>
      </el-form>      
    </el-card>


  </div>
</template>
<script>
  export default {
    data() {
      return {
        addFormRules :{
        name:[{required:true,message:"请添加书名",trigger:'blur'}],
        auther:[{required:true,message:"请添加作者",trigger:"blur"}],
        class:[
          {required:true,message:'请选择类型', trigger: 'blur' }
        ],
        text:[
          {required:true,message:"请添加图书简介",trigger: 'blur'}
        ]
      },
         imageUrl: '',
        headerObj: {
              Authorization: window.sessionStorage.getItem('token')
             },
                      // 上传图片的URL地址
        uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
        options: [
            {
              value: '黄金糕',
              label: '黄金糕'
            },{
              value: 'asjkcbasjkdhb',
              label: 'asjkcbasjkdhb'
            }
        ],
        class:{},
        addBook:{
          // name:"asd",
          // text:"asd",
          // auther:"asd",
          // class:"",
          // img:"",
        },
      }
    },created(){
      this.getAllClass()
    },
    methods: {
      handleSuccess(response){
        console.log(response)
        let img=response.data.url
        this.addBook.img=img
        console.log(this.addBook)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);

      },
      handlePreview(file) {
        console.log(file);
      },
       onSubmit() {
        this.$refs.addBook.validate(async valid=>{
          console.log("valid")
          console.log(valid)
          if(!valid){
            // this.$refs.addFormRules.resetFields()
            return this.$message.error("请填写必要表单项！")

          }
          const {data:result}=await this.$http.post('/addBook',this.addBook)
          console.log(result)
        })
        
      },async getAllClass(){
        const {data:result}=await this.$http.get('/getAllClass')
          var results=result.data
            console.log(results)
          var data=[]
            for( var item of results){
              // console.log(item)
              for(let key in item){
                if(key=="class"){
                  var obj={}
                  obj={
                    value:item[key],
                    label:item[key],
                  }
                  data.push(obj)
                }
                 
              }
              
              
            }
            this.options=data
        
      }
    }
  }
</script>