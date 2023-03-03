<template>
    <div
        class="gm-m-rate"
    >
        <div
            v-for="item in countList"
            :key="item.id"
            ref="items"
            class="gm-m-rate__items"
            @touchstart="onTouchstart"
            @touchmove="bodyTouchMove"
        >
            <i
                class="gm-m-rate__content"
                :class="[
                    item.icon,
                    item.id<=id?item.active='active':'',
                    disabled?'gm-m-rate__disabled':''
                ]"
                :style="{
                    color: disabled?disabledColor:item.active==='active'?color:voidColor,
                    fontSize: size,
                    paddingRight: gutter
                }"
                @click="handleClick(item,'all')"
            >
            </i>
            <i
                v-if="allowHalf"
                class="gm-m-rate__half"
                :class="[
                    item.icon,
                    item.id<=id?item.activeHalf='activeHalf':''
                ]"
                :style="{
                    color: disabled?disabledColor:item.activeHalf==='activeHalf'?color:voidColor,
                    fontSize: size,
                    paddingRight: gutter
                }"
                @click="handleClick(item, 'half')"
            ></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GmMRate',
    props: {
        count: {
            type: [Number,String],
            default: 5
        },
        value: {
            type: Number,
            default: 0
        },
        voidIcon: String,
        icon: String,
        color: {
            type: String,
            default: '#ff5f3b'
        },
        voidColor: {
            type: String,
            default: '#c8c9cc'
        },
        size: {
            type: [String, Number],
            default: '20px'
        },
        gutter: {
            type: [String,Number]
        },
        disabled: Boolean,
        readonly: Boolean,
        disabledColor: {
            type: String,
            default: '#c8c9cc'
        },
        allowHalf: Boolean,
        touchable: Boolean
    },
    model: {
        prop: 'value',
        event: 'handleClick',
    },
    data() {
        return {
            id: null,
            ranges: []
        }
    },
    computed: {
        fontSize() {
            return typeof this.size === 'number'? this.size+'px' : this.size
        },
        countList(){
            let arr= []
            for (let i =1; i<=this.count; i++) {
                let obj= {}
                obj.id = i
                obj.icon= this.voidIcon === void 0? 'gm-m-icon-iocn-xingping1' : this.voidIcon
                obj.active= ''
                obj.activeHalf= ''
                arr.push(obj)
            }
            return arr
        }
    },
    watch: {
        'countList': {
            handler: function (val) {
                this.id = this.value
                this.active(this.id)
            },
            immediate: true,
        }
    },
    methods: {
        handleClick(val, type){
            if (this.disabled || this.readonly) return
            let id = type === 'all'? val.id : val.id - 0.5
            this.id = id
            this.active(id)
            this.$emit('handleClick', id)
            this.$emit('change', id)
        },
        active(id) {
            this.countList.forEach(item => {
                if (item.id <= id) {
                    item.active = 'active'
                    item.icon = this.icon === void 0? 'gm-m-icon-iocn-xingping1': this.icon
                }
                else {
                    item.active = ''
                    item.activeHalf = ''
                    item.icon = this.voidIcon === void 0? 'gm-m-icon-iocn-xingping1': this.voidIcon
                }
            })
            if (!Number.isInteger(id)){
                this.countList[Math.ceil(id)-1].activeHalf = 'activeHalf'
                this.countList[Math.ceil(id)-1].icon = this.icon === void 0? 'gm-m-icon-iocn-xingping1': this.icon
            }
        },
        onTouchstart(e){
            let _this = this;
            let rects = this.$refs.items.map(function (item) {
                return item.getBoundingClientRect();
            });
            let ranges = [];
            rects.forEach(function (rect, index) {
                if (_this.allowHalf) {
                    ranges.push({
                        score: index + 0.5,
                        left: rect.left
                    }, {
                        score: index + 1,
                        left: rect.left + rect.width / 2
                    });
                } else {
                    ranges.push({
                        score: index + 1,
                        left: rect.left
                    });
                }
            });
            this.ranges = ranges;
        },
        bodyTouchMove(e) {
            let clientX = e.touches[0].clientX;
            this.getScoreByPosition(clientX)
            let type = void 0
            let integer = null
            if (!Number.isInteger(this.getScoreByPosition(clientX))) {
                type = 'half'
            } else {
                type = 'all'
            }
            integer = Math.ceil(this.getScoreByPosition(clientX))
            this.handleClick(this.countList[integer - 1], type)
        },
        getScoreByPosition: function getScoreByPosition(x) {
            // eslint-disable-next-line no-inner-declarations
            for (var i = this.ranges.length - 1; i > 0; i--) {
                if (x > this.ranges[i].left) {
                    return this.ranges[i].score;
                }
            }
            return this.allowHalf ? 0.5 : 1;
        },
    }
};
</script>

