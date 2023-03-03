<template>
    <i
        :class="['gm-m-icon-' + name,
                 iconPrefix? iconPrefix :''
        ]"
        :style="{
            color : color ? color : '',
            fontSize: size? size: '',
        }"
        @click="handleClick"
    >
        <div
            v-if="dot || badge"
            :class="{
                'is-dot': dot,
                'is-badge': badge
        
            }"
        >
            {{ badge }}
        </div>
    </i>
</template>

<script>
export default {
    name: 'GmMIcon',
    props: {
        name: String,
        dot: Boolean,
        badge: [Number,String],
        color: String,
        size: [Number, String],
        iconPrefix: String
    },
    methods: {
        handleClick(evt) {
            this.$emit('click', evt);
        }
    }
};
</script>
            
