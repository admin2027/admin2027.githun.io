<template>
<div >

              
      <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" >
      <el-breadcrumb-item :to="{ path: '/manager' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书管理</el-breadcrumb-item>
      <el-breadcrumb-item>章节管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{bookData.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card height="300px" >
      <el-row :gutter="20">
        <el-col :span="6"><div ><img :src="bookData.img" alt="" style="width:200px;height:300px"  ></div></el-col>
        <el-col :span="14">
            <div>
                  <div>
                      书名：<label>{{bookData.name}}</label>
                  </div>
                  <div>
                      作者：<label>{{bookData.auther}}</label>
                  </div>
                  <div>
                      简介：<label>{{bookData.text}}</label>
                  </div>
            </div>
            </el-col>
      </el-row>
    </el-card>


    <el-card>
      <button @click="addCharpter">添加章节</button>
        <li v-for="item in chapterData" :key="item.chapterId" style="list-style: none;">
            <!-- 章节按钮 -->
            <el-button type="text" @click="charpter(item.chapterId)" >{{item.charpterName}}</el-button>
            <!-- 修改按钮 -->
            <el-button icon="el-icon-s-tools" size="mini" @click="changeCharpter(item.bookid,item.chapterId)" ></el-button>
            <!-- 删除按钮 -->
            <el-button  icon="el-icon-delete" size="mini" @click="deleteCharpter(item.bookid,item.chapterId)"></el-button>
        </li>
    </el-card>



    <!-- 添加章节的弹框 -->
    <el-dialog title="添加章节" :visible.sync="addchapterVisible" >
      <!-- ref="changeFormRef" -->
            <el-form :model="addCharpterData" ref="addCharpterData">
                  <el-form-item label="书本id">
                    <el-input v-model="addCharpterData.bookId"  disabled></el-input>
                  </el-form-item>
                  <el-form-item label="章节id" >
                    <el-input v-model="addCharpterData.chapterId"  :placeholder="'当前已存在章节'+this.chapterLength" ></el-input>
                  </el-form-item>
                  <el-form-item label="章节名称" >
                    <el-input v-model="addCharpterData.charpterName"></el-input>
                  </el-form-item>
                  <el-form-item label="章节内容" >
                    <el-input type="textarea" v-model="addCharpterData.chapterText"></el-input>
                  </el-form-item>
      </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addchapterVisible = false">取 消</el-button>
            <el-button @click="addChapterTrue()" type="primary" >确 定</el-button>
          </span>
    </el-dialog>


    <!-- 修改章节的弹框 -->
    <el-dialog title="修改章节" :visible.sync="changechapterVisible" >
      <!-- ref="changeFormRef" -->
            <el-form :model="changeChapterData" ref="changeChapterData">
                  <el-form-item label="书本id">
                    <el-input v-model="changeChapterData.bookid"  disabled></el-input>
                  </el-form-item>
                  <el-form-item label="章节id" >
                    <el-input v-model="changeChapterData.chapterId" disabled :placeholder="currentChapterId" ></el-input>
                  </el-form-item>
                  <el-form-item label="章节名称" >
                    <el-input v-model="changeChapterData.charpterName"></el-input>
                  </el-form-item>
                  <el-form-item label="章节内容" >
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" v-model="changeChapterData.chapterText"></el-input>
                  </el-form-item>
              </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="changechapterVisible = false">取 消</el-button>
            <el-button @click="changeChapterTrue()" type="primary" >确 定</el-button>
          </span>
    </el-dialog>
    </div>
</template>
<script>
export default {
  data() {
    return {
      //修改章节时，当前章节id
      currentChapterId:"",
      //修改章节时显示的信息
      changeChapterData:{
        // bookid: 1,
        // chapterId: 1,
        // chapterText: "",
        // charpterName: ""
      },
    //修改章节是否显示
    changechapterVisible:false,
      addCharpterData:{
        chapterId:"",
        chapterText:"",
        charpterName:"",
        bookId:"",
    },
     addchapterVisible:false,
     chapterData:[],
     bookData:[],

     params:[],
     //当前图书章节数量
     chapterLength:0,
    }
  },created(){
    this.addCharpterData.bookId=this.$route.params.id
    this.getBook()
    this.getCharpter()
  },methods:{
    //修改章节的确认按钮
      async changeChapterTrue(){
        //
      const {data:result}=await this.$http.post('changeChapter',this.changeChapterData)
      // console.log(this.changeChapterData)
      // console.log(result)
        if(result.meta.msg=="修改章节成功"){
        //关闭对话框，刷新列表，提示成功
        this.changechapterVisible = false
        this.getCharpter()
        return this.$message.success('修改章节成功')

        }

      },
    //增加章节的确认按钮
    async addChapterTrue(){
      // console.log(11)
      const {data:result}=await this.$http.post('addchapter',this.addCharpterData)
      if(result.meta.msg=="增加章节成功"){
        this.addchapterVisible = false
      //点击确定后清空添加表单，重新添加默认图书id
      this.addCharpterData={
            chapterId:"",
            chapterText:"",
            charpterName:"",
            bookId:"",
      }
      this.addCharpterData.bookId=this.$route.params.id
      //刷新表单
        this.getCharpter()
        return this.$message.success('增加章节成功')
      }
      
    },
    //增加章节按钮
    addCharpter(){
      this.addchapterVisible=true
      this.chapterLength=this.chapterData.length
    },
    //跳转相关章节
    charpter(id){
        // console.log(id)
        let chapterid=id
      this.$router.push({name:"charpter",params:{bookid:this.addCharpterData.bookId,charpterid:chapterid}})
      
    },
    //获取图书基本信息
      async getBook(){
          const {data:result}= await this.$http.get(`idfindbook/${this.addCharpterData.bookId}`)
          this.bookData=result.data[0]
                //   console.log(result.data[0])
    },
      //获取章节列表
      async getCharpter(){
          const{data:result}=await this.$http.get(`idfindcharpter/${this.addCharpterData.bookId}`)
          this.chapterData=result.data
          // console.log(this.chapterData)
    },
      //修改章节按钮
       async changeCharpter(bookId,chapterid){
        const{data:result}=await this.$http.get(`/findAchapter/${bookId}/${chapterid}`)
        this.changeChapterData=result.data[0]
        this.currentChapterId=result.data[0].chapterId
        this.changechapterVisible=true
        // console.log(this.currentChapterId)
          // console.log(bookId)
          // console.log(chapterid)
    },
      //删除章节按钮
      async deleteCharpter(bookid,chapterId){
        // console.log(bookid)
        // console.log(chapterId)
          const confirmResult = await this.$confirm(
            '此操作将永久删除该用户, 是否继续?',
                    '提示',
              {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
              }
              ).catch(err => err)
              console.log(confirmResult)

            if(confirmResult=="confirm"){
              const {data:result}=await this.$http.delete(`deletecharpter/${bookid}/${chapterId}`)
              if(result.meta.msg=="删除章节成功"){
                      this.getCharpter()
                  return this.$message.success('删除章节成功')
                }       
            }else{
              return this.$message.info('已取消删除')
            }

    }
  }
}
</script>
<style scoped>


 .el-row {
    margin-bottom: 20px;

  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>