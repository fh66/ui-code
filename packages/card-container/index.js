import CardContainer from './src/main.vue'
CardContainer.install = function(Vue) { 
    Vue.component(CardContainer.name, CardContainer);
};
export default CardContainer;
            
