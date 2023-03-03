<template>
    <div>
        <gm-m-button
            @click="handleClick"
        >
            111
        </gm-m-button>
        <br>
        <gm-m-select
            ref="select"
            title="标题"
            :columns="columns"
            show-toolbar
        />
    </div>
</template>

<script>
export default {
    name: "Index",
    components: {
    },
    data() {
        return {
            show: false,
            react: 0,
            value: 0,
            columns: [
                {
                    text: '浙江',
                    children: [
                        {
                            text: '杭州',
                            children: [{ text: '西湖区'}, { text: '余杭区' }],
                        },
                        {
                            text: '温州',
                            children: [{ text: '鹿城区' }, { text: '瓯海区' }],
                        },
                    ],
                },
                {
                    text: '福建',
                    children: [
                        {
                            text: '福州',
                            children: [{ text: '鼓楼区' }, { text: '台江区' }],
                        },
                        {
                            text: '厦门',
                            children: [{ text: '思明区' }, { text: '海沧区' }],
                        },
                    ],
                },
            ],
        }
    },
    methods: {
        handleClick() {
            // this.$refs.select.setValues(['福建','厦门'])
            this.$refs.select.setColumnIndex(0,1)
        },
        handleTest() {
            console.log('test');
        },
        handleBlur(e){
            console.log(e);
        },
        handleChange(e){
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
            // 注意此时修改 value 后会再次触发 change 事件
                this.value = e;
            }, 500);
        },
    }
}
</script>

<style scoped>
</style>