<template>
    <div>
        <domeBase />
        <gm-m-stepper v-model="stepperVal" integer max="3" input-width="140px" theme="round" @change="onChange" />
    </div>
</template>

<script>
import domeBase from '../components/domeBase/index'
export default {
    name: "Demo",
    components: {
        domeBase
    },
    data(){
        return {
            list: [1,2,3,4,5,6],
            stepperVal: 1
        }
    },
    methods: {
        handleClick() {
            console.log(123);
        },
        handleIcon(e){
            console.log(e, 'icon');
        },
        onChange(e){
            console.log('e: ', e);
            setTimeout(()=>{
                this.stepperVal = e+''
            },1000)
        }
    }
}
</script>

<style lang="less">
</style>