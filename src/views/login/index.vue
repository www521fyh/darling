<template>
  <div class="login">
    <el-card class="login_card">
      <div class="card-content">
        <el-image class="login_image" :src="login_url" fit="cover"></el-image>
        <div class="form-container">
          <p class="login_title">外卖管理系统</p>
          <el-form ref="loginForm" :model="form" :rules="rules">
            <el-form-item prop="username">
              <el-input
                type="input"
                placeholder="请输入账号"
                v-model="form.username"
              >
                <template #prefix>
                  <el-icon><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="请输入密码"
                v-model="form.password"
                show-password
              >
                <template #prefix>
                  <el-icon><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="loginLoading"
                size="large"
                round
                style="background: #e6a23c; color: white; width: 100%"
                @click="submitForm"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import loginImage from "@/assets/img/login.png";
import { User, Lock } from "@element-plus/icons-vue";
import api from "@/api/api";

const store = useStore();
const router = useRouter();
const { proxy } = getCurrentInstance();
const loginForm = ref(null);

// 响应式数据
const login_url = ref(loginImage);
const loginLoading = ref(false);
const form = ref({
  username: "",
  password: "",
});

const rules = {
  username: [
    {
      required: true,
      message: "请输入管理员账号",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入管理员密码",
      trigger: "blur",
    },
  ],
};

// 登录方法
const login = async () => {
  try {
    loginLoading.value = true;
    const res = await api.getMenu(form.value);
    console.log("登录响应:", res); // 添加日志
    if (res.code === 200) {
      store.commit("setMenu", res.data.menu);
      localStorage.setItem("t_k", JSON.stringify(res.data.token));
      localStorage.setItem("menu", JSON.stringify(res.data.menu));
      ElMessage.success("登录成功");
      router.push("/main");
    } else {
      ElMessage.error(res.message || "登录失败");
    }
  } catch (error) {
    console.error("登录错误:", error);
    ElMessage.error("登录失败");
  } finally {
    loginLoading.value = false;
  }
};

// 表单提交
const submitForm = () => {
  if (!loginForm.value) return;
  loginForm.value.validate((valid) => {
    if (valid) {
      login();
    }
  });
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-color: #e6a23c;
  display: flex;
  justify-content: center;
  align-items: center;

  .login_card {
    width: 800px;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .card-content {
      display: flex;
      height: 400px;

      .login_image {
        flex: 1;
        height: 100%;
        object-fit: cover;
      }

      .form-container {
        flex: 1;
        padding: 40px;
        display: flex;
        flex-direction: column;

        .login_title {
          font-size: 24px;
          font-weight: bold;
          color: #303133;
          text-align: center;
          margin-bottom: 30px;
        }

        .el-form {
          .el-form-item {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>