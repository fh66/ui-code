<template>
    <div class="gm-m-select">
        <template v-if="toolbarPosition === 'top'">
            <div
                v-if="showToolbar"
                class="gm-m-select__toolbar"
            >
                <template v-if="!$scopedSlots.default">
                    <button
                        class="gm-m-select__cancel"
                        @click="cancel"
                    >
                        {{ cancelButtonText }}
                    </button>
                    <div class="gm-m-select__title gm-m-ellipsis">
                        {{ title }}
                    </div>
                    <button
                        class="gm-m-select__confirm"
                        @click="confirm"
                    >
                        {{ confirmButtonText }}
                    </button>
                </template>
                <slot
                    v-else
                    name="default"
                ></slot>
            </div>
        </template>
        <div
            class="gm-m-select__columns"
            :style="{height:Number(visibleItemCount)*itemPxHeight+'px'}"
        >
            <template v-for="(item, index) in columnsList">
                <gm-m-columns
                    ref="column"
                    :key="index"
                    :columns="item.values"
                    :default-index="defaultIndex"
                    :swipe-duration="$attrs.swipeDuration"
                    :visible-item-count="$attrs.visibleItemCount"
                    @change="change(index)"
                    @touchend="touchEnd(index)"
                />
            </template>
            <div
                class="gm-m-select__mask"
                :style="{backgroundSize:backgroundSize}"
            ></div>
            <div
                class="gm-m-hairline-unset--top-bottom gm-m-select__frame"
                :style="{height:itemPxHeight+'px'}"
            ></div>
        </div>
        <template v-if="toolbarPosition === 'bottom'">
            <div
                v-if="showToolbar"
                class="gm-m-select__toolbar"
            >
                <template v-if="!$scopedSlots.default">
                    <button
                        class="gm-m-select__cancel"
                        @click="cancel"
                    >
                        {{ cancelButtonText }}
                    </button>
                    <div class="gm-m-select__title gm-m-ellipsis">
                        {{ title }}
                    </div>
                    <button
                        class="gm-m-select__confirm"
                        @click="confirm"
                    >
                        {{ confirmButtonText }}
                    </button>
                </template>
                <slot
                    v-else
                    name="default"
                ></slot>
            </div>
        </template>
    </div>
</template>

