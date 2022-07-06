<template>
        <div class="box_con">
            <div class="con_top">
                <a href="/">思维网</a>
                <span>&nbsp;>&nbsp;{{this.book.name}}</span>
            </div>
            <div class="maininfo">
                <div class="info">
                    <h1>{{this.book.name}}</h1>
                    <p>作&nbsp;&nbsp;&nbsp;&nbsp;者:{{this.book.auther}}</p>
                    <p>
                        动&nbsp;&nbsp;&nbsp;&nbsp;作
                        <a href="#" @click="addBookShelf()">加入书架&nbsp;&nbsp;</a>
                    </p>
                    <div class="block" >
                    <el-rate v-model="value1" @change="pinfen()"></el-rate>
                    </div>
                </div>
                <div class="intro">
                    <p>{{this.book.text}}</p>
                </div>
            </div>
            <div class="sidebar">
                <div class="fmimg" style="">
                    <img class="image" :src="book.img" alt="">
                </div>
            </div>
            <div class="box_con">
                <div class="list">
                    <dt>{{this.book.name}}正文</dt>
                    <dd v-for="asd in bookCharpter" :key="asd.id"> <router-link :to="{path:`/WebCharpter/${asd.bookid}/${asd.chapterId}`}">{{asd.charpterName}}</router-link></dd>
                </div>
            </div>
        </div>
</template>
<script>
export default {
    data(){
        return {
            value1:"",
            bookid:"",
            book:{},
            bookCharpter:[],
            userid:null,
            classifyId:""
        }
    },created(){
        this.bookid=this.$route.params.id
        this.userid=window.sessionStorage.currentUserId
        this.getbook()
        this.getBookCharpter()
        this.getMarking()
        // console.log("Asd")
        // console.log(this.bookCharpter)
    },methods:{


        //根据bookid，userid获取用户对图书的评分
        async getMarking(){
            if(this.userid){
                const data =await this.$http.get(`marking/${this.bookid}/${this.userid}`)
                this.value1=data.data.data[0].marking 
            }else{
                this.value1=null
            }

   
        },
        async pinfen(){
            if(this.userid){
                //登录
                const {data:res} = await  this.$http.post(`marking/${this.bookid}/${this.userid}/${this.value1}`)
                this.$message.success(res.meta.msg)
            }else{
                //未登录
                this.$message.error("未登录，无法参与评分")
            }
        },
        //加入书架按钮
        async addBookShelf(){
            //判断用户是否登录
            if(this.userid){
                console.log("class")
                console.log(this.book.class)
                //已登录
                let charpterid=1
                console.log(this.classifyId)
                const {data:res}= await this.$http.post(`addBookShelf/${this.userid}/${this.bookid}/${charpterid}/${this.classifyId}`)
                if(res.meta.msg=="该图书已收藏"){
                    this.$message.error("该图书已收藏")
                }else{
                    
                    this.$message.success("加入收藏成功")
                }
            }else{
                this.$message.error("未登录，无法加入书架")
            }

        },
       async getbook(){
           const{data:res} =await this.$http.get(`idfindbook/${this.bookid}`)
           this.book=res.data[0]
           this.classifyId=res.data[0].classid
        //    console.log(res.data[0].classid)
           
       },
       async getBookCharpter(){
           const {data:res}= await this.$http.get(`idfindcharpter/${this.bookid}`)
           console.log(res)
           this.bookCharpter=res.data
       }
    }

}
</script>
<style lang="less" scoped>
.goTop{
  height: 100Vh;
  overflow-x:hidden;
}
.box_con {
    .list {
        margin: auto;
        padding: 2px;
         dt {
            background: none repeat scroll 0 0 #C3DFEA;
            display: inline;
            float: left;
            font-size: 14px;
            line-height: 28px;
            overflow: hidden;
            text-align: center;
            vertical-align: middle;
            width: 98%;
            margin: auto auto 5px;
            padding: 5px 10px;
        }dd {
            border-bottom: 1px dashed #CCC;
            display: inline;
            float: left;
            height: 25px;
            line-height: 200%;
            margin-bottom: 5px;
            overflow: hidden;
            text-align: left;
            text-indent: 10px;
            vertical-align: middle;
            width: 28%;
        }
    }
    border: 2px solid #88C6E5;
    overflow: hidden;
    width: 976px;
    margin: 5px auto;
        .con_top {
        border-bottom: #88C6E5 1px solid;
        text-align: left;
        padding: 0px 10px;
        line-height: 40px;
        height: 40px;
        background-color: #E1ECED;
    }
        .maininfo {
        float: right;
        width: 800px;
                .info {
                padding: 10px;
                margin: 10px;
                font-size: 15px;
            }
                .intro {
            width: 96%;
            overflow: hidden;
            line-height: 150%;
            border-top: 1px dashed #88C6E5;
            padding: 10px;
            font-size: 13px;
             p {
                    text-indent: 2em;
                    margin-top: 10px;
                }
        }
    }   
        .sidebar {
            margin: auto;
            float: left;
            width: 140px;
            text-align: left;
            .fmimg {
                background-color: #E1ECED;
                float: left;
                width: 126px;
                margin: 12px;
                padding: 12px;
                position: relative;
            }
    }
}
a {
    color: #6F78A7;
    text-decoration: none;
}
.image{
    width:100px;
    height:150px
}
</style>