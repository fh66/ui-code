<template>
    <div>
        <div
            v-if="title || $scopedSlots.title"
            class="gm-m-cell-group_title"
        >
            {{ title }}
            <slot name="title"></slot>
        </div>
        <div
            class="gm-m-cell-group"
            :class="[
                {
                    'gm-m-hairline--top-bottom':border,
                    'gm-m-cell-group--inset': inset
                }
            ]"
        >
            <slot></slot>
        </div>
    </div>
</template>
            
<script>
export default {
    name: 'GmMCellGroup',
    props: {
        title: [String,Number],
        border: {
            type: Boolean,
            default: true
        },
        inset: {
            type: Boolean,
            default: false
        }
    }
};
</script>

