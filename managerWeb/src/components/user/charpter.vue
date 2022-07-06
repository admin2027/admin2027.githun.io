<template>
<div >

    <div class="box_con">

        <div class="bookname">
            <h1>{{this.charpterName}}</h1>
            <div class="bottem1">
                <a href="#" @click="shang()">上一章</a>
                <a href="#" @click="out()">章节目录</a>
                <a href="#" @click="xia()">下一章</a>
                <a href="#" @click="addBookShelf()">加入收藏</a>
            </div>
        </div>
            <textarea disabled v-model="this.charpterText"></textarea>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            bookId:"",
            charpterId:"",
            charpterText:"",
            charpterName:"",
            CharpterLength:"",
            userid:"",
            BookshelfbookId:"",
            classifyId:""
        }
    },created(){
        this.charpterId=parseInt(this.$route.params.charpterId)
        this.bookId=this.$route.params.bookId
        this.userid=window.sessionStorage.currentUserId
        this.BookshelfbookId=this.$route.query.bookid
        // console.log(this.$route.query)
        // console.log(this.BookshelfbookId)
        this.findAchapter()
        this.idfindcharpter()
        this.getbook()
    },methods:{
        //获取图书信息,得到该图书的分类id
         async getbook(){
            //  console.log(this.bookId)
           const{data:res} =await this.$http.get(`idfindbook/${this.bookId}`)
           console.log(res)
           this.classifyId=res.data[0].classid
        //    console.log("classid")
        //    console.log(this.classifyId)
       },
        //返回章节
        out(){
            
            this.$router.push({path:`/webBook/${this.bookId}`})
        },
        //加入收藏
        async addBookShelf(){
            // console.log(this.bookId,this.charpterId)
            //判断用户是否登录
            if(this.userid){
                console.log("用户已经登录")
                // 请求接口
                const {data:res}= await this.$http.post(`addBookShelf/${this.userid}/${this.bookId}/${this.charpterId}/${this.classifyId}`)
                if(res.meta.msg=="该图书已收藏"){
                    this.$message.error("该图书已收藏")
                }else{
                    
                    this.$message.success("加入收藏成功")
                }
            }else{
                 this.$message.error("未登录，无法加入书架1")
            }
        },
        async findAchapter(){
            // console.log("findasd")
            // console.log(this.bookId,this.charpterId)
            const {data:res} =await this.$http.get(`findAchapter/${this.bookId}/${this.charpterId}`)
            console.log(res)
            this.charpterText=res.data[0].chapterText
            this.charpterName=res.data[0].charpterName
            // console.log(this.charpterText)
        }, async shang(){
                if(this.charpterId==1){
                    // console.log("123123")
                    return 
                }else{
                    // console.log("345345")
                 this.charpterId=this.charpterId-1
                 //判断是否从书架阅读
                 if(this.BookshelfbookId){
                     //从书架阅读，记录书签
                         //更改书签
                    const {data:results} =await this.$http.post(`changeBookMark/${this.userid}/${this.BookshelfbookId}/${this.charpterId}`)
                    console.log(results)
                    const {data:res} =await this.$http.get(`findAchapter/${this.BookshelfbookId}/${this.charpterId}`)
                    this.charpterText=res.data[0].chapterText
                    this.charpterName=res.data[0].charpterName
                 }else{
                     //从首页阅读不记录书签
                            //查找上一张内容
                            const {data:res} =await this.$http.get(`findAchapter/${this.bookId}/${this.charpterId}`)
                            this.charpterText=res.data[0].chapterText
                            this.charpterName=res.data[0].charpterName
                 }



                }
        },
         async xia(){
            if(this.charpterId==this.CharpterLength){
                return
            }else{
                this.charpterId=this.charpterId+1
                if(this.BookshelfbookId){
                    //从书架阅读，记录书签
                    const {data:results} =await this.$http.post(`changeBookMark/${this.userid}/${this.BookshelfbookId}/${this.charpterId}`)
                    console.log(results)
                    const {data:res} =await this.$http.get(`findAchapter/${this.BookshelfbookId}/${this.charpterId}`)
                    this.charpterText=res.data[0].chapterText
                    this.charpterName=res.data[0].charpterName
                }else{
                    //从首页阅读，不记录书签
                    this.charpterId=this.charpterId+1
                    const {data:res} =await this.$http.get(`findAchapter/${this.bookId}/${this.charpterId}`)
                    this.charpterText=res.data[0].chapterText
                    this.charpterName=res.data[0].charpterName
                }

            }
        },
         async idfindcharpter(){
             const {data:res}=await this.$http.get(`idfindcharpter/${this.bookId}`)
             this.CharpterLength=parseInt(res.data.length)
             console.log(this.CharpterLength)

        }

    }
}
</script>
<style lang="less" scoped>
textarea {
        min-height:3000px;
        display: block;
        width: 100%;
        font-size: 19px;
        color: #000;
        line-height: 150%;
        border: none;
        resize: none;
        letter-spacing: 0.2em;
        margin: auto;
    }


.box_con {

    border: 2px solid #88C6E5;
    overflow: hidden;
    width: 976px;
    margin: 5px auto;
    h1{
        font: 25px 黑体;
        padding-top: 10px;
        text-align: center;
    }
    .bookname {
        border-bottom: 1px dashed #88C6E5;
        line-height: 30px;
        padding-top: 10px;
        margin-bottom: 10px;
        .bottem1 {
            clear: both!important;
            text-align: center;
            width: 960px;
            margin: 5px;
            a{
                    color: #085308;
                    font-size: 14px;
                    margin-left: 10px;
                    margin-right: 10px;
            }
        }
    }
    .content{
        font-family: 宋体;
        font-size: 19pt;
        letter-spacing: 0.2em;
        line-height: 150%;
        padding-top: 15px;
        width: 85%;
        margin: auto;
        }
}
a {
    color: #6F78A7;
    text-decoration: none;
}
</style>