<script>
import { unitToPx } from '@/utils/format.js'
import GmMColumns from "./column";
export default {
    name: 'GmMSelect',
    components: {
        GmMColumns,
    },
    props: {
        columns: {
            type: Array,
            default: ()=> {
                return [];
            }
        },
        showToolbar: Boolean,
        title: String,
        confirmButtonText: {
            type: String,
            default: '确定'
        },
        cancelButtonText: {
            type: String,
            default: '取消'
        },
        visibleItemCount: {
            type: [Number, String],
            default: 6
        },
        valueKey: {
            type: String,
            default: 'text'
        },
        toolbarPosition: {
            type: String,
            default: 'top'
        },
        itemHeight: [String, Number],
        allowHtml: {
            type: Boolean,
            default: true
        },
        defaultIndex: {
            type: [String,Number],
            default: 0
        },
        swipeDuration: {
            type: [String,Number],
            default: '200'
        },
        readonly: Boolean
    },
    data() {
        return {
            translate3dHeight: null,
            resData: [],
            children: [],
            resArr: [],
        }
    },
    computed: {
        itemPxHeight() {
            return this.itemHeight ? unitToPx(this.itemHeight) : 44;
        },
        columnsList() {
            this.resArr = this.formatCascade(this.columns);
            return this.resArr
        },
        backgroundSize() {
            let wrapHeight = this.itemPxHeight * Number(this.visibleItemCount);
            let translate3dHeight = (wrapHeight - this.itemPxHeight) / 2 +'px'
            return "100% " + translate3dHeight
        },
        dataType() {
            let columns = this.columns;
            let firstColumn = columns[0] || {};
            if (firstColumn.children) {
                return 'cascade';
            }
            if (firstColumn.values) {
                return 'object';
            }
            return 'text';
        }
    },
    methods: {
        formatCascade(tdata){
            var formatted = [];
            var cursor = {
                children: tdata
            };
            while (cursor && cursor.children) {
                // eslint-disable-next-line no-inner-declarations
                var _cursor$defaultIndex;
                // eslint-disable-next-line no-inner-declarations
                var _cursor = cursor,
                    children = _cursor.children;
                // eslint-disable-next-line no-inner-declarations
                var defaultIndex = (_cursor$defaultIndex = cursor.defaultIndex) != null ? _cursor$defaultIndex : +this.defaultIndex;
                while (children[defaultIndex] && children[defaultIndex].disabled) {
                    if (defaultIndex < children.length - 1) {
                        defaultIndex++;
                    } else {
                        defaultIndex = 0;
                        break;
                    }
                }

                formatted.push({
                    values: cursor.children,
                    className: cursor.className,
                    defaultIndex: defaultIndex
                });
                cursor = children[defaultIndex];
            }
            return formatted
        },
        cancel() {
            this.$emit('cancel')
        },
        confirm() {
            let _this2 = this
            if (this.dataType === 'text') {
                this.$emit('confirm', this, this.getColumnValue(0), this.getColumnIndex(0));
            } else {
                let values = this.getValues()
                if (this.dataType === 'cascade') {
                    values = values.map(function (item) {
                        return item[_this2.valueKey];
                    });
                }
                this.$emit('confirm', this, values, this.getIndexes());
            }
        },
        change(i) {
            let _this2 = this
            if (this.dataType === 'cascade') {
                this.onCascadeChange(i);
            }
            if (this.dataType === 'text') {
                this.$emit('change', this, this.getColumnValue(0), this.getColumnIndex(0));
            } else {
                let values = this.getValues(); // compatible with old version of wrong parameters
                if (this.dataType === 'cascade') {
                    values = values.map(function (item) {
                        return item[_this2.valueKey];
                    });
                }
                this.$emit('change', this, values, i);
            }
        },
        touchEnd(i) {
            let _this2 = this
            if (this.dataType === 'cascade') {
                this.onCascadeChange(i);
            }
            if (this.dataType === 'text') {
                this.$emit('change', this, this.getColumnValue(0), this.getColumnIndex(0));
            } else {
                let values = this.getValues(); // compatible with old version of wrong parameters
                if (this.dataType === 'cascade') {
                    values = values.map(function (item) {
                        return item[_this2.valueKey];
                    });
                }
                this.$emit('change', this, values, i);
            }
        },
        onCascadeChange(columnIndex) {
            var cursor = {
                children: this.columns
            };
            var indexes = this.getIndexes();
            // eslint-disable-next-line no-inner-declarations
            for (var i = 0; i <= columnIndex; i++) {
                cursor = cursor.children[indexes[i]];
            }
            while (cursor && cursor.children) {
                columnIndex++;
                this.setColumnValues(columnIndex, cursor.children);
                cursor = cursor.children[cursor.defaultIndex || 0];
            }
        },
        // 获取所有列选中值对应的索引
        getIndexes() {
            return this.$children.map(function (child) {
                return child.currentIndex;
            });
        },
        // 设置所有列选中值对应的索引	
        setIndexes () {},
        // 设置对应列中所有选项	
        setColumnValues(index, options) {
            var column = this.$children[index];
            if (column) {
                column.setOptions(options);
            }
        },
        // 获取对应列中所有选项	
        getColumnValues (index) {
            return (this.$children[index] || {}).options;
        },
        // 获取所有列选中的值	
        getValues() {
            return this.$children.map(function (child) {
                return child.getValue();
            });
        },
        // 设置所有列选中的值
        setValues(values) {
            var _this3 = this;
            values.forEach(function (value, index) {
                _this3.setColumnValue(index, value);
            });
        },
        // 获取对应列选中的值	
        getColumnValue(index) {
            let column = this.getColumn(index);
            let columnValue = column && column.getValue()
            return columnValue[column.valueKey];
        },
        // 设置对应列选中的值	
        setColumnValue(index, value) {
            let column = this.getColumn(index);

            if (column) {
                column.setValue(value);
                if (this.dataType === 'cascade') {
                    this.onCascadeChange(index);
                }
            }
        },
        // 获取对应列选中项的索引	
        getColumnIndex(index) {
            return (this.getColumn(index) || {}).currentIndex;
        },
        // 设置对应列选中项的索引	
        setColumnIndex (columnIndex, optionIndex) {
            let column = this.getColumn(columnIndex);
            if (column) {
                column.setIndex(optionIndex);
                if (this.dataType === 'cascade') {
                    this.onCascadeChange(columnIndex);
                }
            }
        },
        getColumn(index) {
            return this.$children[index];
        },
    }
};
</script>
            
