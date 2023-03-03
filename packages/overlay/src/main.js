import Vue from 'vue'
import Main from './main.vue';
let OverlayConstructor = Vue.extend(Main)
let instance;
let instances = [];
let seed = 1;
const GmMOverlay = function (options){
    let id = 'overlay'+seed++;
    console.log(options);
    instance = new OverlayConstructor({
        data: options
    })
    instance.id = id;
    instance.$mount();
    document.body.appendChild(instance.$el);  // 加入dom
    instances.push(instance);
    return instance;
}
// 创建message实例
GmMOverlay.close = function(){
    document.body.removeChild(instance.$el)
}
export default GmMOverlay