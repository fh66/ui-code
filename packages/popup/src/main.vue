<template>
    <!--    <div-->
    <!--        v-if="value"-->
    <!--        class="gm-m-popup gm-m-overlay"-->
    <!--        @click="handleClick"-->
    <!--    >-->
    <!--    </div>-->
    <div
        v-if="value"
        class="gm-m-popup--outer"
        @click="handleClickOuter"
    >
        <div
            class="gm-m-popup_box"
            :class="[
                'gm-m-popup--'+position
            ]"
            :style="popupStyle"
            @click="handleClick"
        >
            <slot></slot>
            <i
                v-if="closeable"
                :class="[
                    closeIcon?closeIcon:'gm-m-icon-i-guanbi',
                    closeIconPosition?'gm-m-close-'+closeIconPosition:'gm-m-close-top-right'
                ]"
                @click="close"
            ></i>
        </div>
    </div>
</template>
            
<script>
import GmMOverlay from '../../overlay/src/main.js'
export default {
    name: 'GmMPopup',
    components: {
        // eslint-disable-next-line vue/no-unused-components
        GmMOverlay
    },
    props: {
        value: Boolean,
        position: String,
        popupStyle: Object,
        closeable: Boolean,
        closeIcon: String,
        closeOnClickOverlay: {
            type: Boolean,
            default: true
        },
        closeIconPosition: {
            type: String,
            default: 'top-right'
        },
        overlayStyle: Object
    },
    model: {
        prop: 'value',
        event: 'handleClick',
    },
    watch: {
        value(val){
            if (val) {
                GmMOverlay({
                    popupShow: true,
                    overlayStyle: this.overlayStyle
                })
            } else {
                GmMOverlay.close()
            }
        }
    },
    methods: {
        handleClick() {
            this.$emit('handleClick', false)
        },
        handleClickOuter() {
            this.$emit('click-overlay')
            if (!this.closeOnClickOverlay) return
            this.$emit('close')
            this.$emit('handleClick', false)
        },
        close() {
            this.handleClick();
        }
    }
};
</script>
            
