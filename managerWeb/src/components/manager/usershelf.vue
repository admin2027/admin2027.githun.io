<template>
  <div>
        <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manager' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号管理</el-breadcrumb-item>
      <el-breadcrumb-item  :to="{path:'/user'}">读者账号</el-breadcrumb-item>
      <el-breadcrumb-item>读者书架</el-breadcrumb-item>
    </el-breadcrumb>

     <el-table v-if="userShelfList" :data="userShelfList">
        <el-table-column
          prop="id"
          label="图书id">
        </el-table-column>
        <el-table-column
          prop="image"
          label="图书封面">
          <template slot-scope="scope">
            <img class="asd" :src="scope.row.img" height="125px" width="125px"  >
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="书名">
        </el-table-column>
        <el-table-column
          prop="auther"
          label="作者">
        </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data(){
    return{
      userShelfList:[
        // auther: "罗贯中"
        // bookId: 1
        // class: "历史演义"
        // id: 1
        // img: "https://static.guwenxue.org/bookimg/sanguoyanyi.jpg"
        // name: "三国演义"
        // text: "《三国演义》是中，反映了蜀、
              ]    
    }
  },
  created(){
    this.getUserShelf()
  },
  methods:{
    async getUserShelf(){
      var id=window.sessionStorage.userId
      const {data:result}=await this.$http.get("/getUsersBookShelf/"+id)
      this.userShelfList=result.data
    }
  }
}
</script>
