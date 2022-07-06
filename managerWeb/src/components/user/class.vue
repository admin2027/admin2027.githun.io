<template>
<div class="ll" >
                    <div class="item" v-for="item in classBookList" :key="item.id"  >
                    <div class="image">
                        <a href="#" >
                        <img :src="item.img" alt="" width="120" height="150">
                        </a>
                    </div>
                    <dl>
                        <dt>
                        <!-- 作者 -->
                        <span>{{item.auther}}</span>
                        <!-- 书名 -->
                        <router-link  :to="{path:`/webBook/${item.id}`}">{{item.name}}</router-link>
                        </dt>
                        <dd>{{item.text}}</dd>
                    </dl>
                    </div>
                    
            </div>
</template>
<script>
export default {
    data(){
        return{
            classid:"",
            classBookList:{
            }
        }
    },created(){
        this.classid=this.$route.params.id
        this.classbookList()
    },methods:{
        async classbookList(){
            const {data:res} =await this.$http.get(`classBookList/${this.classid}`)
            this.classBookList=res.data
            console.log(this.classBookList)
        }
    }
}
</script>
<style lang="less" scoped>
    .ll {
        border: 3px solid #C8D4E1;
        margin: 10px auto;
        padding: 5px;
        float: left;
        width: 964px;
        height: 100%;
        overflow: hidden;
        .item {
        width: 315px;
        float: left;
        padding: 5px 0px 0px 5px;
        margin: auto;
        .image {
            float: left;
            width: 120px;

        }             dl {
                margin: auto;
                padding: 0px 5px 0px 0px;
                float: right;
                width: 180px;
                 dt {
                    height: 25px;
                    line-height: 25px;
                    overflow: hidden;
                    font-size: 14px;
                    border-bottom: dotted 1px #6191D0;
                    font-weight: bold;
                    span {
                        float: right;
                        font-weight: normal;
                    }
                }
                 dd {
                     margin: auto;
                        padding: 7px 0px 0px 0px;
                        line-height: 20px;
                        color: #9E9E9E;
                        text-indent: 2em;
                        height: 120px;
                        overflow: hidden;
                    }
            }
    }
}
a {
    color: #6F78A7;
    text-decoration: none;
}
</style>