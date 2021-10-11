<template>
    {{NAME}}
</template>

<script>
import {inject} from "vue"
export default{
    name:"test",
    setup(){
        let NAME = inject("name");

        //如果找不到key值就会触发我们设置的默认值 
        let title = inject("key","inject test");
        console.log(title);
        return {
            NAME
        }
    }

}

</script>