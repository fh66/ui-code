import Overlay from './src/main.vue'
Overlay.install = function(Vue) { 
    Vue.component(Overlay.name, Overlay);
};
export default Overlay;
            
