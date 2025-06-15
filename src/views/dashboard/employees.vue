<template>
  <div class="employee-management">
    <div class="content-wrapper">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="hover" class="data-card">
            <div class="card-header">
              <el-icon class="icon"><EditPen /></el-icon>
              <span>在职</span>
            </div>
            <div class="card-body">
              <span class="number"> {{ getTotalEmployees("Active") }}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover" class="data-card">
            <div class="card-header">
              <el-icon class="icon"><Finished /></el-icon>
              <span>离职</span>
            </div>
            <div class="card-body">
              <span class="number"> {{ getTotalEmployees("Inactive") }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 员工列表区域 -->
    <el-row :gutter="20" class="employee-row">
      <el-col :span="24">
        <el-card shadow="hover">
          <div class="header">
            <span>员工管理</span>
            <div class="header-controls">
              <el-input
                v-model="searchQuery"
                placeholder="搜索员工姓名"
                class="search-input"
                clearable
              >
                <template #prefix>
                  <el-icon><Search /></el-icon>
                </template>
              </el-input>
              <el-select
                v-model="statusFilter"
                placeholder="账号状态"
                clearable
              >
                <el-option label="启用" value="Active" />
                <el-option label="禁用" value="Inactive" />
              </el-select>
              <el-button type="primary" @click="showAddDialog" :icon="Plus">
                添加员工
              </el-button>
            </div>
            <!-- 添加新员工的对话框 -->
            <el-dialog
              v-model="dialogVisible"
              title="添加新员工"
              width="30%"
              :close-on-click-modal="false"
            >
              <el-form
                ref="addFormRef"
                :model="addForm"
                :rules="addFormRules"
                label-width="80px"
              >
                <el-form-item label="员工姓名" prop="name">
                  <el-input
                    v-model="addForm.name"
                    placeholder="请输入员工姓名"
                  />
                </el-form-item>

                <el-form-item label="账号状态" prop="status">
                  <el-select
                    v-model="addForm.status"
                    placeholder="请选择账号状态"
                  >
                    <el-option label="启用" value="Active" />
                    <el-option label="禁用" value="Inactive" />
                  </el-select>
                </el-form-item>
              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogVisible = false">取消</el-button>
                  <el-button type="primary" @click="handleAddEmployee"
                    >确定</el-button
                  >
                </span>
              </template>
            </el-dialog>
          </div>
          <div class="employee-list">
            <el-table :data="filteredEmployees" style="width: 100%">
              <el-table-column
                prop="name"
                label="员工姓名"
                min-width="20%"
                align="center"
              />
              <el-table-column
                prop="account"
                label="员工"
                min-width="20%"
                align="center"
              />
              <el-table-column
                prop="phoneNumber"
                label="手机号码"
                min-width="20%"
                align="center"
              />

              <el-table-column
                prop="status"
                label="账号状态"
                min-width="20%"
                align="center"
              >
                <template #default="scope"
                  ><el-tag :type="getStatusTag(scope.row.status)">
                    {{ getStatusText(scope.row.status) }}
                  </el-tag></template
                >
              </el-table-column>
              <el-table-column label="操作" min-width="20%" align="center">
                <template #default="scope">
                  <el-button
                    v-if="scope.row.status === 'Inactive'"
                    type="success"
                    size="small"
                    @click="handleListedEmployee(scope.row)"
                  >
                    启用
                  </el-button>

                  <el-button
                    v-if="scope.row.status === 'Active'"
                    type="primary"
                    size="small"
                    @click="handleUnlistedEmployee(scope.row)"
                    >禁用</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { getCurrentInstance } from "vue";
import { EditPen, Finished, Search, Plus } from "@element-plus/icons-vue";
import api from "@/api/api";

const { proxy } = getCurrentInstance();

const searchQuery = ref("");
const statusFilter = ref("");
const employees = ref([]);
const dialogVisible = ref(false);
const addFormRef = ref(null);
const addForm = ref({
  name: "",
  account: "",
  phoneNumber: "",
  status: "Active",
});

const fetchEmployees = async () => {
  try {
    const res = await api.getEmployees();
    if (res.code === 200) {
      employees.value = res.data.list;
    } else {
      ElMessage.error(res.message || "获取员工列表失败");
    }
  } catch (error) {
    console.error("获取员工列表失败:", error);
    ElMessage.error("获取员工列表失败");
  }
};

onMounted(() => {
  fetchEmployees();
});

const filteredEmployees = computed(() => {
  return employees.value.filter((employee) => {
    if (statusFilter.value && employee.status !== statusFilter.value) {
      return false;
    }
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      return employee.name.toLowerCase().includes(query);
    }
    return true;
  });
});

