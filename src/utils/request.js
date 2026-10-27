import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import { domain } from "@/utils/domain";
const currentDomain = document.domain;
console.log("🚀 ~ currentDomain:", currentDomain);
const selectedBaseURL = domain[currentDomain] || process.env.VUE_APP_BASE_API;
import {
  getToken,
  getTokenPrefix,
  getTokenHeader,
  getLange,
} from "@/utils/auth";
import router from "@/router/index";
import { isLoginRequest, isSessionExpiredResponse } from "@/utils/session-expiry";

const requestTokens = new WeakMap();
let redirectingToLogin = false;

function expireSession(config) {
  if (!config || isLoginRequest(config.url)) return;
  // Responses from a replaced session cannot clear a newly signed-in user's token.
  if (requestTokens.has(config) && requestTokens.get(config) !== getToken()) return;
  if (redirectingToLogin || !getToken()) return;
  redirectingToLogin = true;
  const route = router.currentRoute;
  const target = { path: "/login" };
  if (route.path !== "/login") target.query = { redirect: route.fullPath };
  store.dispatch("user/resetToken");
  Message({ message: "登录状态已失效，请重新登录", type: "warning", duration: 5000 });
  const done = () => { redirectingToLogin = false; };
  if (route.path === "/login") done();
  else router.replace(target, done, done);
}

// create an axios instance
const service = axios.create({
  baseURL: selectedBaseURL,
  // baseURL: '/',
  timeout: 60000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    const token = getToken();
    requestTokens.set(config, token);
    if (token && !isLoginRequest(config.url)) {
      // 设置请求头
      const header = getTokenHeader() || "Authorization";
      const prefix = getTokenPrefix() || "";
      // Preserve custom prefixes such as Bearer_; normalize the standard Bearer separator.
      config.headers[header] = prefix.trim().toLowerCase() === "bearer"
        ? prefix.trim() + " " + token : prefix + token;
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

    if (isSessionExpiredResponse(res, response.config.url, response.status)) {
      expireSession(response.config);
      return Promise.reject(new Error("登录状态已失效，请重新登录"));
    }

    // if the custom code is not 20000, it is judged as an error.
    if (res.resCode !== "000000") {
      Message({
        message: res.resDesc || "Error",
        type: "error",
        duration: 5 * 1000,
      });
      return Promise.reject(new Error(res.resDesc || res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    if (isSessionExpiredResponse(error.response && error.response.data,
      error.config && error.config.url, error.response && error.response.status)) {
      expireSession(error.config);
      return Promise.reject(new Error("登录状态已失效，请重新登录"));
    }
    Message({
      message: (error.response && error.response.data && error.response.data.resDesc) || error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
