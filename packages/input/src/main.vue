<template>
    <gm-m-cell
        :title="label"
        :required="required"
        size="large"
        :clickable="clickable"
        title-class="gm-m-input__label"
        :class="[
            disabled?'gm-m-disabled':'',
            error? 'gm-m-input_error': ''
        ]"
    >
        <template #icon>
            <i
                v-if="!iconImg"
                :class="leftIcon"
                class="gm-m-input__icon gm-m-left_icon"
            ></i>
            <img
                v-else
                class="gm-m-input__img"
                :src="leftIcon"
                alt=""
            >
        </template>
        <div class="gm-m-input__body">
            <input
                v-if="type !== 'textarea'"
                ref="input"
                :value="value"
                :readonly="readonly"
                :disabled="disabled"
                class="gm-m-input__control"
                :type="type"
                :inputmode="inputMode"
                :formatter="formatter"
                :placeholder="placeholder"
                :style="{...styleInput}"
                @compositionstart="handleCompositionStart"
                @compositionend="handleCompositionEnd"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
            >
            <textarea
                v-else
                ref="input"
                :value="value"
                :readonly="readonly"
                :disabled="disabled"
                class="gm-m-input__control"
                :rows="rows"
                :autosize="autosize"
                :formatter="formatter"
                :placeholder="placeholder"
                :maxlength="maxlength"
                @compositionstart="handleCompositionStart"
                @compositionend="handleCompositionEnd"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
            ></textarea>
            <i
                v-if="showClear"
                class="gm-m-icon-i-guanbi gm-m-input__icon"
                @touchstart="clear"
            ></i>
            <div
                v-if="$scopedSlots.button "
                class="gm-m-input__button"
            >
                <slot
                    name="button"
                >
                </slot>
            </div>
        </div>
        <div
            v-if="autosize && maxlength"
            class="gm-m-input__word-limit"
        >
            <span class="gm-m-input__word-num">{{ value.length }}</span>/{{ maxlength }}
        </div>
        <div
            v-if="errorMessage"
            class="gm-m-input__error_message"
        >
            {{ errorMessage }}
        </div>
        <template #right-icon>
            <i
                v-if="rightIcon"
                :class="rightIcon"
                class="gm-m-input__icon gm-m-right_icon"
            ></i>
        </template>
    </gm-m-cell>
</template>
            
<script>
import GmMCell from '../../cell'
import { formatNumber } from '@/utils/format.js'
import { getRootScrollTop, setRootScrollTop } from '@/utils/dom/scroll';
import { isObject } from '@/utils/types'
export default {
    name: 'GmMInput',
    components: {
        GmMCell
    },
    props: {
        clickable: Boolean,
        placeholder: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        value: [String, Number],
        formatTrigger: {
            type: String,
            default: 'onChange'
        },
        readonly: Boolean,
        disabled: Boolean,
        leftIcon: String,
        rightIcon: String,
        clearable: Boolean,
        error: Boolean,
        required: Boolean,
        errorMessage: String,
        formatter: Function,
        rows: [String,Number],
        autosize: Boolean,
        maxlength: [String, Number],
        styleInput: {
            type: Object,
        },
        clearTrigger: {
            type: String,
            default: 'focus'
        }
    },
    data () {
        return {
            isComposing: false,
            focused: false,
        }
    },
    computed: {
        // type="number" 在 iOS 中很奇怪，在 Android 中无法阻止 dot
        // 所以在现代浏览器中使用 inputmode 来设置键盘
        inputMode() {
            let mode = ''
            if (this.type === 'number') {
                mode= 'decimal'
            } else if (this.type === 'digit') {
                mode = 'numeric'
            } else {
                mode = 'none'
            }
            return mode
        },
        showClear() {
            let clearIocn = Boolean;
            if (this.clearTrigger === 'focus'){
                clearIocn = this.clearable && this.focused
            } else {
                clearIocn = this.clearable
            }
            return clearIocn
        },
        iconImg() {
            return this.leftIcon? this.leftIcon.indexOf('/') !== -1 : false
        }
    },
    watch: {
        value () {
            this.$nextTick(() => {
                this.resizeTextarea();
            });
        },
        // when change between <input> and <textarea>,
        // update DOM dependent value and styles
        type() {
            this.$nextTick(() => {
                this.resizeTextarea();
            });
        }
    },
    mounted() {
        this.updateValue(this.value, this.formatTrigger);
        this.resizeTextarea()
    },
    methods: {
        // 开始新的输入合成时会触发
        handleCompositionStart() {
            this.isComposing = true;
        },
        // 当文本段落的组成完成或取消时, compositionend 事件将被触发
        handleCompositionEnd(event) {
            if (this.isComposing) {
                this.isComposing = false;
                this.handleInput(event);
            }
        },
        handleInput(event){
            if (this.isComposing) return;
            this.focused = true
            this.updateValue(event.target.value)
        },
        handleBlur(event) {
            this.focused = false
            this.updateValue(event.target.value, 'onBlur');
            this.$nextTick(() => {
                this.resizeTextarea();
            });
            this.$emit('blur',event)
        },
        handleFocus (event) {
            if (event.target.value) {
                this.focused = true
            }
            this.$nextTick(() => {
                this.resizeTextarea();
            });
            this.$emit('focus', event)
        },
        updateValue(value, trigger) {
            // void其实是javascript中的一个函数，接受一个参数，返回值永远是undefined
            if (trigger === void 0) {
                trigger = 'onChange';
            }
            if (this.type === 'number' || this.type === 'digit') {
                let isNumber = this.type === 'number';
                value = formatNumber(value, isNumber, isNumber);
            }
            if (this.formatter && trigger === this.formatTrigger) {
                value = this.formatter(value);
            }
            let input = this.$refs.input;
            if (input && value !== input.value) {
                input.value = value;
            }
            if (value !== this.value) {
                this.$emit('input', value);
            }
        },
        clear () {
            this.$emit('input', '');
        },
        resizeTextarea () {
            let input = this.$refs.input;
            if (!(this.type === 'textarea' && this.autosize) || !input) {
                return;
            }
            let scrollTop = getRootScrollTop();
            input.style.height = 'auto';
            let height = input.scrollHeight;
            if (isObject(this.autosize)) {
                let _this$autosize = this.autosize,
                    maxHeight = _this$autosize.maxHeight,
                    minHeight = _this$autosize.minHeight;
                if (maxHeight) {
                    height = Math.min(height, maxHeight);
                }
                if (minHeight) {
                    height = Math.max(height, minHeight);
                }
            }
            if (height) {
                input.style.height = height + 'px'; // 解决在任意输入框位置进行输入 ，会直接把整个输入框滚动到最上方的位置
                setRootScrollTop(scrollTop);
            }
        }
    }
};
</script>
            
