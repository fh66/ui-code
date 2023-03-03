<template>
    <div
        class="gm-m-image"
        :style="superStyle"
    >
        <img
            ref="image"
            :src="src"
            :alt="alt"
            class="gm-m-image__img"
            :mode="mode"
            :style="style"
            @load="onLoad"
            @error="onError"
        >
        <div
            v-if="loading"
            class="gm-m-image__loading"
        >
            <slot
                v-if="$slots.loading"
                name="loading"
            ></slot>
            <i
                v-else
                class="gm-m-icon gm-m-image__error-icon"
            >
                <img
                    :src="defaultImg"
                    alt="error"
                    class="gm-m-icon__image"
                    :style="{
                        width: addUnit(errorIconSize),
                        height: addUnit(errorIconSize),
                    }"
                >
            </i>
        </div>
        <div
            v-else-if="error"
            class="gm-m-image__error"
        >
            <gm-m-icon
                v-if="errorIcon"
                :name="errorIcon"
                :class="bem('error-icon')"
                :class-prefix="iconPrefix"
            />
            <i
                v-else
                class="gm-m-icon gm-m-image__error-icon"
            >
                <img
                    :src="defaultImg"
                    alt="error"
                    class="gm-m-icon__image"
                    :style="{
                        width: addUnit(errorIconSize),
                        height: addUnit(errorIconSize),
                    }"
                >
            </i>
        </div>
    </div>
</template>
            
<script>
import { addUnit } from "../../../src/utils/format";
import { isDef } from "../../../src/utils/validate";
import { BEM as bem } from "../../../src/utils/create/bem";
// const defaultImg = require("./../../theme-chalk/src/assets/imgs/default.png");
export default {
    name: "GmMImage",
    props: {
        src: String,
        fit: String,
        alt: String,
        round: Boolean,
        width: [Number, String],
        height: [Number, String],
        radius: [Number, String],
        lazyLoad: Boolean,
        iconPrefix: String,
        showError: {
            type: Boolean,
            default: true,
        },
        showLoading: {
            type: Boolean,
            default: true,
        },
        errorIcon: {
            type: String,
            default: "",
        },
        errorIconSize: {
            type: String,
            default: "40",
        },
        loadingIcon: {
            type: String,
            default: "photo",
        },
        mode: String, // 兼容小程序属性
    },
    data() {
        return {
            loading: true,
            error: false,
            defaultImg: require("./../../theme-chalk/src/assets/imgs/default.png"),
        };
    },
    computed: {
        superStyle() {
            const style = { minHeight: addUnit(this.errorIconSize) };
            if (isDef(this.width)) {
                style.width = addUnit(this.width);
            }
            if (isDef(this.height)) {
                style.height = addUnit(this.height);
            }
            if (isDef(this.radius)) {
                style.overflow = "hidden";
                style.borderRadius = addUnit(this.radius);
            }
            return style;
        },
        style() {
            const style = {};
            if (isDef(this.fit)) {
                style.objectFit = this.fit;
            }
            return style;
        },
    },
    watch: {
        src() {
            this.loading = true;
            this.error = false;
        },
    },
    created() {
        // const loading = bem("gm-m-image")("loading");
        // console.log("bem= ", loading);
    },
    methods: {
        addUnit: addUnit,
        bem: (name) => {
            return bem("gm-m-image")(name);
        },
        onLoad(event) {
            this.loading = false;
            this.$emit("load", event);
        },
        onError(event) {
            console.log("加载失败");
            this.error = true;
            this.loading = false;
            this.$emit("error", event);
        },
    },
};
</script>
            
