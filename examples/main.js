import Vue from 'vue'
import App from './App.vue'
import router from './router'
import gmUi from '../src/index'
import '../packages/theme-chalk/src/index.less'
// import './fonts/iconfont.css'
Vue.config.productionTip = false
Vue.use(gmUi)
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
