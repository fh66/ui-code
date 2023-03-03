<template>
    <div
        :id="id"
        class="gm-m-checkbox"
        :class="[
            {
                'is-disabled': isDisabled,
                'is-checked': isChecked
            }
        ]"
        @click="handleClick"
    >
        <template v-if="labelPosition === 'left'">
            <span
                v-if="$slots.default || name"
                class="gm-m-checkbox__label"
            >
                <slot></slot>
                <template v-if="!$slots.default">{{ name }}</template>
            </span>
        </template>
        <span
            ref="icons"
            class="gm-m-checkbox__input"
            :class="{
                'is-disabled': isDisabled,
                'is-indeterminate': indeterminate,
                'is-checked': isChecked,
                'is-focus': focus
            }"
            :tabindex="indeterminate ? 0 : false"
            :role="indeterminate ? 'checkbox' : false"
            :aria-checked="indeterminate ? 'mixed' : false"
        >
            <template v-if="$scopedSlots.icon">
                <slot
                    name="icon"
                    :checked="checked"
                >
                </slot>
            </template>
            <template v-else>
                <i
                    v-if="!isChecked"
                    class="gm-m-icon-i-no_gouxuan"
                    :class="[isDisabled?'gm-m-checkbox_disabled': '']"
                    :style="{fontSize:isIconSize}"
                ></i>
                <i
                    v-else
                    class="gm-m-icon-orange_gouxuan"
                    :class="[isDisabled?'gm-m-checkbox_disabled': '']"
                    :style="{fontSize:isIconSize, color:isCheckedColor}"
                ></i>
            </template>
        </span>
        <template v-if="labelPosition === 'right'">
            <span
                v-if="$slots.default || name"
                class="gm-m-checkbox__label"
            >
                <slot></slot>
                <template v-if="!$slots.default">{{ name }}</template>
            </span>
        </template>
    </div>
</template>

<script>
import Emitter from '@/utils/mixins/emitter'
export default {
    name: 'GmMCheckbox',
    mixins: [Emitter],
    props: {
        value: {},
        name: {},
        indeterminate: Boolean,
        disabled: Boolean,
        id: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系 */
        controls: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系 */
        shape: String,
        labelDisabled: Boolean,
        labelPosition: {
            type: String,
            default: 'right'
        },

        iconSize: {
            type: [String,Number],
            default: '20px'
        },
        checkedColor: {
            type: String,
            default: '#1989fa'
        }
    },
    data () {
        return {
            selfModel: false,
            focus: false,
            isLimitExceeded: false,
            checked: false
        }
    },
    computed: {
        isIconSize() {
            if (this.isGroup) {
                if ( this._checkboxGroup.iconSize) {
                    return this._checkboxGroup.iconSize.indexOf('p') != -1? this._checkboxGroup.iconSize: this._checkboxGroup.iconSize+'px'
                }
                return
            } else {
                return this.iconSize.indexOf('p') != -1? this.iconSize: this.iconSize+'px'
            }
        },
        isCheckedColor() {
            if (this.isGroup) {
                return this._checkboxGroup.checkedColor? this._checkboxGroup.checkedColor:this.checkedColor
            } else {
                return this.checkedColor
            }
        },
        // 判断是否有group标签
        isGroup() {
            let parent = this.$parent;
            while (parent) {
                if (parent.$options.componentName !== 'GmMCheckboxGroup') {
                    parent = parent.$parent;
                } else {
                    this._checkboxGroup = parent;
                    return true;
                }
            }
            return false;
        },
        isDisabled(){
            return this.isGroup ? this._checkboxGroup.disabled : this.disabled
        },
        isChecked: {
            get() {
                if (this._checkboxGroup) {
                    return this._checkboxGroup.value.indexOf(this.name) !== -1
                }
                return this.value
            },
            set (val) {
                if (this._checkboxGroup) {
                    this.setParentValue(val);
                } else {
                    this.$emit('input', val);
                }
            }
        }
    },
    watch: {
        value: function value(val) {
            this.$emit('change', val);
        }
    },
    methods: {
        handleClick (event) {
            let _this = this;
            let target = event.target;
            let icon = this.$refs.icons;
            let iconClicked = icon === target || (icon == null ? void 0 : icon.contains(target));
            if (!this.isDisabled && (iconClicked || !this.labelDisabled)) {
                this.toggle();
                setTimeout(function () {
                    _this.$emit('click', event);
                });
            } else {
                this.$emit('click', event);
            }
        },
        // @exposed-api
        toggle: function toggle(checked) {
            let _this = this;
            if (checked === void 0) {
                checked = !this.isChecked;
                this.checked = checked;
            }
            clearTimeout(this.toggleTask);
            this.toggleTask = setTimeout(function () {
                _this.isChecked = checked;
                this.checked = checked;
            });
        },
        setParentValue(val) {
            console.log(val, 'val');
            let _checkboxGroup = this._checkboxGroup
            let value = _checkboxGroup.value
            if (val) {
                if (_checkboxGroup.max && value.length >= _checkboxGroup.max) {
                    return;
                }
                if (value.indexOf(this.name) === -1) {
                    value.push(this.name)
                    this._checkboxGroup.$emit('input', value);
                }
            } else {
                let index = value.indexOf(this.name);
                /* istanbul ignore else */
                if (index !== -1) {
                    value.splice(index, 1);
                    _checkboxGroup.$emit('input', value);
                }
            }
        }
    }
};
</script>
