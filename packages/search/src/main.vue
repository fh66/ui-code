<template>
    <div
        class="gm-m-search"
        :style="{background:background}"
    >
        <slot name="left"></slot>
        <div
            class="gm-m-search__content"
            :class="[shape?'gm-m-search__'+shape : '']"
        >
            <div
                v-if="!$scopedSlots.label"
                class="gm-m-search__label"
            >
                {{ label }}
            </div>
            <slot name="label"></slot>
            <gm-m-input
                v-model="value"
                :clearable="true"
                v-bind="$attrs"
                class="gm-m-search__icon"
                :left-icon="leftIcon"
                :style-input="{textAlign:inputAlign}"
                v-on="$listeners"
                @keyup.enter.native="search"
                @input="handleInput"
            />
            <i
                v-if="!iconfont"
                class="gm-m-search__icon gm-m-search__rightIcon"
                :class="[rightIcon?rightIcon:'']"
            ></i>
            <img
                v-else
                class="gm-m-search__img"
                :src="iconfont?rightIcon:''"
                alt=""
            >
        </div>
        <slot name="action"></slot>
        <div
            v-if="showAction&& !$scopedSlots.action"

            :class="[shape?'gm-m-search__'+shape : '']"
            @click="cancel"
        >
            {{ actionText }}
        </div>
    </div>
</template>
            
<script>
import GmMInput from '../../input/src/main'
export default {
    name: 'GmMSearch',
    components: {
        GmMInput
    },
    props: {
        label: {
            type: String
        },
        showAction: Boolean,
        inputAlign: {
            type: String,
            default: 'left'
        },
        background: String,
        shape: {
            type: String,
            default: 'square'
        },
        actionText: {
            type: String,
            default: '取消'
        },
        leftIcon: {
            type: String,
            default: 'gm-m-icon-i-sousuo'
        },
        rightIcon: String
    },
    data(){
        return {
            value: ''
        }
    },
    computed: {
        iconfont() {
            return this.rightIcon? this.rightIcon.indexOf('/') !== -1 : false
        }
    },
    methods: {
        handleInput(e) {
            this.$emit('input', e);
        },
        cancel(e) {
            if (this.$scopedSlots.action) return
            this.$emit('cancel', e)
        },
        search(e){
            this.$emit('search',e.target.value)
        }
    }
};
</script>
            
