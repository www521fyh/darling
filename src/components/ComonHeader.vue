<template>
  <el-header>
    <!-- 左侧导航栏 -->
    <div class="l-context">
      <el-button @click="handleIsCollapse">
        <el-icon><Operation /></el-icon>
      </el-button>
      <el-breadcrumb separator="/">
        <!-- 第一个面包屑默认就是首页，点击后会触发store中的selectMenu方法 -->
        <el-breadcrumb-item :to="{ path: '/home' }" @click="handleHomeClick">
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="current.label" :to="current.path">
          {{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- r-context 是右侧导航栏的内容 -->
    <div class="r-context">
      <!-- 触发下拉的可见内容（头像+用户名） -->
      <el-dropdown>
        <div class="user-info el-dropdown-link">
          <img class="user-avatar" :src="userAvatar" alt="用户头像" />
          <span class="username">{{ userName }}</span>
        </div>

        <!-- 下拉菜单 -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Operation } from "@element-plus/icons-vue";
import userAvatar from "@/assets/img/user.png"; // 直接导入图片

const router = useRouter();
const store = useStore();
const userName = ref("管理员");

//这个属性就是当前路由页面的信息，从store的currentMenu上获取
const current = computed(() => {
  return store.state.currentMenu || {};
});

//handleriscoll 就是触发store的updateIsCollapse方法
function handleIsCollapse() {
  store.commit("updateIsCollapse", !store.state.isCollapse);
}

function handleHomeClick() {
  store.commit("selectMenu", { path: "/home" });
}

//退出登录
function handleLogout() {
  router.push({
    path: "/login",
  });
}
</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px; /* 固定header高度 */
  padding: 0; /* 移除默认内边距 */

  .el-breadcrumb {
    :deep(span) {
      color: black !important;
    }
  }
  .el-button {
    background-color: white;
    border: none;
    box-shadow: none;
  }
}

.l-context {
  margin-left: 20px;
  display: flex;
  align-items: center;
  color: black;
  font-weight: bold;
  .el-button {
    margin-right: 10px;
  }
}

.r-context {
  margin-right: 20px;
  display: flex;
  align-items: center;
  color: black;

  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 50px;
    padding: 12px 0;

    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 8px;
    }

    .username {
      font-size: 14px;
      font-weight: 500;
      max-width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>