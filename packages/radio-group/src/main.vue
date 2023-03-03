<template>
    <component
        :is="_elTag"
        class="gm-m-radio-group"
        :class="[
            direction === 'horizontal'? 'gm-m-radio--horizontal' :'gm-m-radio--vertical'
        ]"
        role="radiogroup"
        @change="handleChange"
    >
        <slot></slot>
    </component>
</template>
            
<script>
import Emitter from '@/utils/mixins/emitter'
export default {
    name: 'GmMRadioGroup',
    componentName: 'GmMRadioGroup',
    mixins: [Emitter],
    props: {
        value: {},
        size: String,
        fill: String,
        textColor: String,
        disabled: Boolean,
        direction: String
    },
    computed: {
        _elTag() {
            let tag = (this.$vnode.data || {}).tag;
            if (!tag || tag === 'component') tag = 'div';
            return tag;
        }
    },
    methods: {
        handleChange (event) {
            this.$emit('change', event.target.value)
        }
    }
};
</script>
            
