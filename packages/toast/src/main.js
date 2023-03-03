import Vue from 'vue';
import { isObject, isVNode } from '@/utils/types'
import Main from './main.vue';
let MessageConstructor = Vue.extend(Main);
let instance;
let instances = [];
let seed = 1;
const Toast = function(options){
    let userOnClose = options.onClose;  // 传入close方法
    let id = 'message_' + seed++;      // 每一个实例独有ID
    options.onClose = function() {     // 实例关闭方法
        Toast.close(id, userOnClose);
    };
    instance = new MessageConstructor({
        data: options
    });
    instance.id = id;
    instance.$mount();   // 实例化
    document.body.appendChild(instance.$el);  // 加入dom
    let verticalOffset = options.offset || '50%'; // 消息弹窗高度
    if (options.position === 'top' || options.position === 'bottom') {
        verticalOffset = '20%'
    }
    instances.forEach(item => {
        if (verticalOffset.indexOf('%') != -1) return
        verticalOffset += item.$el.offsetHeight + 16;
    });
    instance.verticalOffset = verticalOffset;
    instance.visible = true;
    instances.push(instance);
    return instance;
};
['success', 'warning', 'info', 'error','fail'].forEach(type => {
    Toast[type] = (options) => {
        if (isObject(options) && !isVNode(options)) {
            return Toast({
                ...options,
                type
            });
        }
        return Toast({
            type,
            message: options
        });
    };
});
// 创建message实例
Toast.close = function(id, userOnClose){
    let len = instances.length;
    let index = -1;
    // eslint-disable-next-line no-unused-vars
    let removedHeight;
    for (let i = 0; i < len; i++) {
        if (id === instances[i].id) {
            removedHeight = instances[i].$el.offsetHeight;
            index = i;
            if (typeof userOnClose === 'function') {
                userOnClose(instances[i]);
            }
            instances.splice(i, 1);
            break;
        }
    }
    if (len <= 1 || index === -1 || index > instances.length - 1) return;
    // for (let i = index; i < len - 1 ; i++) {
    //     let dom = instances[i].$el;
    //     dom.style['top'] = parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px';
    //     console.log(dom.style, 'top');
    // }
}
// 销毁某个message实例 seed为唯一id
Toast.closeAll = function(){
    for (let i = instances.length - 1; i >= 0; i--) {
        instances[i].close();
    }
}   // 销毁所有message实例

export default Toast