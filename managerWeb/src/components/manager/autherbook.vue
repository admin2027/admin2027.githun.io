<template>
    <div>
        <el-card style="height:300px">
            <div class="img" >
                <img :src="autherDate.image"  style="height:300px;width:150px" alt="">
            </div>
            <div class="text">
                    <p>介绍:{{autherDate.text}}</p>
            </div>
        </el-card>


        <el-card>
                <el-table
                :data="bookDatas"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="书名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="auther"
                    label="作者">
                </el-table-column>
              <el-table-column >
                  <template slot-scope="scope">
                        <a href="#" @click="enterBook(scope.row.id)">查看图书</a>
                  </template>
                </el-table-column>
                </el-table>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return{
            bookDatas:[],
            autherId:"",
            autherDate:{
                autherId:"",
                image:"",
                name:"a",
                text:"",
            }
        }
    },created(){
        this.autherId=this.$route.params.autherId
        // console.log(this.autherId)
        
        this.getUsersList()
    },methods:{

       async getUsersList(){
          const {data:results}=await this.$http.get(`getAuther/${this.autherId}`)
          this.autherDate=results.data[0]
          console.log(results)
          this.getbook()
        },
        async  getbook(){
            console.log(this.autherDate.name)
            const {data:res} =await this.$http.get(`getAutherBook/${this.autherDate.name}`)
            this.bookDatas=res.data
            console.log(this.bookDatas)
        },
        enterBook(id){
              
         this.$router.push({path:`/book/${id}`})
        }
    }
}
</script>
<style lang="less" scoped>
.img{
    padding-right:20px ;
    float: left;
    height: 270px;
    width: 200px;
}
</style>