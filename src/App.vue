<template>
  <!-- 这里可以看到不需要根了 -->
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1>{{ title }}</h1> 
  <!-- 可以使用两个v-model，然后添加两组input -->
  <Input v-model:title="title" />  
  <div>{{name}} </div>
  姓名:{{n_name}}
  {{test1}}

</template>

<script>
import Input from "./components/Input.vue"
import {
  reactive,
  ref,
  computed,
  readonly,
  watchEffect,
  watch
} from "vue"

export default {
  name: 'App',
  data(){
    return{
      title:"蛙人"
    }
  },

  /* props:{
    title:{
      type:String,
      default:()=>"123"
    }
  }, */

  //多了一个新的生命周期setup
  //位于props初始化之后，beforeCreate之前执行
  //props数据不能在参数中使用解构，即setup({ title }) ，
  //否则响应式数据失效
  //但是在setup上添加了一个context属性，暴露了一些2.x
  //中的特性，这个是可以解构的
  setup(props,{ attrs, slots, emit }){

    //(0)setup和beforeCreate之间
    console.log("hey 蛙人");


    //(1)this不可用
    //由于不能再setup里使用data、methods，为了避免出错
    //直接把setup中的this修改为了undefined
    console.log(this);

    //(2)props
    //接收组件传过来的所有数据，并且都是响应式的
    //这点和函数组件神他妈相似
    console.log("props:",props.title);

    //(3)context
    //输出context中解构出来的部分内容
    //attrs和slots都是内部组件实例上对应项的代理，
    //可以确保在更新后仍然还是最新的值。所以这里可以使用解构语法。
    console.log("attrs",attrs);


    //(4)reactive
    //reactive和Vue2.x的Vue.observable一个样
    //let n_name = reactive({value:"虎符"});


    //(5)ref
    //ref:该方法接收一个参数，可以是单个值，也可以是一个对象
    //并且都是响应式数据，通过.value取set
    //在界面get的时候就不用.value了
    let n_name = ref("蛙人");


    // 该方法测试响应式数据，可以看到执行完该方法视图也会发生改变
    /* function test(){
      n_name.value = "abc";
    } */



    //(6)computed
    //computed 该方法传入一个函数，默认该函数就是getter，
    //不管getter返回值为一个ref响应式数据还是一个普通变量
    //数据都是只读不可改变
    let test = computed(()=>n_name.value) //区别于方法，不能用方法去调用
    test.value = "abc";//修改无效，只能只读
    //那如果我想修改怎么办呢？传入一个对象，内置set和get函数
    let test1 = computed({
      get(){
        return n_name.value;
      },
      set(val){
        return n_name.value = val;
      }
    })
    test1.value = "123";

    //(7)readonly
    //该方法接收传入一个对象，默认是只读功能，
    //是深层对象只读，不管嵌套多少层的属性都是只读状态
    //区分于const只是引用只读
    let only = readonly({
      name:"蛙人",
      sex:"male",
      production:{
        proName:"音响"
      }
    })
    only.name = "前端娱乐圈";//修改无效
    only.production.proName ="欢迎关注"; //修改无效
    console.log(only);



    //(8)watchEffect
    //这货就是useEffect的缩减版，yyx抄的确实厉害
    //该方法接收一个函数并且立即执行，并当该函数中的变量变更时
    //重新执行该函数，无法获取原值，只能获取改变之后的值
    //如果要监听哪个值，需要在该函数里写出来，否则监听无效
    //如果想取消监听，执行
    let age = ref(32);
    let stop =  watchEffect(()=>{
      n_name.value; //监听name
      age.value;    //监听age
      console.log(n_name.value);
      console.log(age.value);
    });
    setTimeout(()=>{
      n_name.value = "前端娱乐圈";
    },5000);
    setTimeout(() => {
      age.value = 18;
      //在setTimeout
      setTimeout(stop,300);
    }, 1000);



    //(8)watch
    //watch等同于vue2.x中的this.$watch，watch需要监听特定数据
    //默认情况是懒执行，也就是只有当数据发生变化时
    //才执行第二个参数函数
    //VS watchEffect watch新增特性：
    //1.懒执行函数  2.更明确哪些状态改变触发监听器  
    //3.可以监听获取到变化前后的值

    watch(n_name,(nv,ov)=>{
      console.log(nv,ov);
    })

    //监听多个值，返回的是一个数组对象
    watch([n_name,age],(nv,ov)=>{
      console.log(nv,ov);
    })

    setTimeout(() => {
      n_name.value = "前端娱乐圈";
      age.value = 17;
    }, 2000);







    //可以返回一个对象，该对象可以在界面上渲染
    return {
      name:"蛙人",
      n_name,
      test
    }



  },
  beforeCreate() {
    console.log("我是大头鱼");
  },

  components: {
    Input
  }
}
</script>
