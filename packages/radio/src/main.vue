<template>
    <label
        class="gm-m-radio"
        :tabindex="tabIndex"
        :aria-checked="model === name"
        :class="[
            isDisabled?'gm-m-radio-label_disabled': '',
        ]"
    >
        <span class="gm-m-radio_input">
            <template v-if="$scopedSlots.icon">
                <slot
                    name="icon"
                    :checked="checked"
                >
                </slot>
            </template>
            <template v-else>
                <i
                    v-if="tabIndex === -1"
                    class="gm-m-icon-i-no_gouxuan"
                    :class="[isDisabled?'gm-m-radio_disabled': '']"
                    :style="{fontSize:isIconSize}"
                ></i>
                <i
                    v-if="tabIndex === 0"
                    class="gm-m-icon-orange_gouxuan"
                    :class="[isDisabled?'gm-m-radio_disabled': '']"
                    :style="{fontSize:isIconSize}"
                ></i>
            </template>
            <input
                ref="radio"
                v-model="model"
                :disabled="isDisabled"
                type="radio"
                :value="name"
                @change="handleChange"
            >
        </span>
        <span
            ref="labelDisabled"
            :class="[
                labelDisabled? 'gm-m-radio-disabled': ''
            ]"
            @click="handleClick"
        >
            <slot></slot>
        </span>
    </label>
</template>
            
<script>
import Emitter from '@/utils/mixins/emitter'
export default {
    name: 'GmMRadio',
    mixins: [Emitter],
    props: {
        value: {},
        name: {},
        disabled: Boolean,
        labelDisabled: Boolean,
        iconSize: {
            type: [String,Number],
            default: '20px'
        },
    },
    computed: {
        isIconSize () {
            return this.iconSize.indexOf('p') != -1? this.iconSize: this.iconSize+'px'
        },
        isGroup(){
            let parent = this.$parent;
            while (parent) {
                if (parent.$options.componentName !== 'GmMRadioGroup') {
                    parent = parent.$parent;
                } else {
                    this._radioGroup = parent;
                    return true;
                }
            }
            return false
        },
        isDisabled () {
            return this.isGroup? this._radioGroup.disabled:this.disabled
        },
        model: {
            get() {
                return this.isGroup ? this._radioGroup.value:this.value
            },
            set(val) {
                if (this.isGroup) {
                    this.dispatch('GmMRadioGroup', 'input', [val]);
                } else {
                    this.$emit('input', val);
                }
            }
        },
        tabIndex() {
            if (this.model === this.name) {
                return 0
            } else {
                return -1
            }
        },
        checked: function checked() {
            return this.model === this.name;
        }
    },
    methods: {
        handleChange(event) {
            this.$nextTick(() => {
                this.$emit('click',event);
                this.isGroup && this.dispatch('GmMRadioGroup', 'handleChange', this.model);
            });
        },
        handleClick(event) {
            if (this.labelDisabled) {
                setTimeout(() => {
                    this.dispatch('GmMRadioGroup', 'input', ['']);
                })
            } else {
                this.dispatch('GmMRadioGroup', 'handleClick', [this.model]);
            }
        }
    }
};
</script>
