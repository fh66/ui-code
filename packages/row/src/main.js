export default {
    name: 'GmMRow',
    componentName: 'GmMRow',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        gutter: {
            type: Number,
            default: 11
        },
        type: String,
        
        justify: {
            type: String,
            default: 'start'
        },
        align: String
    },
    computed: {
        style() {
            const ret = {};
            if (this.gutter) {
                ret.marginLeft = `-${this.gutter / 2}px`;
                ret.marginRight = ret.marginLeft;
            }
            return ret;
        }
    },
    render(h) {
        return h(this.tag, {
            class: [
                'gm-m-row',
                this.justify !== 'start' ? `is-justify-${this.justify}` : '',
                this.align ? `is-align-${this.align}` : '',
                { 'gm-m-row--flex': this.type === 'flex' }
            ],
            style: this.style
        }, this.$slots.default);
    }
};
