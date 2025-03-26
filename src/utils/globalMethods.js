import echarts from "echarts";
import { creationTime, toYMDHMSTime } from "@/utils/formattime";

export default {
  install(Vue) {
    Vue.prototype.$echarts = echarts;
    Vue.prototype.$creationTime = creationTime;
    Vue.prototype.$YMDHMS = toYMDHMSTime;
    Vue.prototype.$formatNumber = function (value) {
      if (!value) return "0";
      let num = Number(value); // 转换为数字
      if (isNaN(num)) return "0"; // 处理非数值输入
      return num % 1 === 0
        ? num.toLocaleString() // 整数：不保留小数
        : num.toLocaleString(undefined, { maximumFractionDigits: 2 }); // 小数：最多保留2位，不补0
    };
    Vue.prototype.$isPositive = function (v) {
      return Number(v) > 0;
    };
  },
};
