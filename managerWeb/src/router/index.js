import Vue from 'vue'
import Router from 'vue-router'

//后台管理系统组件
import managerLogin from "../components/manager/Login.vue"
import managerHome from "../components/manager/Home.vue"
import Allbook from "../components/manager/allbook.vue"
import Addbook from "../components/manager/addbook.vue"
import User from "../components/manager/user.vue"
import Manager from "../components/manager/manager.vue"
import Shelf from "../components/manager/usershelf.vue"
import Welcome from"../components/manager/welcome"
import CharpterManager from"../components/manager/charpterManager.vue"
import Book from "../components/manager/book.vue"
import Charpter from "../components/manager/charpter.vue"
import UserLogin from "../components/user/Login.vue"
import Auther from "../components/manager/auther.vue"
import Autherbook from "../components/manager/autherbook.vue"
//主页组件
import webHome from "../components/user/home.vue"
import HomePage from "../components/user/homepage.vue"
import searchBook from"../components/user/search.vue"
import BookShelf from "../components/user/shelfbook.vue"
import Class from "../components/user/class.vue"
import WebBook from "../components/user/book.vue"
import WebCharpter from "../components/user/charpter.vue"
Vue.use(Router)
const originalPush=Router.prototype.push
Router.prototype.push=function push(location){
  return originalPush.call(this,location).catch(err=>err)
}
const router = new Router({
  routes: [
    { path: '/', redirect: '/WebHome' },
    //管理员登录界面
    { path: '/managerlogin',name:"managerlogin", component: managerLogin },
    //用户登录
    { path :'/userlogin',name:"userlogin",component:UserLogin},
    //后台管理系统路由
    {
      path: '/managerhome',
      component: managerHome,
      redirect: '/manager',
      children: [
        { path: '/allbook', component: Allbook },
        { path: '/addbook', component: Addbook },
        { path: "/user" , component:User},
        { path:"/manager",component:Manager},
        { path:'/usershelf',component:Shelf},
        { path:'/welcome',component:Welcome},
        { path:"/charpter",component:CharpterManager},
        { path:"/book/:id",name:"book",component:Book},
        { path:"/charpter/:bookid/:charpterid",name:"charpter",component:Charpter},
        { path:"/auther",component:Auther},
        { path:"/auther/:autherId",component:Autherbook}
      ]
    },
    //主页路由
    {
      path:"/WebHome",
      name:"WebHome",
      component:webHome,
      redirect: '/homepage',
      children:[
        {path:"/homepage",component:HomePage},
        {path:"/shelfbook",name:"shelfbook",component:BookShelf},
        {path:"/class/:id",component:Class},
        {path:"/webBook/:id",component:WebBook},
        {path:"/WebCharpter/:bookId/:charpterId",component:WebCharpter},
      ]
    },
    //主页搜索页面路由
    {path:"/searchBook",name:"searchBook",component:searchBook}
  ]
})

// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径
//   // from 代表从哪个路径跳转而来
//   // next 是一个函数，表示放行
//   //     next()  放行    next('/login')  强制跳转

//   if (to.path === '/login') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router
