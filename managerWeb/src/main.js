import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {MessageBox} from 'element-ui';
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
import echarts from 'echarts'
import './assets/style/common.less'
Vue.prototype.$echarts=echarts
//是否确认弹框
Vue.prototype.$confirm = MessageBox.confirm;
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios
axios.interceptors.request.use(config => {
    console.log(config);
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')