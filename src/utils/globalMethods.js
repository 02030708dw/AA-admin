import echarts from "echarts";
import { creationTime, toYMDHMSTime } from "@/utils/formattime";

export default {
  install(Vue) {
    Vue.prototype.$echarts = echarts;
    Vue.prototype.$creationTime = creationTime;
    Vue.prototype.$YMDHMS = toYMDHMSTime;
    Vue.prototype.$formatNumber = function (value) {
      if (!value) return "0";
      return parseInt(value, 10).toLocaleString();
    };
    Vue.prototype.$isPositive = function (v) {
      return Number(v) > 0;
    };
  },
};
