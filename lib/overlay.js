module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=83)}({1:function(e,t,n){"use strict";function r(e,t,n,r,o,i,s,a){var l,u="function"==typeof e?e.options:e;if(t&&(u.render=t,u.staticRenderFns=n,u._compiled=!0),r&&(u.functional=!0),i&&(u._scopeId="data-v-"+i),s?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},u._ssrRegister=l):o&&(l=a?function(){o.call(this,(u.functional?this.parent:this).$root.$options.shadowRoot)}:o),l)if(u.functional){u._injectStyles=l;var c=u.render;u.render=function(e,t){return l.call(t),c(e,t)}}else{var f=u.beforeCreate;u.beforeCreate=f?[].concat(f,l):[l]}return{exports:e,options:u}}n.d(t,"a",function(){return r})},14:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isShow?n("div",{staticClass:"gm-m-overlay",class:[e.className?e.className:""],style:Object.assign({},{zIndex:e.zIndex},e.isSverlayStyle),attrs:{refs:"overlay"},on:{click:e.handleClick}},[e._t("default")],2):e._e()};r._withStripped=!0;var o={name:"GmMOverlay",props:{zIndex:[String,Number],className:String,customStyle:String,show:Boolean},data:()=>({popupShow:!1,overlayStyle:{}}),computed:{isShow(){return!(!this.show&&!this.popupShow)},isSverlayStyle(){let e;return console.log(this.customStyle),e=void 0===this.customStyle?this.overlayStyle:this.customStyle}},methods:{handleClick(e){this.$emit("click",e)}}},i=n(1),s=Object(i.a)(o,r,[],!1,null,null,null);s.options.__file="packages/overlay/src/main.vue";t.a=s.exports},83:function(e,t,n){"use strict";n.r(t);var r=n(14);r.a.install=function(e){e.component(r.a.name,r.a)},t.default=r.a}});