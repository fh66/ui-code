<template>
    <div
        class="gm-m-stepper"
        :class="[
            theme === 'round' ? 'gm-m-stepper--round': ''
        ]"
    >
        <button
            v-if="showMinus"
            class="gm-m-stepper__reduce"
            :class="[
                isDisableMinus? 'gm-m-stepper-minus__disabled': ''
            ]"
            :style="{height:buttonStyle,width:buttonStyle}"
            @click="reduce"
            @touchstart="touchstartReduce"
            @touchend="onTouchReduceEnd"
        >
        </button>
        <input
            v-if="showInput"
            ref="input"
            :type="inputType"
            :value="currentValue"
            :inputmode="integer ? 'numeric' : 'decimal'"
            class="gm-m-stepper__input"
            :placeholder="placeholder"
            :class="[
                isDisableInput? 'gm-m-stepper-input__disabled':''
            ]"
            :style="{width:inputStyle,height:buttonStyle}"
            @input="handleInput"
            @blur="blur"
            @focus="focus"
        >
        <button
            v-if="showPlus"
            class="gm-m-stepper__plus"
            :class="[
                isDisabledPlus? 'gm-m-stepper-plus__disabled':''
            ]"
            :style="{height:buttonStyle,width:buttonStyle}"
            @click="add"
            @touchstart="touchstartAdd"
            @touchend="onTouchAddEnd"
        >
        </button>
    </div>
</template>
            
<script>
import {isDef} from '@/utils/validate.js'
import Taro from '@tarojs/taro';
import Vue from 'vue'
// import { param } from "@/utils/param.js";
// import { formatNumber } from "../../../src/utils/format";

