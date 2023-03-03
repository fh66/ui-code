<template>
    <button
        class="gm-m-button"
        :disabled="buttonDisabled || loading"
        :autofocus="autofocus"
        :type="nativeType"
        :class="[
            type ? 'gm-m-button--' + type : '',
            buttonSize ? 'gm-m-button--' + buttonSize : '',
            {
                'is-disabled': buttonDisabled,
                'is-loading': loading,
                'is-plain': plain,
                'is-round': round,
                'is-circle': circle,
                'is-block': block,
                'is-hairline': hairline,
                'is-square': square
            }
        ]"
        :style="{
            background: plain ? '' : color,
            color: plain ? color : '#fff',
            borderColor:plain ? color : ''
        }"
        @click="handleClick"
    >
        <i
            v-if="loading"
            class="gm-icon-loading"
        ></i>
        <i
            v-if="icon && !loading"
            :class="icon"
        ></i>
        <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>
            
<script>
export default {
    name: 'GmMButton',
    inject: {
        GmMForm: {
            default: ''
        },
        GmMFormItem: {
            default: ''
        }
    },
    props: {
        type: {
            type: String,
            default: 'default'
        },
        // eslint-disable-next-line no-prototype-builtins
        size: String,
        icon: {
            type: String,
            default: ''
        },
        nativeType: {
            type: String,
            default: 'button'
        },
        loading: Boolean,
        disabled: Boolean,
        plain: Boolean,
        autofocus: Boolean,
        round: Boolean,
        circle: Boolean,
        color: String,
        block: Boolean,
        hairline: Boolean,
        square: Boolean
    },
    computed: {
        _elFormItemSize() {
            return (this.elFormItem || {}).elFormItemSize;
        },
        buttonSize() {
            return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
        },
        buttonDisabled() {
            // eslint-disable-next-line no-prototype-builtins
            return this.$options.propsData.hasOwnProperty('disabled') ? this.disabled : (this.elForm || {}).disabled;
        }
    },
    methods: {
        handleClick(evt) {
            this.$emit('click', evt);
        }
    }
};
</script>
            
