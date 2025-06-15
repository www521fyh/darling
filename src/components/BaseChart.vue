<template>
  <div ref="chartDom" class="chart-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
  theme: {
    type: String,
    default: "light",
  },
});

const chartDom = ref(null);
let chartInstance = null;

// 初始化图表
const initChart = () => {
  if (!chartDom.value) return;
  chartInstance = echarts.init(chartDom.value, props.theme);
  chartInstance.setOption(props.options);
};

// 响应式更新
watch(
  () => props.options,
  (newVal) => {
    chartInstance?.setOption(newVal);
  },
  { deep: true }
);

onMounted(() => {
  initChart();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  chartInstance?.dispose();
});

const handleResize = () => {
  chartInstance?.resize();
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px; /* 建议通过props动态设置 */
}
</style>