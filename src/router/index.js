import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
Vue.use(Router)

/* Layout */

import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  // {
  //   path: '/system',
  //   component: Layout,
  //   name: "system",
  //   meta: { title: 'systemmanage', icon: 'el-icon-s-tools' },
  //   children: [
  //     {
  //       path: 'authority',
  //       name: 'authority',
  //       component: () => import('@/views/systemmag/authority/index'),
  //       meta: { title: 'RightsManagement', icon: 'form' }
  //     },
  //     {
  //       path: 'role',
  //       name: 'role',
  //       component: () => import('@/views/systemmag/role/index'),
  //       meta: { title: 'rolemanage', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/account',
  //   component: Layout,
  //   name: "account",
  //   meta: { title: 'accountmanage', icon: 'el-icon-user-solid' },
  //   children: [
  //     {
  //       path: 'user',
  //       name: 'user',
  //       component: () => import('@/views/accountmag/usermag/index'),
  //       meta: { title: 'authoritymanage', icon: 'el-icon-s-custom' }
  //     },
  //     {
  //       path: 'membermag',
  //       name: 'membermag',
  //       component: () => import('@/views/accountmag/membermag/index'),
  //       meta: { title: 'membermanagement', icon: 'el-icon-star-on' }
  //     },
  //     {
  //       path: 'Memberrebates',
  //       name: 'memberrebates',
  //       component: () => import('@/views/accountmag/memberrebates/index'),
  //       meta: { title: 'memberrebates', icon: 'el-icon-thumb' }
  //     },
  //     {
  //       path: 'agent',
  //       name: 'agent',
  //       component: () => import('@/views/accountmag/agentmag/index'),
  //       meta: { title: 'agentmanagement', icon: 'el-icon-news' }
  //     },
  //     {
  //       path: 'wallet',
  //       name: 'wallet',
  //       component: () => import('@/views/accountmag/walletmag/index'),
  //       meta: { title: 'abnormalwallet', icon: 'el-icon-news' }
  //     },
  //   ]
  // },
  // {
  //   path: '/finance',
  //   component: Layout,
  //   name: "finance",
  //   meta: { title: 'financemanage', icon: 'el-icon-s-marketing' },
  //   children: [
  //     {
  //       path: 'memberrecharge',
  //       name: 'memberrecharge',
  //       component: () => import('@/views/financemag/memberrecharge/index'),
  //       meta: { title: 'memberrecharge', icon: 'el-icon-s-finance' }
  //     },
  //     {
  //       path: 'agentwithdrawal',
  //       name: 'agentwithdrawal',
  //       component: () => import('@/views/financemag/agentwithdrawal/index'),
  //       meta: { title: 'agentwithdrawal', icon: 'el-icon-s-cooperation' }
  //     },
  //     {
  //       path: 'memberwithdrawal',
  //       name: 'memberwithdrawal',
  //       component: () => import('@/views/financemag/memberwithdrawal/index'),
  //       meta: { title: 'memberwithdrawal', icon: 'el-icon-goods' }
  //     },
  //     {
  //       path: 'rechargechannel',
  //       name: 'rechargechannel',
  //       component: () => import('@/views/financemag/rechargechannel/index'),
  //       meta: { title: 'rechargechannel', icon: 'el-icon-box' }
  //     },
  //     {
  //       path: 'crechargeonfiguration',
  //       name: 'crechargeonfiguration',
  //       component: () => import('@/views/financemag/crechargeonfiguration/index'),
  //       meta: { title: 'crechargeonfiguration', icon: 'el-icon-setting' }
  //     },
  //     {
  //       path: 'withdrawalchannel',
  //       name: 'withdrawalchannel',
  //       component: () => import('@/views/financemag/withdrawalchannel/index'),
  //       meta: { title: 'withdrawalchannel', icon: 'el-icon-position' }
  //     },
  //     {
  //       path: 'WithdrawalBank',
  //       name: 'WithdrawalBank',
  //       component: () => import('@/views/financemag/WithdrawalBank/index'),
  //       meta: { title: 'WithdrawalBankManagement', icon: 'el-icon-s-operation' }
  //     }
  //   ]
  // },
  // {
  //   path: '/thirdpartypayment',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'thirdpartypayment',
  //       name: 'thirdpartypayment',
  //       component: () => import('@/views/thirdpartypayment/index'),
  //       meta: { title: 'thirdpartypayment', icon: 'el-icon-s-fold' }
  //     }
  //   ]
  // },
  // {
  //   path: '/reportformsmag',
  //   component: Layout,
  //   meta: { title: 'reportformsmag', icon: 'el-icon-s-marketing' },
  //   children: [
  //     {
  //       path: '/ReportformsmagAgent',
  //       name: 'reportformsmagagent',
  //       component: () => import('@/views/reportformsmag/Agent/index.vue'),
  //       meta: { title: 'Proxyreport', icon: 'el-icon-coordinate' }
  //     },
  //     {
  //       path: '/ReportformsmagGamer',
  //       name: 'reportformsmaggamer',
  //       component: () => import('@/views/reportformsmag/Gamer/index.vue'),
  //       meta: { title: 'GameMerchantReport', icon: 'el-icon-mouse' }
  //     },
  //     {
  //       path: '/ReportformsmagMember',
  //       name: 'reportformsmagmember',
  //       component: () => import('@/views/reportformsmag/Member/index.vue'),
  //       meta: { title: 'MemberReport', icon: 'el-icon-user' }
  //     },
  //     {
  //       path: '/ReportformsmagPlatform',
  //       name: 'reportformsmagplatform',
  //       component: () => import('@/views/reportformsmag/Platform/index.vue'),
  //       meta: { title: 'Platformreport', icon: 'el-icon-pie-chart' }
  //     }
  //   ]
  // },
  // {
  //   path: '/gamer',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'gamer',
  //       name: 'gamer',
  //       component: () => import('@/views/gamermag/index'),
  //       meta: { title: 'gamer', icon: 'el-icon-coordinate' }
  //     }
  //   ]
  // },
  // {
  //   path: '/game',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'game',
  //       name: 'game',
  //       component: () => import('@/views/gamemag/index'),
  //       meta: { title: 'game', icon: 'el-icon-mouse' }
  //     }
  //   ]
  // },
  // {
  //   path: '/messagemag',
  //   component: Layout,
  //   name: "messagemag",
  //   meta: { title: 'messagemag', icon: 'el-icon-chat-dot-square' },
  //   children: [
  //     {
  //       path: 'noticetypemag',
  //       name: 'noticetypemag',
  //       component: () => import('@/views/messagemag/noticetypemag/index'),
  //       meta: { title: 'AnnouncementType', icon: 'el-icon-c-scale-to-original' }
  //     },
  //     {
  //       path: 'noticemag',
  //       name: 'noticemag',
  //       component: () => import('@/views/messagemag/noticemag/index'),
  //       meta: { title: 'Noticemanage', icon: 'el-icon-s-promotion' }
  //     },
  //     {
  //       path: 'membermsg',
  //       name: 'membermsg',
  //       component: () => import('@/views/messagemag/membermsg/index'),
  //       meta: { title: 'Membermessages', icon: 'el-icon-message-solid' }
  //     },
  //     {
  //       path: 'advertising',
  //       name: 'advertising',
  //       component: () => import('@/views/messagemag/advertising/index'),
  //       meta: { title: 'Advertising', icon: 'el-icon-video-camera-solid' }
  //     },
  //     {
  //       path: 'activity',
  //       name: 'activity',
  //       component: () => import('@/views/messagemag/activity/index'),
  //       meta: { title: 'Activity', icon: 'el-icon-s-flag' }
  //     },
  //     {
  //       path: 'customerservice',
  //       name: 'customerservice',
  //       component: () => import('@/views/messagemag/customerservice/index'),
  //       meta: { title: 'Customerservice', icon: 'el-icon-s-flag' }
  //     }
  //   ]
  // },
  // {
  //   path: '/Currency',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'Currency',
  //       name: 'Currency',
  //       component: () => import('@/views/Currency/index'),
  //       meta: { title: 'Currencymanagement', icon: 'el-icon-bank-card' }
  //     }
  //   ]
  // },
  // {
  //   path: '/IP',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'IP',
  //       name: 'IP',
  //       component: () => import('@/views/IP/index'),
  //       meta: { title: 'IPManagement', icon: 'el-icon-place' }
  //     }
  //   ]
  // },
  // {
  //   path: '/My',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'My',
  //       name: 'My',
  //       component: () => import('@/views/My/index'),
  //       meta: { title: 'My', icon: 'el-icon-s-custom' }
  //     }
  //   ]
  // }
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]
export const asyncRoutes = [
  {
    path: '/system',
    component: Layout,
    name: "system",
    meta: { title: 'systemmanage', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'authority',
        name: 'authority',
        component: () => import('@/views/systemmag/authority/index'),
        meta: { title: 'RightsManagement', icon: 'form' }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/systemmag/role/index'),
        meta: { title: 'rolemanage', icon: 'form' }
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    name: "account",
    meta: { title: 'accountmanage', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/accountmag/usermag/index'),
        meta: { title: 'authoritymanage', icon: 'el-icon-s-custom' }
      },
      {
        path: 'membermag',
        name: 'membermag',
        component: () => import('@/views/accountmag/membermag/index'),
        meta: { title: 'membermanagement', icon: 'el-icon-star-on' }
      },
      {
        path: 'Memberrebates',
        name: 'memberrebates',
        component: () => import('@/views/accountmag/memberrebates/index'),
        meta: { title: 'memberrebates', icon: 'el-icon-thumb' }
      },
      {
        path: 'agent',
        name: 'agent',
        component: () => import('@/views/accountmag/agentmag/index'),
        meta: { title: 'agentmanagement', icon: 'el-icon-news' }
      },
      {
        path: 'wallet',
        name: 'wallet',
        component: () => import('@/views/accountmag/walletmag/index'),
        meta: { title: 'abnormalwallet', icon: 'el-icon-news' }
      },
    ]
  },
  {
    path: '/finance',
    component: Layout,
    name: "finance",
    meta: { title: 'financemanage', icon: 'el-icon-s-marketing' },
    children: [
      {
        path: 'memberrecharge',
        name: 'memberrecharge',
        component: () => import('@/views/financemag/memberrecharge/index'),
        meta: { title: 'memberrecharge', icon: 'el-icon-s-finance' }
      },
      {
        path: 'agentwithdrawal',
        name: 'agentwithdrawal',
        component: () => import('@/views/financemag/agentwithdrawal/index'),
        meta: { title: 'agentwithdrawal', icon: 'el-icon-s-cooperation' }
      },
      {
        path: 'memberwithdrawal',
        name: 'memberwithdrawal',
        component: () => import('@/views/financemag/memberwithdrawal/index'),
        meta: { title: 'memberwithdrawal', icon: 'el-icon-goods' }
      },
      {
        path: 'rechargechannel',
        name: 'rechargechannel',
        component: () => import('@/views/financemag/rechargechannel/index'),
        meta: { title: 'rechargechannel', icon: 'el-icon-box' }
      },
      {
        path: 'crechargeonfiguration',
        name: 'crechargeonfiguration',
        component: () => import('@/views/financemag/crechargeonfiguration/index'),
        meta: { title: 'crechargeonfiguration', icon: 'el-icon-setting' }
      },
      {
        path: 'withdrawalchannel',
        name: 'withdrawalchannel',
        component: () => import('@/views/financemag/withdrawalchannel/index'),
        meta: { title: 'withdrawalchannel', icon: 'el-icon-position' }
      },
      {
        path: 'WithdrawalBank',
        name: 'WithdrawalBank',
        component: () => import('@/views/financemag/WithdrawalBank/index'),
        meta: { title: 'WithdrawalBankManagement', icon: 'el-icon-s-operation' }
      }
    ]
  },
  {
    path: '/thirdpartypayment',
    component: Layout,
    children: [
      {
        path: 'thirdpartypayment',
        name: 'thirdpartypayment',
        component: () => import('@/views/thirdpartypayment/index'),
        meta: { title: 'thirdpartypayment', icon: 'el-icon-s-fold' }
      }
    ]
  },
  {
    path: '/reportformsmag',
    component: Layout,
    meta: { title: 'reportformsmag', icon: 'el-icon-s-marketing' },
    children: [
      {
        path: '/ReportformsmagAgent',
        name: 'reportformsmagagent',
        component: () => import('@/views/reportformsmag/Agent/index.vue'),
        meta: { title: 'Proxyreport', icon: 'el-icon-coordinate' }
      },
      {
        path: '/ReportformsmagGamer',
        name: 'reportformsmaggamer',
        component: () => import('@/views/reportformsmag/Gamer/index.vue'),
        meta: { title: 'GameMerchantReport', icon: 'el-icon-mouse' }
      },
      {
        path: '/ReportformsmagMember',
        name: 'reportformsmagmember',
        component: () => import('@/views/reportformsmag/Member/index.vue'),
        meta: { title: 'MemberReport', icon: 'el-icon-user' }
      },
      {
        path: '/ReportformsmagPlatform',
        name: 'reportformsmagplatform',
        component: () => import('@/views/reportformsmag/Platform/index.vue'),
        meta: { title: 'Platformreport', icon: 'el-icon-pie-chart' }
      }
    ]
  },
  {
    path: '/gamer',
    component: Layout,
    children: [
      {
        path: 'gamer',
        name: 'gamer',
        component: () => import('@/views/gamermag/index'),
        meta: { title: 'gamer', icon: 'el-icon-coordinate' }
      }
    ]
  },
  {
    path: '/game',
    component: Layout,
    children: [
      {
        path: 'game',
        name: 'game',
        component: () => import('@/views/gamemag/index'),
        meta: { title: 'game', icon: 'el-icon-mouse' }
      }
    ]
  },
  {
    path: '/messagemag',
    component: Layout,
    name: "messagemag",
    meta: { title: 'messagemag', icon: 'el-icon-chat-dot-square' },
    children: [
      {
        path: 'noticetypemag',
        name: 'noticetypemag',
        component: () => import('@/views/messagemag/noticetypemag/index'),
        meta: { title: 'AnnouncementType', icon: 'el-icon-c-scale-to-original' }
      },
      {
        path: 'noticemag',
        name: 'noticemag',
        component: () => import('@/views/messagemag/noticemag/index'),
        meta: { title: 'Noticemanage', icon: 'el-icon-s-promotion' }
      },
      {
        path: 'membermsg',
        name: 'membermsg',
        component: () => import('@/views/messagemag/membermsg/index'),
        meta: { title: 'Membermessages', icon: 'el-icon-message-solid' }
      },
      {
        path: 'advertising',
        name: 'advertising',
        component: () => import('@/views/messagemag/advertising/index'),
        meta: { title: 'Advertising', icon: 'el-icon-video-camera-solid' }
      },
      {
        path: 'activity',
        name: 'activity',
        component: () => import('@/views/messagemag/activity/index'),
        meta: { title: 'Activity', icon: 'el-icon-s-flag' }
      },
      {
        path: 'customerservice',
        name: 'customerservice',
        component: () => import('@/views/messagemag/customerservice/index'),
        meta: { title: 'Customerservice', icon: 'el-icon-s-flag' }
      }
    ]
  },
  {
    path: '/Currency',
    component: Layout,
    children: [
      {
        path: 'Currency',
        name: 'Currency',
        component: () => import('@/views/Currency/index'),
        meta: { title: 'Currencymanagement', icon: 'el-icon-bank-card' }
      }
    ]
  },
  {
    path: '/IP',
    component: Layout,
    children: [
      {
        path: 'IP',
        name: 'IP',
        component: () => import('@/views/IP/index'),
        meta: { title: 'IPManagement', icon: 'el-icon-place' }
      }
    ]
  },
  {
    path: '/My',
    component: Layout,
    children: [
      {
        path: 'My',
        name: 'My',
        component: () => import('@/views/My/index'),
        meta: { title: 'My', icon: 'el-icon-s-custom' }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    meta: { title: 'test', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'test',
        name: 'test',
        component: () => import('@/views/t_mode/index'),
        meta: { title: 'test', icon: 'form' }
      },
      {
        path: 'test2',
        name: 'test2',
        component: () => import('@/views/t_mode/index'),
        meta: { title: 'test2', icon: 'form' }
      }
    ]
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 重置路由列表
export function resetRouter() {
  console.log('resetRouter');
  store.commit('permission/RESET_STATE')
  const newRouter = createRouter()
  // 侧边栏刷新
  router.options.routes = constantRoutes
  router.matcher = new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  }).matcher
}
// 添加路由列表
export function newRouter(Rou) {

  if (Object.values(router.options.routes).length > Object.values(constantRoutes).length) {
    return
  }
  const newRoutes = constantRoutes.concat(Rou)
  // 侧边栏刷新
  router.options.routes = newRoutes
  // 更新路由配置
  router.matcher = new Router({
    // mode: 'history', // 或 'hash'
    base: process.env.BASE_URL,
    routes: newRoutes
  }).matcher
}
function hasPermission(nameList, route) {
  return nameList.findIndex(item => {
    return (item.path === route.path) || (item.name === route.name)
  })
}
//扁平化获取name方法
export function flatten(nameList = [], data, btnP = []) {
  data.forEach(v => {
    if (v.children && v.children.length > 0) {
      // 是否是按钮权限页
      let isbtnP = v.children[0].code.match(/:(.*)$/)
      nameList.push({ name: v.code, path: v.menuUrl })
      if (isbtnP == null) {
        flatten(nameList, v.children,btnP)
      } else {
        v.children.forEach(item => {
          btnP.push(item.code)
        })
      }
    } else {
      nameList.push({ name: v.code, path: v.menuUrl })
    }
  })
  return nameList
}
/**
* @param routes asyncRoutes
*/
export function filterAsyncRoutes(routes, roles, nameList) {
  let res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(nameList, tmp) >= 0) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles, nameList)
      }
      res.push(tmp)
    }
  })
  return res
}
export default router
