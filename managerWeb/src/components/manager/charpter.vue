<template>
<div>
        <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manager' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书管理</el-breadcrumb-item>
      <el-breadcrumb-item>章节管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:`/book/${this.bookid}`}">{{bookData.name}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{chapterData.charpterName}}</el-breadcrumb-item>
    </el-breadcrumb>

<el-card>
    <h3>{{chapterData.charpterName}}</h3>
    <el-button @click="changeChapter()">确认修改</el-button>  
    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 28}" v-model="chapterData.chapterText"></el-input>
</el-card>

</div>

</template>
<script>
export default {
  data() {
    return {
      bookid:"",
      chapterid:"",
      chapterData:{
// bookid: "",
// chapterId:"",
// chapterText: "",
// charpterName:"",
      },
      bookData:{
// auther: "罗贯中"
// class: "历史演义"
// id: 1
// img: "https://static.guwenxue.org/bookimg/sanguoyanyi.jpg"
// name: "三国演义"
// text: "《》"
      }
    }
  },created(){
        this.bookid=this.$route.params.bookid
        this.chapterid=this.$route.params.charpterid
        this.getchapter()
        this.idfindbook()
  },methods:{
    //获取章节内容
      async getchapter(){
        let bookid=this.bookid
        let chapterid=this.chapterid
        console.log(bookid)
        console.log(chapterid)
        const {data:result}=await this.$http.get(`findAchapter/${bookid}/${chapterid}`)
                // console.log(result)
        this.chapterData=result.data[0]
      },
      //获取图书内容
      async idfindbook(){
        let bookid=this.bookid
        const {data:result} =await this.$http.get(`idfindbook/${bookid}`)
        // console.log(result)
        this.bookData=result.data[0]
      },
      //确认修改
      async changeChapter(){
        const {data:result} =await this.$http.post(`changeChapter`,this.chapterData)
        console.log(result)
        this.getchapter()
      }
  }
}
</script>
<style scoped >

</style>