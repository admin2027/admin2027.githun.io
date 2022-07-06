<template>
<div id="body">
    <el-container>
      <el-header style="height:30px;justify-content: right;">
      <a v-show="showname==false" href="http://localhost:8080/#/userlogin">用户登录</a> 
      <a v-show="showname==true" href="#">欢迎{{userName}}</a>
      <a v-show="showname==true" href="#" style="padding-top:0px">
      <img  :src="userImage" calss="avatar_box" alt="">
      </a>
      <a v-show="showname==true"  href="#"   @click="quit()">退出登录</a>
      <a href="http://localhost:8080/#/managerlogin">管理员登录</a> 
      </el-header>
      <div class="header">
        <div style="width:250px;height:1px;float:left;margin-top:25px;margin-left:50px"><h1>思维小说网</h1> </div>
        <div style="float: left;margin-top:10px">
        <el-input style="width:320px;margin-right:10px" v-model="queryInfo.searchName"> </el-input>
        <el-button type="primary" icon="el-icon-search"  @click="searchbook()">搜索</el-button>
        </div>
      </div>

      <div class="nav">
        <ul>
          <li><a href="">首页</a></li>
          <li v-for=" item in classList" :key="item.classid">
            <router-link  :to="{path:`/class/${item.classid}`}">{{item.class}}</router-link>
            </li>
        </ul>
      </div>
      
      <el-main >
         <el-table  :data="booksData"  style="width: 100%"  >
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
                    <!-- 开始阅读 -->
                    <el-button type="primary"   size="mini" @click="readBook(scope.row.id)">开始阅读</el-button>
                    <!-- 修改按钮 -->
                    <el-button type="primary "  size="mini" @click="addUserShelf(scope.row.id)">加入书架</el-button>

                  </template>
                  </el-table-column>
          </el-table>

          <!-- 分页模块 -->
                    <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[10, 20,]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
          </div>  
      </el-main>
      <div class="footer">
        <div class="footer_link"></div>
        <div class="footer_cont">
          <p>本站所有小说为转载作品，所有章节均由网友上传，转载至本站只是为了宣传本书让更多读者欣赏。</p>
        </div>
      </div>
      </el-container>
</div>


</template>
<script>
export default {
  data() {
    return {
      classifyId:"",
        total:0,
            queryInfo: {
                        //查找的书名
              searchName:"",
              pagenum: 1,
              pagesize: 10
            },
             booksData: [          
          {
            id: '1',
            name:"asd",
            auther: 'qqwe',
            text: 'asdasdasdasd',
            class:"123",
            picture:"asdasd",
          }
          ],
      
      classList:[{id:"",class:""}],
      userName:" ",
      userImage:"",
      showname:false
    };
  },created(){
    this.userName=window.sessionStorage.currentUserName
    this.userImage=window.sessionStorage.currentUserImage
    this.showName()
    this.getclass()
     this.queryInfo.searchName=this.$route.params.name
        this.getBooksList()
  },methods:{
    async getbook(bookId){

           
       },
    //阅读图书
    readBook(id){
      this.$router.push({path:`/webBook/${id}`})
    },
    //搜索按钮
    searchbook(){ 
      this.getBooksList()
    },
    async getclass(){
      const {data:result}= await this.$http.get('getAllClass')
      this.classList=result.data
      console.log(this.classList)
    },
    quit(){
    window.sessionStorage.clear()
    this.$router.push({name:"userlogin"})
  },
    showName(){
      // console.log(this.userName)
      // console.log(this.showname)
      if(this.userName){
        this.showname=true
      }
      // console.log(this.showname)
    },
          //获取管理员列表
        async getBooksList(){
          const {data:results}=await this.$http.get('getbooksList',{params: this.queryInfo})
          console.log(results.data.goods)
          this.total=results.data.total 
          this.booksData=results.data.goods
        },
        handleSizeChange(newSize){
          this.queryInfo.pagesize = newSize
          this.getBooksList()
        },
        handleCurrentChange(newPage){
          this.queryInfo.pagenum = newPage
          this.getBooksList()
        },

        //加入书架按钮
        async addUserShelf(id){
          var bookid=id
                 var userid =parseInt( window.sessionStorage.currentUserId)
          const{data:res} =await this.$http.get(`idfindbook/${bookid}`)
           console.log(res)
           this.classifyId=res.data[0].classid
            // 判断用户是否登录
            if(userid){
                //已登录
                let charpterid=1
                const {data:res}= await this.$http.post(`addBookShelf/${userid}/${bookid}/${charpterid}/${this.classifyId}`)
                console.log(res)
                if(res.meta.msg=="该图书已收藏"){
                    this.$message.error("该图书已收藏")
                }else{
                    
                    this.$message.success("加入收藏成功")
                }
            }else{
                this.$message.error("未登录，无法加入书架")
            }

        },
  }
}
</script>
<style lang='less' scoped>


  .nav{
    background: none repeat scroll 0 0 #88C6E5;
    height: 40px;
    overflow: hidden;
    width: 980px;
    margin: 10px auto auto;
    ul{
      margin: 0px;
      padding: 0px;
      li{
        float: left;
        line-height: 35px;
        list-style: none outside none;
        a{
          text-decoration: none;
          width: 81px;  
          font-size: 15px;
          color: #FFF;
          font-weight: 700;
          padding: 0 10px;
        }
      }
    } 
  }


a{
  color: #6F78A7;
    text-decoration: none;
}
ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}
#body {
  width: 100%;
  // height: 100%;
  background-color: #E9FAFF;
  color: #555;
  font-family: 宋体;
  font-size: 12px;
  margin: 0 auto;
}

.header {
    height: 66px;
    width: 980px;
    margin: auto;
    el-input{
          border: 1px solid #A6D3E8;
          font: 16px/22px arial;
          height: 24px;
          margin-right: 5px;
          width: 320px;
          padding: 3px;
    }
}
.el-container{
        height: 100%;
    }
    .el-header{
        background-color: rgb(225, 236, 237);;
        display: flex;
        justify-content:space-between;
        color: #fff;
        font-size: 20px;
        padding-left: 0px;
        a{
          text-decoration:none;
          padding: 10px 10px;
          font-size: 10px;
          img{
             height:30px;
              width:30px;
              border:1px solid #eee;
              border-radius: 50%;
          }
        }
    }
    .el-main{
        // background-color: #eaedf1;
        width: 980px;
        height: 100%;
        margin-top: 10px;
        position: relative;
        transform: translate(-50%);
        margin-left:50%;
        padding: 0px;
        
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
html, body, ul, ol, li, p, h1, h2, h3, h4, h5, h6, table, td, th, img, div, dl, dt, dd, input, select, form, fieldset {
    margin: auto;
    padding: 0;
}
.footer {
    overflow: hidden;
    text-align: center;
    width: 980px;
    margin: 10px auto auto;
    .footer_link {
        border-bottom: 2px solid #88C6E5;
        height: 25px;
        line-height: 25px;
        overflow: hidden;
        width: 92%;
        margin: 5px auto;
    }
    .footer_cont p {
    color: #B2B2B2;
    line-height: 20px;
    width: 88%;
}
}

</style>