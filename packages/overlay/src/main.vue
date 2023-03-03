<template>
    <div
        v-if="isShow"
        class="gm-m-overlay"
        :class="[
            className?className: ''
        ]"
        :style="{zIndex:zIndex,...isSverlayStyle}"
        refs="overlay"
        @click="handleClick"
    >
        <slot></slot>
    </div>
</template>
            
<script>
export default {
    name: 'GmMOverlay',
    props: {
        zIndex: [String,Number],
        className: String,
        customStyle: String,
        show: Boolean,
    },
    data(){
        return {
            popupShow: false,
            overlayStyle: {}
        }
    },
    computed: {
        isShow() {
            return this.show || this.popupShow? true: false
        },
        isSverlayStyle(){
            let style;
            console.log(this.customStyle)
            this.customStyle === void 0 ? style = this.overlayStyle : style = this.customStyle
            return style
        },
    },
    methods: {
        handleClick(event) {
            this.$emit('click', event)
        }
    }
};
</script>
            
