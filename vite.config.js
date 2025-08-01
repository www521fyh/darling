import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
<<<<<<< HEAD
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'


export default defineConfig({
  //关闭语法校验
  lintOnSave: false,
  //plugins中使用刚下的依赖
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 确保指向项目根目录下的 src 文件夹
    }
  },
  optimizeDeps: {
    include: ['mockjs'] // 明确包含 Mock.js
  },
=======

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
>>>>>>> f36fe97cb5d79a56627d9d465ad14d035c2d82b2
})
