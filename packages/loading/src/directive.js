/*
 * @Author: your name
 * @Date: 2022-03-01 11:15:02
 * @LastEditors: Please set LastEditors
 * @Description: 插入根节点锚点
 * @FilePath: \gm-ui-code\packages\root-anchor\src\directive.js
 */
import Loading from './main.vue';
const Mask = Vue.extend(Loading);
const directive = {};
directive.install = Vue => {
  Vue.directive('loading', {
    bind: function(el, binding, vnode) {
      const textExr = el.getAttribute('element-loading-text');
      const spinnerExr = el.getAttribute('element-loading-spinner');
      const backgroundExr = el.getAttribute('element-loading-background');
      const customClassExr = el.getAttribute('element-loading-custom-class');
      const vm = vnode.context;
      const mask = new Mask({
        el: document.createElement('div'),
        data: {
          text: vm && vm[textExr] || textExr,
          spinner: vm && vm[spinnerExr] || spinnerExr,
          background: vm && vm[backgroundExr] || backgroundExr,
          customClass: vm && vm[customClassExr] || customClassExr,
          fullscreen: !!binding.modifiers.fullscreen
        }
      });
      el.instance = mask;
      el.mask = mask.$el;
      el.maskStyle = {};
  
      // binding.value && toggleLoading(el, binding);
    },
  
    update: function(el, binding) {
      el.instance.setText(el.getAttribute('element-loading-text'));
      if (binding.oldValue !== binding.value) {
        // toggleLoading(el, binding);
      }
    },
  
    unbind: function(el, binding) {
      if (el.domInserted) {
        el.mask &&
        el.mask.parentNode &&
        el.mask.parentNode.removeChild(el.mask);
        // toggleLoading(el, { value: false, modifiers: binding.modifiers });
      }
      el.instance && el.instance.$destroy();// 销毁
    }
  });
}
export default directive;
