import Vue from 'vue'
import App from './App.vue'
// 导入axios
import axios from 'axios'
// 将axios变成vue的一个属性
Vue.prototype.$axios = axios;
// 将axios访问api接口中相同的部分设为默认模式
axios.defaults.baseURL = '/api'
    // 导入 Element_ui
import ElementUI from 'element-ui'
// 导入 Element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'
// 插件 Element-ui
Vue.use(ElementUI)

// 导入全局初始化样式
import './assets/index.css'

// 导入路由模块
import router from 'router/index.js'
// import store from 'store'



// Aplayer.disableVersionBadge = true

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    // 挂载到Vue示例上
    router,
    // store,
    beforeCreate() {
        // 生成一个全局总线组件
        Vue.prototype.$bus = this
    }
}).$mount('#app')