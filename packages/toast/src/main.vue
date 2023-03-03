<template>
    <div
        v-if="visible"
        :class="[
            overlay?'gm-m-overlay': '',
            forbidClick? 'gm-m-forbidClick': ''
        ]"
        @click="handleAllClose"
    >
        <div
            v-if="visible"
            class="gm-m-toast"
            :style="positionStyle"
            :class="[
                className? className: '',
                {
                    'gm-m-success': type === 'success',
                    'gm-m-fail': type === 'fail'
                }]"
            @click="handleClose"
        >
            <i
                v-if="icon"
                class="gm-m-toast_icon"
                :class="[
                    iconfont?'': icon,
                    iconPrefix? iconPrefix : '',
                    {
                        'gm-m-icon-chenggong':type === 'success',
                        'gm-m-icon-shibai': type === 'fail'
                    }]"
            >
                <img
                    class="gm-m-toast_image"
                    :src="iconfont?icon: ''"
                    alt=""
                >
            </i>
            <div class="gm-m-container">
                {{ message }}
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
export default {
    data() {
        return {
            visible: false,
            message: '',
            duration: 2000,
            onClose: null,
            verticalOffset: 70,
            timer: null,
            icon: null,
            type: null,
            className: null,
            iconPrefix: null,
            position: null,
            overlay: false,
            forbidClick: false,
            closeOnClick: false,
            closeOnClickOverlay: false
        };
    },
    computed: {
        positionStyle() {
            let offDistance;
            if (this.verticalOffset.indexOf('%') != -1) {
                offDistance = this.verticalOffset
            } else {
                offDistance = `${this.verticalOffset}px`
            }
            if (this.position === 'bottom') {
                return {
                    'bottom': offDistance
                };
            } else {
                return {
                    'top': offDistance
                };
            }
        },
        iconfont() {
            return this.icon? this.icon.indexOf('/') !== -1 : false
        }
    },
    mounted() {
        this.startTimer();
    },
    methods: {
        handleAfterLeave() {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        },
        handleClose () {
            if (this.closeOnClick) {
                this.close()
            }
        },
        handleAllClose () {
            if (this.closeOnClickOverlay) {
                this.close()
            }
        },
        close() {
            this.visible = false;
            this.onClose(this);
        },
        clearTimer() {
            clearTimeout(this.timer);
        },
        startTimer() {
            if (this.duration > 0) {
                this.timer = setTimeout(() => {
                    this.close();
                }, this.duration);
            }
        },
    },
};
</script>