module.exports=function(e){var t={};function i(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=e,i.c=t,i.d=function(e,t,o){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(o,n,function(t){return e[t]}.bind(null,n));return o},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=43)}({1:function(e,t,i){"use strict";function o(e,t,i,o,n,s,c,r){var a,l="function"==typeof e?e.options:e;if(t&&(l.render=t,l.staticRenderFns=i,l._compiled=!0),o&&(l.functional=!0),s&&(l._scopeId="data-v-"+s),c?(a=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(c)},l._ssrRegister=a):n&&(a=r?function(){n.call(this,(l.functional?this.parent:this).$root.$options.shadowRoot)}:n),a)if(l.functional){l._injectStyles=a;var u=l.render;l.render=function(e,t){return a.call(t),u(e,t)}}else{var d=l.beforeCreate;l.beforeCreate=d?[].concat(d,a):[a]}return{exports:e,options:l}}i.d(t,"a",function(){return o})},43:function(e,t,i){"use strict";i.r(t);var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"gm-m-checkbox",class:[{"is-disabled":e.isDisabled,"is-checked":e.isChecked}],attrs:{id:e.id},on:{click:e.handleClick}},["left"===e.labelPosition?[e.$slots.default||e.name?i("span",{staticClass:"gm-m-checkbox__label"},[e._t("default"),e.$slots.default?e._e():[e._v(e._s(e.name))]],2):e._e()]:e._e(),i("span",{ref:"icons",staticClass:"gm-m-checkbox__input",class:{"is-disabled":e.isDisabled,"is-indeterminate":e.indeterminate,"is-checked":e.isChecked,"is-focus":e.focus},attrs:{tabindex:!!e.indeterminate&&0,role:!!e.indeterminate&&"checkbox","aria-checked":!!e.indeterminate&&"mixed"}},[e.$scopedSlots.icon?[e._t("icon",null,{checked:e.checked})]:[e.isChecked?i("i",{staticClass:"gm-m-icon-orange_gouxuan",class:[e.isDisabled?"gm-m-checkbox_disabled":""],style:{fontSize:e.isIconSize,color:e.isCheckedColor}}):i("i",{staticClass:"gm-m-icon-i-no_gouxuan",class:[e.isDisabled?"gm-m-checkbox_disabled":""],style:{fontSize:e.isIconSize}})]],2),"right"===e.labelPosition?[e.$slots.default||e.name?i("span",{staticClass:"gm-m-checkbox__label"},[e._t("default"),e.$slots.default?e._e():[e._v(e._s(e.name))]],2):e._e()]:e._e()],2)};o._withStripped=!0;var n={name:"GmMCheckbox",mixins:[i(9).a],props:{value:{},name:{},indeterminate:Boolean,disabled:Boolean,id:String,controls:String,shape:String,labelDisabled:Boolean,labelPosition:{type:String,default:"right"},iconSize:{type:[String,Number],default:"20px"},checkedColor:{type:String,default:"#1989fa"}},data:()=>({selfModel:!1,focus:!1,isLimitExceeded:!1,checked:!1}),computed:{isIconSize(){return this.isGroup?this._checkboxGroup.iconSize?-1!=this._checkboxGroup.iconSize.indexOf("p")?this._checkboxGroup.iconSize:this._checkboxGroup.iconSize+"px":void 0:-1!=this.iconSize.indexOf("p")?this.iconSize:this.iconSize+"px"},isCheckedColor(){return this.isGroup&&this._checkboxGroup.checkedColor?this._checkboxGroup.checkedColor:this.checkedColor},isGroup(){let e=this.$parent;for(;e;){if("GmMCheckboxGroup"===e.$options.componentName)return this._checkboxGroup=e,!0;e=e.$parent}return!1},isDisabled(){return this.isGroup?this._checkboxGroup.disabled:this.disabled},isChecked:{get(){return this._checkboxGroup?-1!==this._checkboxGroup.value.indexOf(this.name):this.value},set(e){this._checkboxGroup?this.setParentValue(e):this.$emit("input",e)}}},watch:{value:function(e){this.$emit("change",e)}},methods:{handleClick(e){let t=this,i=e.target,o=this.$refs.icons,n=o===i||(null==o?void 0:o.contains(i));this.isDisabled||!n&&this.labelDisabled?this.$emit("click",e):(this.toggle(),setTimeout(function(){t.$emit("click",e)}))},toggle:function(e){let t=this;void 0===e&&(e=!this.isChecked,this.checked=e),clearTimeout(this.toggleTask),this.toggleTask=setTimeout(function(){t.isChecked=e,this.checked=e})},setParentValue(e){console.log(e,"val");let t=this._checkboxGroup,i=t.value;if(e){if(t.max&&i.length>=t.max)return;-1===i.indexOf(this.name)&&(i.push(this.name),this._checkboxGroup.$emit("input",i))}else{let e=i.indexOf(this.name);-1!==e&&(i.splice(e,1),t.$emit("input",i))}}}},s=i(1),c=Object(s.a)(n,o,[],!1,null,null,null);c.options.__file="packages/checkbox/src/main.vue";var r=c.exports;r.install=function(e){e.component(r.name,r)};t.default=r},9:function(e,t,i){"use strict";t.a={methods:{dispatch(e,t,i){let o=this.$parent||this.$root,n=o.$options.componentName;for(;o&&(!n||n!==e);)(o=o.$parent)&&(n=o.$options.componentName);o&&o.$emit.apply(o,[t].concat(i))},broadcast(e,t,i){(function e(t,i,o){this.$children.forEach(n=>{n.$options.componentName===t?n.$emit.apply(n,[i].concat(o)):e.apply(n,[t,i].concat([o]))})}).call(this,e,t,i)}}}}});