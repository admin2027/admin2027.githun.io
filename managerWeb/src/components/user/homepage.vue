<template>
<div>
    <!-- 推荐书籍 -->
    <div id="hotcontent" class="mt10">
        <!-- 推荐书籍 -->
            <div class="l" >
                    <div class="item" v-for="item in allbookList" :key="item.id"  >
                    <div class="image">
                        <router-link :to="{path:`/webBook/${item.id}`}">
                        <img :src="item.img" alt="大主宰" width="120" height="150">
                        </router-link>
                    </div>
                    <dl>
                        <dt>
                        <!-- 作者 -->
                        <span>{{item.auther}}</span>
                        <!-- 书名 -->
                        <router-link :to="{path:`webBook/${item.id}`}">{{item.name}}</router-link>
                        </dt>
                        <dd>{{item.text}}</dd>
                    </dl>
                    </div>
                    
            </div>
            <!-- 推荐榜单 -->
            <div class="r">
                <h2>思维网推荐</h2>
                <ul>
                <li v-for="item in allbookList" :key="item.id" >
                <span class="s1">[{{item.class}}]</span>
                    <span class="s2">
                    <router-link :to="{path:`webBook/${item.id}`}">{{item.name}}</router-link>
                    </span>
                    <span class="s5">{{item.auther}}</span>
                </li>
                </ul>
            </div>
            <div class="clear"></div>
    </div>
    <!-- 分类排行 -->
    <div class="novelslist">
        <div class="content">
            <h2>历史演义</h2>
            <div class="top">
                <div class="image">
                    <img :src="lsyyList[0].img" alt="">
                </div>
                <dl>
                    <dt>
                        <router-link :to="{path:`webBook/${lsyyList[0].id}`}">{{lsyyList[0].name}}</router-link>
                    </dt>
                    <dd>{{lsyyList[0].text}}
                    </dd>
                </dl>
                <div class="clear"></div>
            </div>
            <ul>
                <li  v-for="item in lsyyList" :key="item.id">
                    <router-link :to="{path:`webBook/${item.id}`}">{{item.name}}</router-link>"/{{item.auther}}"
                    </li>
                
            </ul>
        </div>
        <div class="content">
            <h2>英雄传奇</h2>
            <div class="top">
                <div class="image">
                    <img :src="yxcqList[0].img" alt="">
                </div>
                <dl>
                    <dt>
                        <router-link :to="{path:`webBook/${yxcqList[0].id}`}">{{yxcqList[0].name}}</router-link>
                        
                    </dt>
                    <dd>{{yxcqList[0].text}}
                    </dd>
                </dl>
                <div class="clear"></div>
            </div>
            <ul>
               <li  v-for="item in yxcqList" :key="item.id">
                    <router-link :to="{path:`webBook/${item.id}`}">{{item.name}}</router-link>"/{{item.auther}}"
                    </li>
                
            </ul>
        </div>
        <div class="content">
            <h2>神话鬼怪</h2>
            <div class="top">
                <div class="image">
                    <img :src="ggshList[0].img" alt="">
                </div>
                <dl>
                    <dt>
                        <router-link :to="{path:`webBook/${ggshList[0].id}`}">{{ggshList[0].name}}</router-link>
                    </dt>
                    <dd>{{ggshList[0].text}}
                    </dd>
                </dl>
                <div class="clear"></div>
            </div>
            <ul>
               <li  v-for="item in ggshList" :key="item.id">
                    <router-link :to="{path:`webBook/${item.id}`}">{{item.name}}</router-link>"/{{item.auther}}"
                    </li>
            </ul>
        </div>
        <div class="clear"></div>
    </div>
    <!-- 分类排行 -->
    <div class="novelslist">
        <div class="content">
            <h2>世态人情</h2>
            <div class="top">
                <div class="image">
                    <img :src="strqList[0].img" alt="">
                </div>
                <dl>
                    <dt>
                        <router-link :to="{path:`webBook/${strqList[0].id}`}">{{strqList[0].name}}</router-link>
                    </dt>
                    <dd>{{strqList[0].text}}
                    </dd>
                </dl>
                <div class="clear"></div>
            </div>
            <ul>
                <li  v-for="item in strqList" :key="item.id">
                    <router-link :to="{path:`webBook/${item.id}`}">{{item.name}}</router-link>"/{{item.auther}}"
                    </li>
            </ul>
        </div>
        <div class="content">
            <h2>讽刺悬疑</h2>
            <div class="top">
                <div class="image">
                    <img :src="fcxyList[0].img" alt="">
                </div>
                <dl>
                    <dt>
                        <router-link :to="{path:`webBook/${fcxyList[0].id}`}">{{fcxyList[0].name}}</router-link>
                    </dt>
                    <dd>{{fcxyList[0].text}}
                    </dd>
                </dl>
                <div class="clear"></div>
            </div>
            <ul>
                <li  v-for="item in fcxyList" :key="item.id">
                   <router-link :to="{path:`webBook/${item.id}`}">{{item.name}}</router-link>"/{{item.auther}}"
                    </li>
            </ul>
        </div>
        <div class="content">
            <h2>学术杂书</h2>
            <div class="top">
                <div class="image">
                    <img :src="xszsList[0].img" alt="">
                </div>
                <dl>
                    <dt>
                       <router-link :to="{path:`webBook/${xszsList[0].id}`}">{{xszsList[0].name}}</router-link>
                    </dt>
                    <dd>{{xszsList[0].text}}
                    </dd>
                </dl>
                <div class="clear"></div>
            </div>
            <ul>
                <li  v-for="item in xszsList" :key="item.id">
                    <router-link :to="{path:`webBook/${item.id}`}">{{item.name}}</router-link>"/{{item.auther}}"
                    </li>
            </ul>
        </div>
        <div class="clear"></div>
    </div>
    <!-- 分类排行 -->
    <div class="novelslist">
        <div class="content">
            <h2>杂剧戏曲</h2>
            <div class="top">
                <div class="image">
                    <img :src="zjxqList[0].img" alt="">
                </div>
                <dl>
                    <dt>
                       <router-link :to="{path:`webBook/${zjxqList[0].id}`}">{{zjxqList[0].name}}</router-link>
                    </dt>
                    <dd>{{zjxqList[0].text}}
                    </dd>
                </dl>
                <div class="clear"></div>
            </div>
            <ul>
                <li  v-for="item in zjxqList" :key="item.id">
                     <router-link :to="{path:`webBook/${item.id}`}">{{item.name}}</router-link>"/{{item.auther}}"
                    </li>
            </ul>
        </div>
        <div class="content">
            <h2>笔记日记</h2>
            <div class="top">
                <div class="image">
                    <img :src="bjrjList[0].img" alt="">
                </div>
                <dl>
                    <dt>
                         <router-link :to="{path:`webBook/${bjrjList[0].id}`}">{{bjrjList[0].name}}</router-link>
                    </dt>
                    <dd>{{bjrjList[0].text}}
                    </dd>
                </dl>
                <div class="clear"></div>
            </div>
            <ul>
                <li  v-for="item in bjrjList" :key="item.id">
                   <router-link :to="{path:`webBook/${item.id}`}">{{item.name}}</router-link>"/{{item.auther}}"
                </li>
            </ul>
        </div>
        <div class="content">
            <h2>古典武侠</h2>
            <div class="top">
                <div class="image">
                    <img :src="gdwxList[0].img" alt="">
                </div>
                <dl>
                    <dt>
                         <router-link :to="{path:`webBook/${gdwxList[0].id}`}">{{gdwxList[0].name}}</router-link>
                    </dt>
                    <dd>{{gdwxList[0].text}}
                    </dd>
                </dl>
                <div class="clear"></div>
            </div>
            <ul>
                <li  v-for="item in gdwxList" :key="item.id">
                    <router-link :to="{path:`webBook/${item.id}`}">{{item.name}}</router-link>"/{{item.auther}}"
                </li>
            </ul>
        </div>
        <div class="clear"></div>
    </div>
    
