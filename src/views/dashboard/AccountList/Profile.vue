<template>
  <div class="profile-container">
    <div class="profile-header">
      <div class="profile-card">
        <div class="avatar-container">
          <el-avatar :size="100" :src="userAvatar" />
          <h3>{{ userInfo.name }}</h3>
          <p>{{ userInfo.role }}</p>
        </div>
      </div>
    </div>
    <div class="profile-body">
      <el-card shadow="hover" class="info-card">
        <template #header>
          <div class="card-header">
            <span>基本信息</span>
            <el-button type="primary" link @click="editMode = !editMode">
              {{ editMode ? "取消编辑" : "编辑" }}
            </el-button>
          </div>
        </template>

        <el-form
          ref="formRef"
          :model="userInfo"
          :disabled="!editMode"
          label-width="100px"
        >
          <el-form-item label="账号">
            <el-input v-model="userInfo.account" disabled />
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="userInfo.name" />
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
              v-model="userInfo.birthday"
              type="date"
              placeholder="选择日期"
              format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="userInfo.phone" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userInfo.email" />
          </el-form-item>

          <el-form-item v-if="editMode">
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button @click="editMode = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import userAvatar from "@/assets/img/user.png";
import api from "@/api/api";

const editMode = ref(false);
const formRef = ref(null);

// 用户信息
const userInfo = reactive({
  account: "",
  name: "",
  role: "",
  birthday: "",
  phone: "",
  email: "",
});

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    const res = await api.getUserInfo();
    if (res.code === 200) {
      Object.assign(userInfo, res.data);
    } else {
      ElMessage.error(res.message || "获取用户信息失败");
    }
  } catch (error) {
    console.error("获取用户信息失败:", error);
    ElMessage.error("获取用户信息失败");
  }
};

// 保存用户信息
const handleSave = async () => {
  try {
    const res = await api.updateUserInfo(userInfo);
    if (res.code === 200) {
      ElMessage.success("保存成功");
      editMode.value = false;
      await fetchUserInfo(); // 重新获取最新数据
    } else {
      ElMessage.error(res.message || "保存失败");
    }
  } catch (error) {
    console.error("保存失败:", error);
    ElMessage.error("保存失败");
  }
};

// 组件挂载时获取用户信息
onMounted(() => {
  fetchUserInfo();
});
</script>

<style lang="less" scoped>
.profile-container {
  padding: 20px;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;

  .profile-header {
    width: 100%;
    max-width: 380px;
    margin-bottom: 20px;

    .profile-card {
      width: 100%;
      background-color: transparent;

      .avatar-container {
        text-align: center;
        padding: 30px 0;
        .el-avatar {
          margin-bottom: 15px;
        }

        h3 {
          margin: 10px 0 5px;
          font-size: 18px;
          color: #303133;
          font-weight: 600;
        }

        p {
          margin: 0;
          color: #909399;
          font-size: 14px;
        }
      }
    }
  }

  .profile-body {
    width: 100%;
    max-width: 800px;

    .info-card {
      width: 100%;

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      :deep(.el-form) {
        max-width: 500px;
        margin: 0 auto;
        padding: 20px 0;
      }
    }
  }

  :deep(.el-input),
  :deep(.el-date-picker) {
    width: 100%;
  }

  .el-button {
    padding: 12px 20px;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
}

.account-layout {
  min-height: 100%;
  padding: 20px;
}

.password-container {
  min-height: calc(100vh - 100px); /* 60px导航栏 + 40px父容器padding */
  display: flex;
  justify-content: center;
  align-items: center;

  .password-card {
    height: 900px;
    max-width: 600px;
    width: 100%;
    margin: auto; /* 确保水平居中 */

    .card-header {
      font-size: 16px;
      font-weight: 500;
    }

    :deep(.el-form) {
      padding: 20px;
    }

    :deep(.el-input) {
      width: 100%;
    }

    .el-button {
      padding: 12px 20px;
      margin-right: 10px;
    }
  }
}
</style>