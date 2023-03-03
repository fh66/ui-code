import Cell from './src/main.vue'
Cell.install = function(Vue) { 
    Vue.component(Cell.name, Cell);
};
export default Cell;
            
