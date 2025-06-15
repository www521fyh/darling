<template>
  <div class="package-management">
    <div class="content-wrapper">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="hover" class="data-card">
            <div class="card-header">
              <el-icon class="icon"><EditPen /></el-icon>
              <span>已启售</span>
            </div>
            <div class="card-body">
              <span class="number"> {{ getTotalPackages("Active") }}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover" class="data-card">
            <div class="card-header">
              <el-icon class="icon"><Finished /></el-icon>
              <span>已停售</span>
            </div>
            <div class="card-body">
              <span class="number"> {{ getTotalPackages("Inactive") }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 套餐列表区域 -->
    <el-row :gutter="20" class="package-row">
      <el-col :span="24">
        <el-card shadow="hover">
          <div class="header">
            <span>套餐管理</span>
            <div class="header-controls">
              <el-input
                v-model="searchQuery"
                placeholder="搜索套餐名称"
                class="search-input"
                clearable
              >
                <template #prefix>
                  <el-icon><Search /></el-icon>
                </template>
              </el-input>
              <el-select
                v-model="statusFilter"
                placeholder="套餐状态"
                clearable
              >
                <el-option label="已启售" value="Active" />
                <el-option label="已停售" value="Inactive" />
              </el-select>
              <el-button type="primary" @click="showAddDialog" :icon="Plus">
                添加套餐
              </el-button>
            </div>
            <!-- 添加新套餐的对话框 -->
            <el-dialog
              v-model="dialogVisible"
              title="添加新套餐"
              width="30%"
              :close-on-click-modal="false"
            >
              <el-form
                ref="addFormRef"
                :model="addForm"
                :rules="addFormRules"
                label-width="80px"
              >
                <el-form-item label="套餐名称" prop="name">
                  <el-input
                    v-model="addForm.name"
                    placeholder="请输入套餐名称"
                  />
                </el-form-item>
                <el-form-item label="价格" prop="price">
                  <el-input-number
                    v-model="addForm.price"
                    :min="0"
                    :precision="0"
                    :step="1"
                    placeholder="请输入价格"
                  />
                </el-form-item>
                <el-form-item label="套餐状态" prop="status">
                  <el-select
                    v-model="addForm.status"
                    placeholder="请选择套餐状态"
                  >
                    <el-option label="上架" value="Active" />
                    <el-option label="下架" value="Inactive" />
                  </el-select>
                </el-form-item>
              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogVisible = false">取消</el-button>
                  <el-button type="primary" @click="handleAddPackage"
                    >确定</el-button
                  >
                </span>
              </template>
            </el-dialog>
          </div>
          <div class="package-list">
            <el-table :data="filteredPackages" style="width: 100%">
              <el-table-column
                prop="name"
                label="套餐名称"
                min-width="25%"
                align="center"
              />
              <el-table-column
                prop="price"
                label="价格"
                min-width="25%"
                align="center"
              >
                <template #default="scope">
                  ¥{{ scope.row.price }}
                </template></el-table-column
              >
              <el-table-column
                prop="status"
                label="状态"
                min-width="25%"
                align="center"
              >
                <template #default="scope"
                  ><el-tag :type="getStatusTag(scope.row.status)">
                    {{ getStatusText(scope.row.status) }}
                  </el-tag></template
                >
              </el-table-column>
              <el-table-column label="操作" min-width="25%" align="center">
                <template #default="scope">
                  <el-button
                    v-if="scope.row.status === 'Inactive'"
                    type="success"
                    size="small"
                    @click="handleListedPackage(scope.row)"
                  >
                    上架
                  </el-button>

                  <el-button
                    v-if="scope.row.status === 'Active'"
                    type="primary"
                    size="small"
                    @click="handleUnlistedPackage(scope.row)"
                    >下架</el-button
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
const packages = ref([]);
const dialogVisible = ref(false);
const addFormRef = ref(null);
const addForm = ref({
  name: "",
  price: 0,
  status: "Active",
});

const fetchPackages = async () => {
  try {
    const res = await api.getPackages();
    if (res.code === 200) {
      packages.value = res.data.list;
    } else {
      ElMessage.error(res.message || "获取套餐列表失败");
    }
  } catch (error) {
    console.error("获取套餐列表失败:", error);
    ElMessage.error("获取套餐列表失败");
  }
};

onMounted(() => {
  fetchPackages();
});

const filteredPackages = computed(() => {
  return packages.value.filter((pkg) => {
    if (statusFilter.value && pkg.status !== statusFilter.value) {
      return false;
    }
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      return pkg.name.toLowerCase().includes(query);
    }
    return true;
  });
});

const getTotalPackages = (status) => {
  if (status === "all") {
    return packages.value.length;
  }
  return packages.value.filter((pkg) => pkg.status === status).length;
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
    Active: "已启售",
    Inactive: "已停售",
  };
  return statusMap[status];
};

const handleListedPackage = (pkg) => {
  pkg.status = "Active";
  ElMessage.success("套餐已上架");
};

const handleUnlistedPackage = (pkg) => {
  pkg.status = "Inactive";
  ElMessage.success("套餐已下架");
};

const addFormRules = {
  name: [
    { required: true, message: "请输入套餐名称", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" },
  ],
  price: [
    { required: true, message: "请输入套餐价格", trigger: "blur" },
    { type: "number", min: 0, message: "价格必须大于 0", trigger: "blur" },
  ],
  status: [{ required: true, message: "请选择套餐状态", trigger: "change" }],
};

const showAddDialog = () => {
  dialogVisible.value = true;
  // 重置表单
  if (addFormRef.value) {
    addFormRef.value.resetFields();
  }
};

const handleAddPackage = async () => {
  if (!addFormRef.value) return;

  await addFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        packages.value.push({
          name: addForm.value.name,
          price: addForm.value.price,
          status: addForm.value.status,
        });

        ElMessage.success("添加套餐成功");
        dialogVisible.value = false;

        // 重新获取套餐列表（如果需要的话）
        await fetchPackages();
      } catch (error) {
        console.error("添加套餐失败:", error);
        ElMessage.error("添加套餐失败");
      }
    }
  });
};
</script>

<style lang="less" scoped>
.package-management {
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

.package-row {
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

    .package-list {
      margin-top: 20px;
    }
  }
}
</style>