const getTotalEmployees = (status) => {
  if (status === "all") {
    return employees.value.length;
  }
  return employees.value.filter((employee) => employee.status === status)
    .length;
};

const getStatusTag = (status) => {
  const statusMap = {
    Active: "success",
    Inactive: "info",
  };
  return statusMap[status];
};

const getStatusText = (status) => {
  const statusMap = {
    Active: "启用",
    Inactive: "禁用",
  };
  return statusMap[status];
};

const handleListedEmployee = (employee) => {
  employee.status = "Active";
  ElMessage.success("账号已启用");
};

const handleUnlistedEmployee = (employee) => {
  employee.status = "Inactive";
  ElMessage.success("账号已禁用");
};

const addFormRules = {
  name: [
    { required: true, message: "请输入员工姓名", trigger: "blur" },
    { min: 2, max: 5, message: "长度在 2 到 5个字符", trigger: "blur" },
  ],
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 2, max: 10, message: "长度在 2 到 10个字符", trigger: "blur" },
  ],

  phoneNumber: [
    { required: true, message: "请输入手机号码", trigger: "blur" },
    { type: "number", min: 0, message: "长度在0到12个字符", trigger: "blur" },
  ],
  status: [{ required: true, message: "请选择账号状态", trigger: "change" }],
};

const showAddDialog = () => {
  dialogVisible.value = true;
  // 重置表单
  if (addFormRef.value) {
    addFormRef.value.resetFields();
  }
};

const handleAddEmployee = async () => {
  if (!addFormRef.value) return;

  await addFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        employees.value.push({
          name: addForm.value.name,
          account: addForm.value.account,
          phoneNumber: addForm.value.phoneNumber,
          status: addForm.value.status,
        });

        ElMessage.success("添加员工成功");
        dialogVisible.value = false;

        // 重新获取套餐列表（如果需要的话）
        await fetchEmployees();
      } catch (error) {
        console.error("添加员工失败:", error);
        ElMessage.error("添加员工失败");
      }
    }
  });
};
</script>

<style lang="less" scoped>
.employee-management {
  min-height: calc(100vh - 60px);
}

.content-wrapper {
  padding: 20px;
  .el-row {
    margin-bottom: 20px !important;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.data-card {
  height: 100%;
  padding: 20px;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .icon {
    margin-right: 8px;
    font-size: 24px;
    color: #e6a23c;
  }

  span {
    font-size: 16px;
    font-weight: 500;
    color: #303133;
  }
}

.card-body {
  display: flex;
  align-items: center;

  .number {
    font-size: 28px;
    font-weight: bold;
    color: #303133;
    line-height: 1;
  }
}

.employee-row {
  margin-top: 20px;

  .el-card {
    .header {
      padding: 16px 20px;
      border-bottom: 1px solid #ebeef5;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-size: 16px;
        font-weight: 500;
        color: #303133;
      }

      .header-controls {
        margin: 20px 0;
        display: flex;
        gap: 16px;
        align-items: center;
        justify-content: flex-start;

        .search-input {
          width: 240px;
        }

        .el-button {
          margin-left: auto; // 将按钮推到右边
        }
      }
    }
    :deep(.el-dialog) {
      .el-dialog__body {
        padding: 20px 40px;
      }

      .el-form-item {
        margin-bottom: 20px;
      }
    }

    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    .employee-list {
      margin-top: 20px;
    }
  }
}
</style>