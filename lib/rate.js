module.exports=function(t){var e={};function i(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=40)}({1:function(t,e,i){"use strict";function n(t,e,i,n,o,r,a,c){var l,s="function"==typeof t?t.options:t;if(e&&(s.render=e,s.staticRenderFns=i,s._compiled=!0),n&&(s.functional=!0),r&&(s._scopeId="data-v-"+r),a?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},s._ssrRegister=l):o&&(l=c?function(){o.call(this,(s.functional?this.parent:this).$root.$options.shadowRoot)}:o),l)if(s.functional){s._injectStyles=l;var u=s.render;s.render=function(t,e){return l.call(e),u(t,e)}}else{var d=s.beforeCreate;s.beforeCreate=d?[].concat(d,l):[l]}return{exports:t,options:s}}i.d(e,"a",function(){return n})},40:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"gm-m-rate"},t._l(t.countList,function(e){return i("div",{key:e.id,ref:"items",refInFor:!0,staticClass:"gm-m-rate__items",on:{touchstart:t.onTouchstart,touchmove:t.bodyTouchMove}},[i("i",{staticClass:"gm-m-rate__content",class:[e.icon,e.id<=t.id?e.active="active":"",t.disabled?"gm-m-rate__disabled":""],style:{color:t.disabled?t.disabledColor:"active"===e.active?t.color:t.voidColor,fontSize:t.size,paddingRight:t.gutter},on:{click:function(i){return t.handleClick(e,"all")}}}),t.allowHalf?i("i",{staticClass:"gm-m-rate__half",class:[e.icon,e.id<=t.id?e.activeHalf="activeHalf":""],style:{color:t.disabled?t.disabledColor:"activeHalf"===e.activeHalf?t.color:t.voidColor,fontSize:t.size,paddingRight:t.gutter},on:{click:function(i){return t.handleClick(e,"half")}}}):t._e()])}),0)};n._withStripped=!0;var o={name:"GmMRate",props:{count:{type:[Number,String],default:5},value:{type:Number,default:0},voidIcon:String,icon:String,color:{type:String,default:"#ff5f3b"},voidColor:{type:String,default:"#c8c9cc"},size:{type:[String,Number],default:"20px"},gutter:{type:[String,Number]},disabled:Boolean,readonly:Boolean,disabledColor:{type:String,default:"#c8c9cc"},allowHalf:Boolean,touchable:Boolean},model:{prop:"value",event:"handleClick"},data:()=>({id:null,ranges:[]}),computed:{fontSize(){return"number"==typeof this.size?this.size+"px":this.size},countList(){let t=[];for(let e=1;e<=this.count;e++){let i={};i.id=e,i.icon=void 0===this.voidIcon?"gm-m-icon-iocn-xingping1":this.voidIcon,i.active="",i.activeHalf="",t.push(i)}return t}},watch:{countList:{handler:function(t){this.id=this.value,this.active(this.id)},immediate:!0}},methods:{handleClick(t,e){if(this.disabled||this.readonly)return;let i="all"===e?t.id:t.id-.5;this.id=i,this.active(i),this.$emit("handleClick",i),this.$emit("change",i)},active(t){this.countList.forEach(e=>{e.id<=t?(e.active="active",e.icon=void 0===this.icon?"gm-m-icon-iocn-xingping1":this.icon):(e.active="",e.activeHalf="",e.icon=void 0===this.voidIcon?"gm-m-icon-iocn-xingping1":this.voidIcon)}),Number.isInteger(t)||(this.countList[Math.ceil(t)-1].activeHalf="activeHalf",this.countList[Math.ceil(t)-1].icon=void 0===this.icon?"gm-m-icon-iocn-xingping1":this.icon)},onTouchstart(t){let e=this,i=[];this.$refs.items.map(function(t){return t.getBoundingClientRect()}).forEach(function(t,n){e.allowHalf?i.push({score:n+.5,left:t.left},{score:n+1,left:t.left+t.width/2}):i.push({score:n+1,left:t.left})}),this.ranges=i},bodyTouchMove(t){let e=t.touches[0].clientX;this.getScoreByPosition(e);let i=void 0,n=null;i=Number.isInteger(this.getScoreByPosition(e))?"all":"half",n=Math.ceil(this.getScoreByPosition(e)),this.handleClick(this.countList[n-1],i)},getScoreByPosition:function(t){for(var e=this.ranges.length-1;e>0;e--)if(t>this.ranges[e].left)return this.ranges[e].score;return this.allowHalf?.5:1}}},r=i(1),a=Object(r.a)(o,n,[],!1,null,null,null);a.options.__file="packages/rate/src/main.vue";var c=a.exports;c.install=function(t){t.component(c.name,c)};e.default=c}});