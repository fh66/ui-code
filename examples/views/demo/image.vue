<template>
    <div>
        <gm-m-row :gutter="20">
            <gm-m-col :span="2">
                <gm-m-image
                    src="https://img01"
                    width="80"
                    height="80"
                    fit="contain"
                    round
                />
            </gm-m-col>
            <gm-m-col :span="2">
                <gm-m-image
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
                    width="80"
                    height="80"
                    fit="contain"
                    round
                />
            </gm-m-col>
            <gm-m-col :span="2">
                <gm-m-image
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
                    width="80"
                    height="80"
                    fit="contain"
                    round
                >
                    <div slot="loading">自定义加载提示</div>
                </gm-m-image>
            </gm-m-col>
        </gm-m-row>
        <gm-m-button>
            111
        </gm-m-button>
        <gm-m-loading type="spinner" />
        <gm-m-loading />
    </div>
</template>

<script>
export default {
    name: "demo-image",
};
</script>

<style>
</style>