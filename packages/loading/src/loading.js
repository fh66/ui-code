/*
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \gm-ui-code\packages\loading\src\loading.js
 */
import { addUnit } from "../../../src/utils/format";
import { BEM as bem } from "../../../src/utils/create/bem";
function LoadingIcon(h, type) {
    const _type = {};
    _type[type] = type
    if (type === 'spinner') {
        const Spin = [];
        for (let i = 0; i < 12; i++) {
            Spin.push(h("i"));
        }
    let span = h('span', { class: ['gm-m-loading__spinner',bem('gm-m-loading__spinner')(_type)] }, Spin);
    console.log('span: ', span);
    return [span];
    }
    let circle = h('circle', { class: [], attrs: { cx: "50", cy: "50", r: "20", fill: "none" } });
    let svg = h('svg', { class: [], attrs: { viewBox: "25 25 50 50" } }, [circle]);
    return [svg];
}
export default {
    name: "GmMLoading",
    props: {
        color: String,
        size: [Number, String],
        vertical: Boolean,
        textSize: [Number, String],
        textColor: String,
        type: {
            type: String,
            default: 'circular',
        },
    },
    render(h) {
        const { color, size, type } = this;

        const style = { color };
        if (size) {
            const iconSize = addUnit(size);
            style.width = iconSize;
            style.height = iconSize;
        }

        /*  return h(
           `<div :class="">
             <span class="${bem('gm-m-spinner')(type)}"></span>
           </div>`); */
        return h("div", {
            class: ["gm-m-loading","gm-m-loading--circular"],
            style: style
        }, LoadingIcon(h, type));
        /*  
       return (
         <div
           class={bem([type, { vertical: props.vertical }])}
           {...inherit(ctx, true)}
         >
           <span class={bem('spinner', type)} style={style}>
             {LoadingIcon(h, props)}
           </span>
           {LoadingText(h, props, slots)}
         </div>
       ); */
    }
}