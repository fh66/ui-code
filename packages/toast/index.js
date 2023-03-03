import Toast from './src/main.js'
Toast.install = function(Vue) {
    Vue.component(Toast.name, Toast);
};
export default Toast;
            
