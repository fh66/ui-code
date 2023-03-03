import Image from './src/main.vue'
Image.install = function(Vue) { 
    Vue.component(Image.name, Image);
};
export default Image;
            
