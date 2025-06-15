<template>
  <div class="dashboard-container">
    <div class="content-wrapper">
      <el-row :gutter="20">
        <el-col :span="6"
          ><el-card shadow="hover" class="data-card">
            <div class="card-header">
              <el-icon class="icon"><Document /></el-icon> <span>今日订单</span>
            </div>
            <div class="card-body">
              <span class="number">128</span>
              <span class="unit">单</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6"
          ><el-card shadow="hover" class="data-card">
            <div class="card-header">
              <el-icon class="icon"><Money /></el-icon> <span>今日营业额</span>
            </div>
            <div class="card-body">
              <span class="number">￥12580</span>
              <span class="unit">元</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6"
          ><el-card shadow="hover" class="data-card">
            <div class="card-header">
              <el-icon class="icon"><User /></el-icon> <span>新增用户</span>
            </div>
            <div class="card-body">
              <span class="number">32</span>
              <span class="unit">人</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6"
          ><el-card shadow="hover" class="data-card">
            <div class="card-header">
              <el-icon class="icon"><Food /></el-icon> <span>菜品总数</span>
            </div>
            <div class="card-body">
              <span class="number">156</span>
              <span class="unit">个</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="20" class="chart-row">
      <el-col :span="24">
        <el-card shadow="hover">
          <div class="header">
            <span>数据统计</span>
          </div>
          <div class="chart-container">
            <BaseChart :options="chartOptions" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import BaseChart from "@/components/BaseChart.vue";
import store from "@/store";

const chartOptions = ref({
  title: {
    text: "近一周销售趋势",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["线上", "线下"],
  },
  xAxis: {
    type: "category",
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "线上",
      type: "line",
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "线下",
      type: "line",
      data: [220, 182, 191, 234, 290, 330, 310],
    },
  ],
});

// 模拟动态更新数据
setInterval(() => {
  chartOptions.value.series.forEach((series) => {
    series.data = series.data.map(
      (v) => v + Math.round(Math.random() * 20 - 10)
    );
  });
}, 3000);

// 使用 computed 来响应式获取菜单数据
const asyncList = computed(() => store.state.menu);
</script>

<style lang="less" scoped>
.dashboard-container {
  min-height: calc(100vh - 60px); // 减去头部高度
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
.chart-row {
  margin-bottom: 20px !important; // 使用 !important 确保样式生效
}
.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  el-icon {
    margin-right: 8px;
    font-size: 40px;
  }

  span {
    font-size: 16px;
    font-weight: 500;
    color: #e6a23c;
  }
}
.card-body {
  display: flex;
  align-items: baseline;
  .number {
    font-size: 28px;
    font-weight: bold;
    color: #303133;
    line-height: 1;
  }
  .unit {
    margin-left: 8px;
    font-size: 14px;
    color: #909399;
  }
}
.chart-row {
  margin-top: 20px;

  .el-card {
    // 图表卡片样式
    .header {
      padding: 16px 20px;
      border-bottom: 1px solid #ebeef5;

      span {
        font-size: 16px;
        font-weight: 500;
        color: #303133;
      }
    }

    // 图表容器
    .chart-container {
      padding: 20px;
      height: 400px;
    }
  }
}

//  响应式布局
@media screen and (max-width: 1200px) {
  .el-col {
    margin-bottom: 20px;
  }

  .data-card {
    .card-body {
      .number {
        font-size: 24px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .data-card {
    .card-header {
      span {
        font-size: 14px;
      }
    }

    .card-body {
      .number {
        font-size: 20px;
      }

      .unit {
        font-size: 12px;
      }
    }
  }

  .chart-row {
    .chart-container {
      height: 300px;
    }
  }
}
</style>