<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manager' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号管理</el-breadcrumb-item>
      <el-breadcrumb-item>当前账号</el-breadcrumb-item>
    </el-breadcrumb>

      <el-row>
        <el-col :span="11">
          <el-card>
            <div>管理员账号： {{managerId}}</div>
            <div>管理员头像</div>
        <img :src="managerImage" alt="" class="a" />
          </el-card>
        </el-col>
        <el-col :span="11">        
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-card>
            <div >平台书籍统计
              <div>书籍总数：{{bookTotal}}</div>
              <div id="myChart1" style=" height:300px;width:660px"></div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="11">
          <el-card >
            <div >平台用户统计</div>
            <div>用户总数:{{userTotal}}</div>
              <div id="myChart2" style="height:300px;width:400px"></div>
          </el-card> 
        </el-col>
      </el-row>
     <el-row>
        <el-col :span="11">
          <el-card>
            <div>用户收藏统计</div>
            <div>收藏次数:{{allBookshelf}}</div>
            <div id="myChart3" style="height:400px;width:400px"></div>
          </el-card>
        </el-col>

      </el-row>

  </div>
</template>

  <script >
  import * as echarts from 'echarts'
    export default {
      data() {
        return {
          allBookshelf:0,
          userTotal:10,
          allclass:[],
          //echarts
          bookTotal:10,
option1 : {
  title: {
    text: '',
    subtext: '分类统计',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: "1", name: 'asd' },
        { value: "123", name: 'qwe' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
},    
option2 : {
  xAxis: {
    type: 'category',
    data: ['男', '女',]
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 150,],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
},  
option3 : {
 tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 0,name: '历史演义' },
        { value: 0, name: '英雄传奇' },
        { value: 0, name: '神话鬼怪' },
        { value: 0, name: '世态人情' },
        { value: 0, name: '讽刺悬疑' },
        { value: 0, name: '学术杂书' },
        { value: 0, name: '杂剧戏曲' },
        { value: 0, name: '笔记日记' },
        { value: 0, name: '古典武侠' }, 
      ]
    }
  ],
  
}, 
          managerId:window.sessionStorage.currentManagerAccount,
          managerImage:window.sessionStorage.currentManagerImage,
          changeForm:{
            // managerId:"1",
            // account:"asd",
            // password:"123"
          },
          changeManagerVisible:false,
          tableData: []
          // {
          //   managerId: '1',
          //   account: '123',
          //   password: '123',
          // }
        }
      },
      created(){
        this.getOption1()
        this.getOption2()
        this.getOption3()
      },mounted(){
        this.rawLine();
      },methods:{
        rawLine(){             
          const myChart1=echarts.init(document.getElementById("myChart1"));
          myChart1.setOption(this.option1);
          const myChart2=echarts.init(document.getElementById("myChart2"))
          myChart2.setOption(this.option2);
          const myChart3=echarts.init(document.getElementById("myChart3"))
          myChart3.setOption(this.option3);

        },
        async getOption1(){
          const {data:result}=await this.$http.get('/getoption1')
          var results=result.data
          this.bookTotal=result.total
          var data=[]
            for( var key in results){
              var obj={}
                obj={
                  value:results[key],
                  name:key,
                }
              data.push(obj)
            }
            var chart1=echarts.getInstanceByDom(document.getElementById("myChart1"))
            var option1=chart1.getOption()
            option1.series[0].data=data
            chart1.setOption(option1)

        },
        async getOption2(){
          const {data:result}=await this.$http.get('/getoption2')
          this.userTotal=result.total
          var chart2=echarts.getInstanceByDom(document.getElementById("myChart2"))
            var option2=chart2.getOption()
            option2.series[0].data=result.data
            chart2.setOption(option2)
            // console.log(option2.series[0].data)
        },
        async getOption3(){
          const {data:res}=await this.$http.get(`getAllbooshelf`)
          this.allBookshelf=res.data.length
          const myChart3=echarts.init(document.getElementById("myChart3"))
          //   var option3=chart3.getOption()
          for(var i=0;i<res.data.length;i++){
            this.option3.series[0].data[res.data[i].classifyId-1].value+=1
          // console.log(res.data[i].bookId-1)
          }
          console.log(this.option3.series[0].data)
          
            myChart3.setOption(this.option3)
        }
      },
    }
  </script>
  <<style scoped>
  .a{
    width: 100px;

height: 100px;

border: 1px solid black;

background-color: black;

border-radius: 100%;
  }
  </style>