<template>
    <!-- 这里多了一个:value接收value值 -->
    <input type="text" @input="first" :value="title">
</template>
<script>
export default {
    name:"Input",
    props:{
        title:{
            default:()=>"蛙人"
        }
    },
    methods:{
        first(e){
            //这种和之前的emit键值区别，
            //直接就是update:对应的v-model键值
            this.$emit("update:title",e.target.value);
        }
    }
}
</script>