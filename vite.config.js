/*----------------------------------------------------
vite的一些特性：
1.可以直接import导入css文件了eg:main.js

2.style标签跟之前一样可以使用scoped

3.style标签加module可以使用css module
使用的时候
import style from "xxx.css"
<span :class="$style.yyy"> </span>

4.lang="scss" 可以直接使用

5.vite自动对*.vue文件和导入的.css文件应用postCSS配置
我们只需要install对应的插件和添加postcss.config.js文件即可
eg：本地配置

6.资源url处理
可以直接在*.vue的文件的template，style和纯.css文件中以相对
和绝对路径引用静态资源，这里给一个css的例子
background-image: url('./assets/logo.png');

7.public配置
public目录下可以存放未在源码中引用的资源，
它们会被留下，且文件名不会头嘻哈处理。
这些文件会被原封不动拷贝到发布目录的根目录下。


-----------------------------------------------------*/


import { resolve  } from "path";
//使用defineConfig，error1:
//defineConfig was added in Vite 2. 
//Update to the latest version (^2.4.2).
//然后报错error2:
//Failed to parse source for import analysis because
//the content contains invalid JS syntax. 
//Install @vitejs/plugin-vue to handle .vue files.
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//大圣神奇插件
import sleep from "vite-plugin-sleep"
export default defineConfig({
    //8.定义别名
    resolve:{
        alias:{
            "@":resolve(__dirname,"src")
        }
    },
    //9.添加插件
    //我们可以引入大圣的究极插件sleep
    //顺便后期可以看看插件实现
    plugins: [
        vue(),
        //大圣的神奇插件
        /* sleep({
            devServerStartDelay:5*60*1000,
            hmrDelay:0
        })
     */
    
    ],
    //10.设置代理/getWeather.php
    server:{
        host: '0.0.0.0',
        port: 3000,
        proxy: {
            '/api': {
              target: 'https://api2.jirengu.com',
              changeOrigin: true,
              rewrite: path => path.replace(/^\/api/, '')
            }
        },
    },
    //11.publicPath的配置
    base:"./",
    //12.配置打包入口和出口
    build:{
        outDir: 'dist',
        //vite在打包中会计算包的大小，但是只是计算不做处理，
        //会加长打包时间，所以可以在build中再添加一个配置项关闭打包计算。
        brotliSize: false,
        //基础依赖有rollup
        rollupOptions:{
            //在构建过程中，只需要指定.html文件作为入口即可
            input:{
                main:resolve(__dirname,'index.html'),//也可以指定多个
            },
            //默认打包的所有静态文件都放在assets文件夹中，我们这里放在static中并拆分
            output: {
                //这几个属性是roolup的
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
                assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
            },
        }
    }
})