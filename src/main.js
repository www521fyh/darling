//从vue中引出createApp创建vue实例
import { createApp } from 'vue'
import App from './App.vue'
//引入ElementPlusIconsVue 中所有的组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//引入mock，让其生效
import "./api/mock.js"
import store from "./store.js"
import api from './api/api'
//引入路由
import router from "./router/index.js"

const app = createApp(App)

//for循环，注册ElementPlusIconsVue 的组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.config.globalProperties.$api = api
app.use(store)
app.use(router)
app.mount('#app')
