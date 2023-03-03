/*
 * @Author: your name
 * @Date: 2022-03-01 11:15:02
 * @LastEditors: Please set LastEditors
 * @Description: 插入根节点锚点
 * @FilePath: \gm-ui-code\packages\root-anchor\src\directive.js
 */
import GmMRootAnchor from './main.vue';
const rootAnchorDirective = {};
rootAnchorDirective.install = Vue => {
  let MessageConstructor = Vue.extend(GmMRootAnchor);
  Vue.directive('gm-ui-root', {
    inserted: function (el) {
        let instance = new MessageConstructor({});
        instance.$mount();   // 实例化
        instance.$el.setAttribute('id','gm-ui-root');
        function getNodeRoot(el){
            if('body' === el.nodeName){
                return el;
            }else if(el.parentNode){
                return getNodeRoot(el.parentNode)
            }else{
                return el;
            }
        }
        let appendChild=function(){
            const _el = document.getElementById('gm-ui-root');
            getNodeRoot(_el).appendChild(instance.$el);
        }
        appendChild();
    }
  })
}
export default rootAnchorDirective;
