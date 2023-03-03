<template>
    <div
        class="gm-m-cell"
        :role="clickable? 'button' : null"
        :class="[
            size ? 'gm-m-cell--' + size : '',
            {
                'gm-m-cell--borderless': !border,
                'gm-m-cell--clickable': clickable,
                'gm-m-cell--center': center,
                'gm-m-cell--required': required
            }
        ]"
        @click="handleClick"
    >
        <slot name="icon"></slot>
        <div
            v-if="title || $scopedSlots.title"
            class="gm-m-cell__title"
            :style="titleStyle"
            :class="[
                titleClass? titleClass:''
            ]"
        >
            <span v-if="!$scopedSlots.title">{{ title }}</span>
            <slot name="title"></slot>
            <div
                v-if="label || $scopedSlots.label"
                class="gm-m-cell__label"
                :class="[
                    labelClass?labelClass:''
                ]"
            >
                <template v-if="!$scopedSlots.label">
                    {{ label }}
                </template>
                <slot
                    name="label"
                ></slot>
            </div>
        </div>
        <div
            class="gm-m-cell__value"
            :class="[
                valueClass? valueClass:''
            ]"
        >
            {{ value }}
            <slot></slot>
        </div>
        <i
            v-if="!$scopedSlots['right-icon']"
            class="gm-m-cell__right-icon"
            :class="[{
                'gm-m-icon-i-xia': isLink && arrowDirection==='down',
                'gm-m-icon-i-zuo': isLink && arrowDirection==='left',
                'gm-m-icon-i-shang': isLink && arrowDirection==='up',
                'gm-m-icon-i-you': isLink && !arrowDirection
            }]"
        ></i>
        <slot name="right-icon">
        </slot>
        <slot name="extra"></slot>
    </div>
</template>
            
<script>
export default {
    name: 'GmMCell',
    props: {
        title: String,
        label: String,
        value: String,
        size: String,
        isLink: Boolean,
        arrowDirection: String,
        border: {
            type: Boolean,
            default: true
        },
        clickable: Boolean,
        titleStyle: String,
        titleClass: String,
        valueClass: String,
        labelClass: String,
        center: {
            type: Boolean,
            default: false
        },
        required: Boolean
    },
    methods: {
        handleClick(e) {
            this.$emit('click', e)
        }
    }
};
</script>

