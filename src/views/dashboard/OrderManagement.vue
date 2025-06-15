<template>
  <div class="order-management">
    <div class="content-wrapper">
      <el-row :gutter="20">
        <el-col :span="6"
          ><el-card shadow="hover" class="data-card">
            <div class="card-header">
              <el-icon class="icon"><Edit /></el-icon>
              <span>待接单</span>
            </div>
            <div class="card-body">
              <span class="number"> {{ getTotalOrders("pending") }}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6"
          ><el-card shadow="hover" class="data-card">
            <div class="card-header">
              <el-icon class="icon"><ShoppingCart /></el-icon>
              <span class="order-name">待急送</span>
            </div>
            <div class="card-body">
              <span class="number">{{ getTotalOrders("accepted") }}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6"
          ><el-card shadow="hover" class="data-card">
            <div class="card-header">
              <el-icon class="icon"><DocumentChecked /></el-icon>
              <span>已完成</span>
            </div>
            <div class="card-body">
              <span class="number"> {{ getTotalOrders("completed") }}</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6"
          ><el-card shadow="hover" class="data-card">
            <div class="card-header">
              <el-icon class="icon"><ShoppingBag /></el-icon>
              <span>全部订单</span>
            </div>
            <div class="card-body">
              <span class="number">{{ getTotalOrders("all") }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 订单列表区域 -->
    <el-row :gutter="20" class="order-row">
      <el-col :span="24">
        <el-card shadow="hover">
          <div class="header">
            <span>订单管理</span>
            <div class="header-controls">
              <el-input
                v-model="searchQuery"
                placeholder="搜索订单号/客户名称"
                class="search-input"
                clearable
              >
                <template #prefix>
                  <el-icon><Search /></el-icon>
                </template>
              </el-input>
              <el-select
                v-model="statusFilter"
                placeholder="订单状态"
                clearable
              >
                <el-option label="全部" value="" />
                <el-option label="待接单" value="pending" />
                <el-option label="进行中" value="accepted" />
                <el-option label="已完成" value="completed" />
              </el-select>
            </div>
          </div>
          <div class="order-list">
            <el-table :data="filteredOrders" style="width: 100%">
              <el-table-column
                prop="orderNumber"
                label="订单编号"
                width="180"
              />
              <el-table-column
                prop="customerName"
                label="客户名称"
                width="120"
              />
              <el-table-column prop="dishes" label="菜品" min-width="200">
                <template #default="scope">
                  <el-tooltip
                    :content="getDishesPreview(scope.row.dishes, true)"
                    placement="top"
                    :show-after="500"
                  >
                    <span>{{
                      getDishesPreview(scope.row.dishes)
                    }}</span></el-tooltip
                  >
                </template>
              </el-table-column>
              <el-table-column prop="totalAmount" label="总金额" width="100">
                <template #default="scope">
                  ¥{{ scope.row.totalAmount }}
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" width="100">
                <template #default="scope"
                  ><el-tag :type="getStatusTag(scope.row.status)">
                    {{ getStatusText(scope.row.status) }}
                  </el-tag></template
                >
              </el-table-column>
              <el-table-column label="操作" width="120" fixed="right">
                <template #default="scope">
                  <el-button
                    v-if="scope.row.status === 'pending'"
                    type="primary"
                    size="small"
                    @click="handleAcceptOrder(scope.row)"
                    >接单</el-button
                  >
                  <el-button
                    v-if="scope.row.status === 'accepted'"
                    type="success"
                    size="small"
                    @click="handleCompleteOrder(scope.row)"
                  >
                    完成
                  </el-button>
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
import {
  Document,
  Timer,
  CircleCheck,
  Collection,
  Search,
} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { getCurrentInstance } from "vue";
import api from "@/api/api";
// 获取全局属性
const { proxy } = getCurrentInstance();

// 状态管理
const searchQuery = ref("");
const statusFilter = ref("");

// 模拟订单数据
const orders = ref([]);

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    //状态筛选
    if (statusFilter.value && order.status !== statusFilter.value) {
      return false;
    }
    //搜索过滤
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      return (
        order.orderNumber.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query)
      );
    }
    return true;
  });
});

// 获取订单数据的方法
const fetchOrders = async () => {
  try {
    const res = await api.getOrders();
    if (res.code === 200) {
      orders.value = res.data.list.map((order) => ({
        ...order,
        dishes: order.dishes || [],
      }));
    }
  } catch (error) {
    ElMessage.error("获取订单数据失败");
  }
};

// 在组件挂载时获取数据
onMounted(() => {
  fetchOrders();
});

// 获取对应状态的订单数量
const getTotalOrders = (status) => {
  if (status === "all") {
    return orders.value.length;
  }
  return orders.value.filter((order) => order.status === status).length;
};

// 获取状态标签类型
const getStatusTag = (status) => {
  const statusMap = {
    pending: "warning",
    accepted: "primary",
    completed: "success",
  };
  return statusMap[status];
};

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    pending: "待接单",
    accepted: "进行中",
    completed: "已完成",
  };
  return statusMap[status];
};

// 获取菜品预览文本
const getDishesPreview = (dishes, isTooltip = false) => {
  if (!dishes || !Array.isArray(dishes)) {
    return "暂无菜品信息";
  }
  const dishText = dishes
    .map((d) => `${d.name}(${d.quantity})`)
    .join(isTooltip ? "\n" : "、");
  return dishText || "暂无菜品信息";
};

// 处理接单
const handleAcceptOrder = (order) => {
  order.status = "accepted";
  ElMessage.success("已接单");
};

// 处理完成订单
const handleCompleteOrder = (order) => {
  order.status = "completed";
  ElMessage.success("订单已完成");
};
</script>

<style lang="less" scoped>
.order-management {
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
.order-row {
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
        display: flex;
        gap: 16px;

        .search-input {
          width: 240px;
        }
      }
    }

    .order-list {
      padding: 20px;
    }
  }
}
</style>