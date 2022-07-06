<template >

  <div>
        <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manager' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书管理</el-breadcrumb-item>
      <el-breadcrumb-item>章节管理</el-breadcrumb-item>
    </el-breadcrumb>
          <!--搜索区域-->
          <el-row :gutter="20">
                <el-col :span="8">
                  <el-input v-model="queryInfo.searchName" placeholder="请输入内容" clearable ></el-input>
                  </el-col>
                <el-col :span="4">
                  <el-button type="primary" icon="el-icon-search" @click="getBooksList">搜索</el-button>
                  </el-col>
          </el-row>


    <el-row>
<el-card>
<el-col :span="4" v-for="item in bookDatas" :key="item.id" >

    <el-card :body-style="{ padding: '0px' }" >

      <img :src="item.img" class="image" style="width:95px;height:140px">
              
      <div style="padding: 14px;">

        <span>{{item.name}}</span>          
        <div class="bottom clearfix">
          <el-button type="text" @click="charpter(item)">查看章节</el-button>            
        </div>       
      </div>
    </el-card>

  </el-col>

</el-card>
  
</el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bookDatas:[
        // {
        //     auther:"",
        // class:"",
        // id:"",
        // img:"",
        // name:"",
        // text:"",
        // }
        ],            
        queryInfo: {
                        //查找的书名
              searchName:"",
              pagenum: "1",
              pagesize: "9999"
            },
      currentDate: new Date()
    };
  },methods:{
      charpter(item){
        console.log(item.id)
          this.$router.push({name:"book",params:{id:item.id}})
      },
      async getBooksList(){
          const {data:results}=await this.$http.get('getbooksList',{params: this.queryInfo})
          this.bookDatas=results.data.goods
      }
  },created(){
      this.getBooksList()
  }
}
</script>
<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>