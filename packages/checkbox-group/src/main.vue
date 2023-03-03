<template>
    <div
        class="gm-m-checkbox-group"
        role="group"
        aria-label="checkbox-group"
    >
        <slot></slot>
    </div>
</template>
            
<script>
import Emitter from '@/utils/mixins/emitter'
export default {
    name: 'GmMCheckboxGroup',
    componentName: 'GmMCheckboxGroup',
    mixins: [Emitter],
    props: {
        value: {},
        disabled: Boolean,
        min: Number,
        max: Number,
        size: String,
        fill: String,
        checkedColor: String,
        iconSize: [String,Number]
    },
    watch: {
        value: function value(val) {
            this.$emit('change', val);
        }
    },
    methods: {
        // @exposed-api
        toggleAll: function toggleAll(options) {
            console.log(options, 'options');
            if (options === void 0) {
                options = {};
            }

            if (typeof options === 'boolean') {
                options = {
                    checked: options
                };
            }
            let _options = options,
                checked = _options.checked,
                skipDisabled = _options.skipDisabled;
            let children = this.$children.filter(function (item) {
                if (item.disabled && skipDisabled) {
                    return item.checked;
                }
                return checked != null ? checked : !item.isChecked;
            });
            let names = children.map(function (item) {
                return item.name;
            });
            console.log(children);
            this.$emit('input', names);
        }
    }
};
</script>
            