</div>

</template>
<script>
export default {
  data() {
    return {
        queryinfo:{
            searchName:"",
              pagenum: 1,
              pagesize: 9},
        allbookList:{
            
        },
        //历史演义
        lsyyList:[
            {
                img:"",
                name:"",
                text:""
        }
        ],
        //英雄传奇
        yxcqList:[ {
                img:"",
                name:"",
                text:""
        }],
        //神话鬼怪
        ggshList:[ {
                img:"",
                name:"",
                text:""
        }],
        //世态人情
        strqList:[ {
                img:"",
                name:"",
                text:""
        }],
        //讽刺悬疑
        fcxyList:[ {
                img:"",
                name:"",
                text:""
        }],
        //学术杂书
        xszsList:[ {
                img:"",
                name:"",
                text:""
        }],
        //杂剧戏曲
        zjxqList:[ {
                img:"",
                name:"",
                text:""
        }],
        //笔记日记
        bjrjList:[ {
                img:"",
                name:"",
                text:""
        }],
        //古典武侠
        gdwxList:[ {
                img:"",
                name:"",
                text:""
        }],
    };
  },created(){

      this.getbookList()
    //历史演义
      this.getlsyyList()
    //英雄传奇
      this.getyxcqList()
    //神话鬼怪
      this.getggshList()
    //世态人情
      this.getstrqList()
    //讽刺悬疑
      this.getfcxyList()
    //学术杂书
      this.getxszsList()
    //杂剧戏曲
      this.getzjxqList()
    //笔记日记
      this.getbjrjList()
    //古典武侠
      this.getgdwxList()
  },methods:{
      //获取推荐图书
      async getbookList(){
          const {data:result}=await this.$http.get('getbooksList',{params: this.queryinfo})
          this.allbookList=result.data.goods
        //   console.log(result.data.goods)
        // console.log("Asd")
        //   console.log(this.allbookList)
      },
      //获取历史演义
      async getlsyyList(){
          const {data:result}=await this.$http.get('getlsyyList')
          this.lsyyList=result.data
      },
      //英雄传奇
      async getyxcqList(){
            const {data:result}=await this.$http.get('getyxcqList')
          this.yxcqList=result.data
      },
            //神话鬼怪
      async getggshList(){
            const {data:result}=await this.$http.get('getggshList')
          this.ggshList=result.data
        //   console.log("asdasdasdsa")
        //   console.log(this.ggshList)
      },
            //世态人情
      async getstrqList(){
            const {data:result}=await this.$http.get('getstrqList')
          this.strqList=result.data
      },
            //讽刺悬疑
      async getfcxyList(){
            const {data:result}=await this.$http.get('getfcxyList')
          this.fcxyList=result.data
      },
            //学术杂书
      async getxszsList(){
            const {data:result}=await this.$http.get('getxszsList')
          this.xszsList=result.data
      },
            //杂剧戏曲
      async getzjxqList(){
            const {data:result}=await this.$http.get('getzjxqList')
          this.zjxqList=result.data
      },
            //笔记日记
      async getbjrjList(){
            const {data:result}=await this.$http.get('getbjrjList')
          this.bjrjList=result.data
      },
            //古典武侠
      async getgdwxList(){
            const {data:result}=await this.$http.get('getgdwxList')
          this.gdwxList=result.data
      },
      
  }
}
</script>
<style lang='less' scoped>
#hotcontent {
    padding-top: 0px;
    margin: auto;
    padding: 0;
      .r{
        border: 3px solid #C3DFEA;
        float: right;
        width: 265px;
        background: #FEF9EF;
        h2{
          background-color: #E1ECED;
          border-bottom: 1px solid #DDD;
          font-size: 14px;
          font-weight: 700;
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          margin: 0;
          padding: 0 0 0 10px
        }
        ul{
          padding: 1px 10px;
          margin: auto;
          li{
            border-bottom: 1px solid #DDDDDD;
            height: 28px;
            line-height: 28px;
            overflow: hidden;
            padding: 5px 0 0;
            list-style: none outside none;
            margin: auto;
            .s1{
              width:70px
            }
            .s2{
              color: #B3B3B3;
            }
            .s5{
              float: right;
              text-align: right;
            }
            span{
              display: inline-block;
            }
          }
        }
      }
      .l {
        background: none repeat scroll 0 0 #FEF9EF;
        border: 3px solid #C3DFEA;
        float: left;
        height: 327px;
        overflow: hidden;
        width: 695px;
        padding: 0 0 10px;
        .item{
            float: left;
            width: 335px;
            padding: 10px 0 0 10px;
            .image{
                  float: left;
                  width: 120px;
              a{
                img{
                    margin: auto;
                    background-color: #FFF;
                    border: 1px solid #DDD;
                    padding: 1px;
                }
              }
            }
            dl{
              float: right;
            width: 190px;
            padding: 0 5px 0 0;
            margin: auto;
              span{
                  color: #B3B3B3;
                  float: right;
                  font-weight: 400;
                }
              dt{
                  border-bottom: 1px dotted #A6D3E8;
                  font-size: 14px;
                  font-weight: 700;
                  height: 25px;
                  // line-height: 25px;
                  overflow: hidden;
              }
              dd{
                height: 120px;
                line-height: 20px;
                overflow: hidden;
                text-indent: 2em;
                padding: 7px 0 0;
                margin-left: 0px;
              }
            }
    }
      }
      .dd{
    display: block;
    margin-inline-start: 40px;
      } 
}
.mt10 {
    margin-top: 5px;
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
a{
  color: #6F78A7;
    text-decoration: none;
}
.clear {
    clear: both;
}
.novelslist {
    margin: 10px auto;
    border: 3px solid #A6D3E8;
    width: 968px;
    padding: 3px;
    background: #FEF9EF;
    .border {
        border: 0px;
    }
    .content {
        border-right: dotted 1px #A6D3E8;
        padding: 0px 3px;
        float: left;
        width: 315px;
        .image {
                padding: 10px 0px 0px 5px;
                float: left;
                width: 71px;
                margin: auto;
                img {
                    width: 67px;
                    height: 82px;
                    border: solid 1px #DDDDDD;
                    padding: 1px;
                    background-color: white;
                }
        }
        dl {
            padding: 10px 0px 0px 0px;
            float: right;
            width: 219px;
            margin: auto;
            dd {
                line-height: 20px;
                height: 60px;
                overflow: hidden;
                margin: auto;
            }
            dt {
                height: 25px;
                line-height: 25px;
                overflow: hidden;
                font-weight: bold;
                margin: auto;
            }
        }
        ul {
            padding: 10px 0px 0px 0px;
            margin: auto;
            li {
                color: #B3B3B3;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                overflow: hidden;
                float: left;
                width: 155px;
            }
        }
    }
    h2 {
        background-color: #F6F8FE;
        border-bottom: solid 1px #A6D3E8;
        font-size: 14px;
        font-weight: bold;
        padding-left: 5px;
        line-height: 25px;
        height: 25px;
        overflow: hidden;
        margin: 0;
        padding: 0 0 0 10px;
    }
}
</style>