const LONG_PRESS_START_TIME = 600;
const LONG_PRESS_INTERVAL = 200;
function equal(value1, value2) {
    return String(value1) === String(value2);
}
export default {
    name: 'GmMStepper',
    props: {
        value: null,
        defaultValue: {
            type: [Number, String],
            default: 1
        },
        disabled: Boolean,
        disablePlus: Boolean,
        disableInput: Boolean,
        disableMinus: Boolean,
        min: {
            type: [String, Number],
            default: 1
        },
        max: {
            type: [Number, String],
            default: Infinity
        },
        step: {
            type: [String, Number],
            default: 1
        },
        inputWidth: {
            type: [String, Number],
            default: '32px'
        },
        buttonSize: {
            type: [String, Number],
            default: '28px'
        },
        placeholder: String,
        showMinus: {
            type: Boolean,
            default: true
        },
        showPlus: {
            type: Boolean,
            default: true
        },
        showInput: {
            type: Boolean,
            default: true
        },
        theme: String,
        decimalLength: [Number,String],
        allowEmpty: Boolean,
        longPress: {
            type: Boolean,
            default: true
        },
        integer: Boolean,
        asyncChange: Boolean
    },
    data () {
        let _this$value;
        let defaultValue = (_this$value = this.value) != null ? _this$value : this.defaultValue;
        let value = this.format(defaultValue);
        return {
            currentValue: value,
        }
    },
    computed: {
        isDisableMinus() {
            return this.currentValue <= this.min ?true : (this.disabled?true : (this.disableMinus ? true : false))
        },
        isDisableInput() {
            return this.disabled ? true :(this.disableInput ? true : false)
        },
        isDisabledPlus() {
            return this.currentValue == this.max ? true : (this.disabled ? true : (this.disablePlus ? true : false))
        },
        inputStyle () {
            return this.inputWidth.indexOf('p') != -1? this.inputWidth: this.inputWidth+'px'
        },
        buttonStyle() {
            return this.buttonSize.indexOf('p') != -1? this.buttonSize: this.buttonSize+'px'
        },
        inputType(){
            // if (param.webType == 'WEAPP'){
            //   return this.integer ? 'number' : 'digit';
            // }
            return this.integer ? 'tel' : 'digit';
        }
    },
    watch: {
        value(val) {
            if (!equal(val, this.currentValue)) {
                this.currentValue = this.format(val);
            }
        },
        currentValue: function currentValue(val) {
            if (!this.asyncChange && !isNaN(Number(val))) {
                if (this.integer) {
                    // 整数
                    if (`${val}`.indexOf('.') !== -1){
                        this.currentValue = Number(`${val}`.split('.')[0]);
                        return;
                    }
                }
                this.$emit('input', val);
                this.$emit('change', val, {
                    name: this.name
                });
            }
        }
    },
    methods: {
        handleInput(e) {
          console.log('Vue: ', Vue);
          console.log('Taro: ', Taro);
            // console.log('$webType: ', param.webType);
            let value = e.target.value;
            let currentValue = Number(e.target.value);
            if (isNaN(currentValue)){
                currentValue = e.target.value;
            } else if (this.integer) {
                // 整数
                if (`${value}`.indexOf('.') !== -1){
                    currentValue = e.target.value;
                }
            }
            this.currentValue = currentValue;
        },
        add(e) {
            let currentValue = null;
            if (this.isDisabledPlus) {
                this.$emit('overlimit','plus');// 点击不可用的按钮时触发
                return ;
            }
            if (this.currentValue != this.max) {
                currentValue = this.format((Number(this.currentValue) + Number(this.step)))
            }
            this.$emit('plus',e)
            this.emitChange(currentValue);
        },
        reduce(e) {
            let currentValue = null;
            if (this.isDisableMinus) {
                this.$emit('overlimit','minus');// 点击不可用的按钮时触发
                return ;
            }
            if (this.currentValue != this.min){
                currentValue = this.format((Number(this.currentValue) - Number(this.step)));
            }
            this.emitChange(currentValue)
            this.$emit('minus', e)
        },
        blur(e){
            this.currentValue = this.format(e.target.value)
            this.$emit('input', this.currentValue)
            this.$emit('blur', e)
        },
        focus(e) {
            this.$emit('focus', e)
        },
        emitChange(val){
            if (this.asyncChange) {
                if (!isNaN(Number(val))){
                    this.$emit('change', val, {
                        name: this.name
                    });
                }
            } else {
                this.currentValue = val;
            }
        },
        format(value) {
            if (this.allowEmpty && value === '') {
                return value;
            }
            value = value === '' ? 0 : +value;
            value = isNaN(value) ? this.min : value;
            value = Math.max(Math.min(this.max, value), this.min);
            if (isDef(this.decimalLength)) {
                value = value.toFixed(this.decimalLength);
            }
            return value;
        },
        longPressStepAdd() {
            let _this = this;
            this.longPressTimer = setTimeout(function () {
                _this.add();
                _this.longPressStepAdd(_this.type);
            }, LONG_PRESS_INTERVAL);
        },
        touchstartAdd(e, type){
            let _this2 = this
            if (!this.longPress) {
                return;
            }
            clearTimeout(this.longPressTimer);
            this.isLongPress = false;
            this.longPressTimer = setTimeout(function () {
                _this2.isLongPress = true;
                _this2.longPressStepAdd();
            }, LONG_PRESS_START_TIME);
        },
        onTouchAddEnd(event) {
            clearTimeout(this.longPressTimer);
        },
        touchstartReduce() {
            let _this2 = this
            if (!this.longPress) {
                return;
            }
            clearTimeout(this.longPressTimer);
            this.isLongPress = false;
            this.longPressTimer = setTimeout(function () {
                _this2.isLongPress = true;
                _this2.longPressStepReduce();
            }, LONG_PRESS_START_TIME);
        },
        onTouchReduceEnd() {
            clearTimeout(this.longPressTimer);
        },
        longPressStepReduce() {
            let _this = this;
            this.longPressTimer = setTimeout(function () {
                _this.reduce();
                _this.longPressStepReduce(_this.type);
            }, LONG_PRESS_INTERVAL);
        },
    }
};
</script>
            
