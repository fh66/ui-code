<template>
    <div
        class="gm-m-select__column"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
    >
        <ul
            class="gm-m-select-column__wrapper"
            :style="scaleFun"
            style="transition-property: all;"
        >
            <li
                v-for="(item,index) in columnsList"
                :key="index"
                role="button"
                class="gm-m-select-column__item"
                :class="{'gm-m-select-column__item--selected':ins === index}"
                :style="{height:itemPxHeight+'px'}"
                @click="handleClick(item, index)"
            >
                <div class="gm-m-ellipsi">
                    <div
                        v-if="allowHtml"
                        v-html="typeof item !== 'object'? item: item[valueKey]"
                    ></div>
                    <template v-else>
                        {{ typeof item !== 'object'? item: item[valueKey] }}
                    </template>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { unitToPx } from '@/utils/format.js'
import { deepClone } from '@/utils/deep-clone.js'
export default {
    name: "Column",
    props: {
        columns: {
            type: Array,
            default: ()=> {
                return [];
            }
        },
        itemHeight: [String, Number],
        valueKey: {
            type: String,
            default: 'text'
        },
        allowHtml: {
            type: Boolean,
            default: true
        },
        swipeDuration: {
            type: [String,Number],
            default: '200'
        },
        visibleItemCount: {
            type: [Number, String],
            default: 6
        },
        defaultIndex: Number,
        initialOptions: {
            type: Array,
            default: function _default() {
                return [];
            }
        }
    },
    data() {
        return {
            ins: 0,
            scroll: false,
            clientY: 0,
            startY: 0,
            deltaY: 0,
            offsetY: 0,
            currentIndex: this.defaultIndex,
            options: this.columns,
            optionsIndex: deepClone(this.initialOptions),

        }
    },
    computed: {
        itemPxHeight: function itemPxHeight() {
            return this.itemHeight ? unitToPx(this.itemHeight) : 44;
        },
        scaleFun: function () {
            let translate3d = ''
            let swipeDuration = this.swipeDuration
            let wrapHeight = this.itemPxHeight * Number(this.visibleItemCount);
            this.translate3dHeight = (wrapHeight - this.itemPxHeight) / 2
            if (!this.scroll) {
                translate3d = this.ins === 0 ?
                    `translate3d(0px, ${this.translate3dHeight}px, 0px);`:
                    `translate3d(0px, ${this.translate3dHeight - (this.itemPxHeight * this.ins)}px, 0px);`
            } else {
                translate3d = `translate3d(0px, ${this.clientY}px, 0px);`
            }
            return `transform:${translate3d};transition-duration:  ${swipeDuration}ms;`
        },
        backgroundSize() {
            let wrapHeight = this.itemPxHeight * Number(this.visibleItemCount);
            let translate3dHeight = (wrapHeight - this.itemPxHeight) / 2 +'px'
            return "100% " + translate3dHeight
        },
        columnsList(){
            let columnsList= this.columns
            if (JSON.stringify(this.options) !== JSON.stringify(this.columns)) {
                columnsList = deepClone(this.options);
                this.setIndex(this.defaultIndex);
            } else {
                columnsList = this.columns
                this.setIndex(this.defaultIndex);
            }
            return columnsList
        },
    },
    methods: {
        setOptions(options) {
            this.options = options
        },
        handleClick(item,i) {
            this.scroll = false
            this.ins = i
            this.currentIndex = i
            this.$emit('change', item[this.valueKey], i,item)
        },
        touchStart(e) {
            if (this.readonly) return
            this.startY = e.touches[0].clientY;
        },
        touchMove(e){
            if (this.readonly) return
            e.preventDefault()
            let touch = e.touches[0]; // safari back will set clientX to negative number
            this.scroll = true
            this.deltaY = touch.clientY - this.startY;
            this.offsetY = Math.abs(this.deltaY); // lock direction when distance is greater than a certain value
            this.clientY = this.deltaY
        },
        touchEnd(e) {
            if (this.readonly) return
            let moveIndex = Math.round((this.translate3dHeight - this.deltaY) / this.itemPxHeight)
            if (moveIndex > this.columns.length) {
                moveIndex = this.columns.length - 1
            } else if (moveIndex < 0) {
                moveIndex = 0
            }
            this.ins = moveIndex
            this.currentIndex = moveIndex
            this.clientY = this.translate3dHeight - (this.itemPxHeight * moveIndex)
            this.$emit('touchend', e)
        },
        setIndex(index) {
            if (index === 0) {
                this.currentIndex = 0
                this.ins = 0
            }
        },
        getValue() {
            return this.columnsList[this.currentIndex]
        },
        setValue(value){
            console.log(this.columns, value)
            // this.columns.forEach((item, index) => {
            //       if (item[this.valueKey] === value) {
            //           this.ins = index
            //           this.currentIndex = index
            //       }
            //   })
        }
    }
}
</script>

<style scoped>

</style>