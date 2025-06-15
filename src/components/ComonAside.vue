<template>
  <div
    class="aside-container"
    :style="{ width: store.state.isCollapse ? '64px' : '200px' }"
  >
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#e6a23c"
      :collapse="store.state.isCollapse"
      :collapse-transition="true"
      :default-active="$route.path"
      router
      unique-opened
    >
      <h3>{{ store.state.isCollapse ? "后台" : "外卖管理系统" }}</h3>

      <!-- 遍历所有菜单项 -->
      <template v-for="item in menuList" :key="item.path">
        <!-- 没有子菜单的菜单项 -->
        <el-menu-item
          v-if="!item.children"
          :index="item.path"
          @click="clickMenu(item)"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          <template #title>{{ item.label }}</template>
        </el-menu-item>

        <!-- 有子菜单的菜单项 -->
        <el-sub-menu v-else :index="item.path">
          <template #title>
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.label }}</span>
          </template>

          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.path"
            :index="subItem.path"
            @click="clickMenu(subItem)"
          >
            <el-icon><component :is="subItem.icon" /></el-icon>
            <template #title>{{ subItem.label }}</template>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const route = useRoute();
const store = useStore();

const menuList = computed(() => store.state.menu);

// 点击菜单项的处理函数
const clickMenu = (item) => {
  if (!item.children) {
    router.push(item.path);
    store.commit("selectMenu", item);
  }
};
</script>

<style lang="less" scoped>
.aside-container {
  height: 100vh;
  transition: width 0.3s;
  background-color: #e6a23c;

  .el-menu {
    width: 100% !important;
    height: 100%;
    border-right: none;

    h3 {
      height: 48px;
      line-height: 48px;
      text-align: center;
      color: white;
      font-size: 26px;
      font-weight: bold;
      margin: 0;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  color: white;

  &:hover {
    background-color: darken(#e6a23c, 10%);
  }

  .el-icon {
    color: white;
  }
}

:deep(.el-menu-item.is-active) {
  background-color: #fff3e0;
  color: #e6a23c;

  .el-icon {
    color: #e6a23c;
  }
}

// 添加子菜单样式
:deep(.el-sub-menu) {
  .el-menu {
    background-color: darken(#e6a23c, 5%);
  }

  .el-menu-item {
    background-color: darken(#e6a23c, 5%);

    &:hover {
      background-color: darken(#e6a23c, 10%);
    }

    &.is-active {
      background-color: #fff3e0;
      color: #e6a23c;
    }
  }
}
</style>