import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import {
  getToken,
  getTokenPrefix,
  getTokenHeader,
  getLange,
  removeToken,
} from "@/utils/auth";
import router, { resetRouter } from "@/router/index";

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: '/',
  timeout: 60000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    if (getToken()) {
      // 设置请求头
      config.headers[getTokenHeader()] = getTokenPrefix() + getToken();
      config.headers["language"] = getLange();
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    if (res.resCode !== "000000") {
      Message({
        message: res.resDesc || "Error",
        type: "error",
        duration: 5 * 1000,
      });
      if (res.resCode === "000104") {
        // token验证失效，后端回传未登录
        removeToken();
        resetRouter();
        router.push("/login");
        // useRouter().push('/login')
      }
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm(
          "You have been logged out, you can cancel to stay on this page, or log in again",
          "Confirm logout",
          {
            confirmButtonText: "Re-Login",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        ).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
