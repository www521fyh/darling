<<<<<<< HEAD
#Vite不支持require语法，替换所有 require() 为 import

#mock.js
第一步：安装 mockjs 依赖
bash
npm install mockjs --save-dev
# 或
yarn add mockjs -D
第二步：检查文件扩展名
确保 src/api/mock.js 文件：

实际存在且扩展名是 .js（不是 .JS）

内容与前面讨论的修正代码一致

第三步：验证 Vite 配置
在 vite.config.js 中添加对 CommonJS 模块的支持（Mock.js 是 CommonJS 模块）：

javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['mockjs'] // 明确包含 Mock.js
  }
})
第四步：清理缓存并重启
bash
rm -rf node_modules/.vite  # 清理 Vite 缓存
npm install               # 重新安装依赖
npm run dev              # 重启开发服务器
常见问题排查
如果安装后仍报错

检查 package.json 中是否真的添加了依赖：

json
"devDependencies": {
  "mockjs": "^1.1.0"
}
大小写敏感问题

确保导入语句的大小写完全匹配：

javascript
import Mock from "mockjs" // 正确
// import Mock from "MockJS" // 错误
模块类型问题

如果是 TypeScript 项目，还需安装类型声明：

bash
npm install @types/mockjs --save-dev

#echarts图表
npm install echarts --save

#order
order 的来源
在 filteredOrders 的计算属性中，orders.value.filter() 的 filter 方法会遍历数组的每个元素，并将当前元素作为参数传递给回调函数。这里的 order 就是那个参数

#增加页面顺序
1.路由文件router/index.js中增加组件
2.在菜单api/mockdata/permission.js中增加组件
=======
# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
>>>>>>> f36fe97cb5d79a56627d9d465ad14d035c2d82b2
