<template>
  <div class="common-layout">
    <el-container>
      <comon-aside class="aside"></comon-aside>
      <el-container class="right-container">
        <el-header>
          <comon-header></comon-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import ComonHeader from "@/components/ComonHeader.vue";
import ComonAside from "../components/ComonAside.vue";
</script>

<style lang="less" scoped>
.common-layout {
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  .el-container {
    height: 100%;
    display: flex;

    .aside {
      flex-shrink: 0;
      height: 100vh;
    }

    .right-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      overflow: hidden;

      .el-header {
        height: 60px;
        background-color: white;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
      }

      .el-main {
        flex: 1;
        padding: 20px;
        background-color: #f5f7fa;
        overflow-y: auto;
      }
    }
  }
}
</style>