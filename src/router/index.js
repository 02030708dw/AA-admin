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
export const asyncRoutes = [
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: 'Dashboard', icon: 'dashboard' }
  //   }]
  // },
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
      },
      {
        path: 'config',
        name: 'config',
        component: () => import('@/views/systemmag/sysconfig/index'),
        meta: { title: 'config', icon: 'form' }
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
      // {
      //   path: 'Memberrebates',
      //   name: 'memberrebates',
      //   component: () => import('@/views/accountmag/memberrebates/index'),
      //   meta: { title: 'memberrebates', icon: 'el-icon-thumb' }
      // },
      {
        path: 'wallet',
        name: 'wallet',
        component: () => import('@/views/accountmag/walletmag/index'),
        meta: { title: 'abnormalwallet', icon: 'el-icon-news' }
      },
    ]
  },

  {
    path: '/agent',
    name: 'agent',
    component: Layout,
    meta: { title: 'agentmanagement', icon: 'el-icon-news' },
    children: [
      {
        path: 'agentapplication',
        name: 'agentapplication',
        component: () => import('@/views/agentmag/agentapplication/index'),
        meta: { title: 'agentapplication', icon: 'el-icon-news' }
      },
      {
        path: 'agent',
        name: 'agent',
        component: () => import('@/views/accountmag/agentmag/index'),
        meta: { title: 'agentmanagement', icon: 'el-icon-news' },
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/agentmag/agentvideo/index'),
        meta: { title: 'agentvideo', icon: 'el-icon-news' }
      },
      {
        path: 'agentrebatesetting',
        name: 'agentrebatesetting',
        component: () => import('@/views/agentmag/agentrebatesetting/index'),
        meta: { title: 'agentrebatesetting', icon: 'el-icon-news' }
      },
      {
        path: 'agentrebaterecord',
        name: 'agentrebaterecord',
        component: () => import('@/views/agentmag/agentrebaterecord/index'),
        meta: { title: 'agentrebaterecord', icon: 'el-icon-news' }
      },
      {
        path: 'livePromotionBenefitRecord',
        name: 'livePromotionBenefitRecord',
        component: () => import('@/views/agentmag/livePromotion/index'),
        meta: { title: 'LivePromotionBonusRecord', icon: 'el-icon-news' }
      },
      {
        path: 'websitepromotion',
        name: 'websitepromotion',
        component: () => import('@/views/agentmag/websitePromotion/index'),
        meta: { title: 'websitePromotion', icon: 'el-icon-news' }
      },
      {
        path: 'groupsendmould',
        name: 'groupsendmould',
        component: () => import('@/views/agentmag/groupsendmould/index'),
        meta: { title: 'groupsendmould', icon: 'el-icon-news' }
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
      },
      {
        path: 'agentwithdrawal',
        name: 'agentwithdrawal',
        component: () => import('@/views/financemag/agentwithdrawal/index'),
        meta: { title: 'agentwithdrawal', icon: 'el-icon-s-cooperation' }
      },
      {//会员提现配置管理
        path: 'financemembercashmanage',
        name: 'financemembercashmanage',
        component: () => import('@/views/financemag/membercashmanage/index'),
        meta: { title: 'membercashmanage', icon: 'el-icon-s-cooperation' }
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
        path: '/Reportagentdetailform',
        name: 'reportagentdetailform',
        component: () => import('@/views/reportformsmag/AgentDetail/index.vue'),
        meta: { title: 'AgentDetail', icon: 'el-icon-pie-chart' }
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
      },
      {
        path: '/Reportmemberbetform',
        name: 'reportmemberbetform',
        component: () => import('@/views/reportformsmag/Memberbet/index.vue'),
        meta: { title: 'MemberBets', icon: 'el-icon-pie-chart' }
      },
      {
        path: '/Reportincomecash',
        name: 'reportincomecash',
        component: () => import('@/views/reportformsmag/reportincomecash/index.vue'),
        meta: { title: 'reportincomecash', icon: 'el-icon-pie-chart' }
      },
      {
        path: '/livestreamingreport',
        name: 'livestreamingreport',
        component: () => import('@/views/reportformsmag/livestreamingreport/index.vue'),
        meta: { title: 'livestreamingreport', icon: 'el-icon-pie-chart' }
      },
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
    path: '/maintenance',
    component: Layout,
    children: [
      {
        path: 'maintenance',
        name: 'maintenance',
        component: () => import('@/views/maintenance/index'),
        meta: { title: 'Maintenance', icon: 'el-icon-place' }
      }
    ]
  },
  {
    path: '/games',
    meta: { title: 'games', icon: 'el-icon-mouse' },
    component: Layout,
    children: [
      {
        path: 'game',
        name: 'game',
        component: () => import('@/views/games/game/index'),
        meta: { title: 'game', icon: 'el-icon-mouse' }
      },
      {
        path: 'demogame',
        name: 'demogame',
        component: () => import('@/views/games/demogame/index'),
        meta: { title: 'demogame', icon: 'el-icon-mouse' }
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
      // {
      //   path: 'activity',
      //   name: 'activity',
      //   component: () => import('@/views/messagemag/activity/index'),
      //   meta: { title: 'Activity', icon: 'el-icon-s-flag' }
      // },
      {
        path: 'customerservice',
        name: 'customerservice',
        component: () => import('@/views/messagemag/customerservice/index'),
        meta: { title: 'Customerservice', icon: 'el-icon-s-flag' }
      }
    ]
  },
  {
    path: '/activity',
    component: Layout,
    name: "activity",
    meta: { title: 'Activity', icon: 'el-icon-s-flag' },
    children: [
      {//活动信息
        path: 'activityInfo',
        name: 'activityInfo',
        component: () => import('@/views/activity/activityInfo/index'),
        meta: { title: 'activityInfo', icon: 'el-icon-s-flag' }
      },
      {//转盘配置管理
        path: 'spinconfig',
        name: 'spinconfig',
        component: () => import('@/views/activity/spinconfig/index'),
        meta: { title: 'spinconfig', icon: 'el-icon-s-flag' }
      },
      {//用户转盘信息配置管理
        path: 'spinmemberconfig',
        name: 'spinmemberconfig',
        component: () => import('@/views/activity/spinmemberconfig/index'),
        meta: { title: 'spinmemberconfig', icon: 'el-icon-s-flag' }
      },
      {//用户转盘记录表
        path: 'spinmemberrecord',
        name: 'spinmemberrecord',
        component: () => import('@/views/activity/spinmemberrecord/index'),
        meta: { title: 'spinmemberrecord', icon: 'el-icon-s-flag' }
      },
      {//vip配置
        path: 'vipconfig',
        name: 'vipconfig',
        component: () => import('@/views/activity/vipconfig/index'),
        meta: { title: 'vipconfig', icon: 'el-icon-s-flag' }
      },
      {//vip反水配置
        path: 'viprebateconfig',
        name: 'viprebateconfig',
        component: () => import('@/views/activity/viprebateconfig/index'),
        meta: { title: 'viprebateconfig', icon: 'el-icon-s-flag' }
      },
      {//vip奖励明细
        path: 'vipreward',
        name: 'vipreward',
        component: () => import('@/views/activity/vipreward/index'),
        meta: { title: 'vipreward', icon: 'el-icon-s-flag' }
      },
      {//vip奖励领取记录
        path: 'viprewardrecord',
        name: 'viprewardrecord',
        component: () => import('@/views/activity/viprewardrecord/index'),
        meta: { title: 'viprewardrecord', icon: 'el-icon-s-flag' }
      },
      {//充值红包配置
        path: 'incomebonusconfig',
        name: 'incomebonusconfig',
        component: () => import('@/views/activity/incomebonusconfig/index'),
        meta: { title: 'incomebonusconfig', icon: 'el-icon-s-flag' }
      },
      {//用户红包记录
        path: 'incomebonusrecord',
        name: 'incomebonusrecord',
        component: () => import('@/views/activity/incomebonusrecord/index'),
        meta: { title: 'incomebonusrecord', icon: 'el-icon-s-flag' }
      },
      {//奖励配置
        path: 'rewardconfig',
        name: 'rewardconfig',
        component: () => import('@/views/activity/rewardconfig/index'),
        meta: { title: 'rewardconfig', icon: 'el-icon-s-flag' }
      },
      {//奖励配置
        path: 'rewardrecord',
        name: 'rewardrecord',
        component: () => import('@/views/activity/rewardrecord/index'),
        meta: { title: 'rewardrecord', icon: 'el-icon-s-flag' }
      },
      {//刮刮乐配置
        path: "/scratchconfig",
        name: "scratchconfig",
        component: () => import('@/views/activity/scratchconfig/index'),
        meta: { title: 'scratchconfig', icon: 'el-icon-s-flag' }
      },
      {//刮刮乐用户信息表
        path: "/scratchmember",
        name: "scratchmember",
        component: () => import('@/views/activity/scratchmember/index'),
        meta: { title: 'scratchmember', icon: 'el-icon-s-flag' }
      },
      {//用户刮刮卡记录
        path: "/scratchmemberrecord",
        name: "scratchmemberrecord",
        component: () => import('@/views/activity/scratchmemberrecord/index'),
        meta: { title: 'scratchmemberrecord', icon: 'el-icon-s-flag' }
      },
      {//刮刮乐奖金配置
        path: "/scratchprizeconfig",
        name: "scratchprizeconfig",
        component: () => import('@/views/activity/scratchprizeconfig/index'),
        meta: { title: 'scratchprizeconfig', icon: 'el-icon-s-flag' }
      },
      {//刮刮乐权重分组
        path: "/scratchweightgroup",
        name: "scratchweightgroup",
        component: () => import('@/views/activity/scratchweightgroup/index'),
        meta: { title: 'scratchweightgroup', icon: 'el-icon-s-flag' }
      },
      {//代金券配置
        path: "/voucherconfig",
        name: "voucherconfig",
        component: () => import('@/views/activity/voucherconfig/index'),
        meta: { title: 'voucherconfig', icon: 'el-icon-s-flag' }
      },
      {//用户代金券
        path: "/vouchermember",
        name: "vouchermember",
        component: () => import('@/views/activity/vouchermember/index'),
        meta: { title: 'vouchermember', icon: 'el-icon-s-flag' }
      },
      {//红包配置
        path: "/redpacketconfig",
        name: "redpacketconfig",
        component: () => import('@/views/activity/redpacketconfig/index'),
        meta: { title: 'redpacketconfig', icon: 'el-icon-s-flag' }
      },
      {//红包创建信息
        path: "/redpacketcreate",
        name: "redpacketcreate",
        component: () => import('@/views/activity/redpacketcreate/index'),
        meta: { title: 'redpacketcreate', icon: 'el-icon-s-flag' }
      },
      {//用户红包账户
        path: "/redpacketmember",
        name: "redpacketmember",
        component: () => import('@/views/activity/redpacketmember/index'),
        meta: { title: 'redpacketmember', icon: 'el-icon-s-flag' }
      },
      {//红包领取记录
        path: "/redpacketrecord",
        name: "redpacketrecord",
        component: () => import('@/views/activity/redpacketrecord/index'),
        meta: { title: 'redpacketrecord', icon: 'el-icon-s-flag' }
      },
      {//GW彩票配置表
        path: "/gwticketconfig",
        name: "gwticketconfig",
        component: () => import('@/views/activity/gwticketconfig/index'),
        meta: { title: 'gwticketconfig', icon: 'el-icon-s-flag' }
      },
      {//GW用户彩票信息表
        path: "/gwticketmember",
        name: "gwticketmember",
        component: () => import('@/views/activity/gwticketmember/index'),
        meta: { title: 'gwticketmember', icon: 'el-icon-s-flag' }
      },
      {//GW红包领取记录表
        path: "/gwticketrecord",
        name: "gwticketrecord",
        component: () => import('@/views/activity/gwticketrecord/index'),
        meta: { title: 'gwticketrecord', icon: 'el-icon-s-flag' }
      },
      // 宾果配置
      {
        path: "/bingoconfig",
        name: "bingoconfig",
        component: () => import('@/views/activity/bingoconfig/index'),
        meta: { title: 'bingoconfig', icon: 'el-icon-s-flag' }
      },
      // 宾果奖金配置
      {
        path: "/bingoprizeconfig",
        name: "bingoprizeconfig",
        component: () => import('@/views/activity/bingoprizeconfig/index'),
        meta: { title: 'bingoprizeconfig', icon: 'el-icon-s-flag' }
      },
      // 宾果权重分组
      {
        path: "/bingoweight",
        name: "bingoweight",
        component: () => import('@/views/activity/bingoweight/index'),
        meta: { title: 'bingoweight', icon: 'el-icon-s-flag' }
      },
      // 用户宾果信息
      {
        path: "/bingomember",
        name: "bingomember",
        component: () => import('@/views/activity/bingomember/index'),
        meta: { title: 'bingomember', icon: 'el-icon-s-flag' }
      },
      // 用户宾果记录
      {
        path: "/bingomemberrecord",
        name: "bingomemberrecord",
        component: () => import('@/views/activity/bingomemberrecord/index'),
        meta: { title: 'bingomemberrecord', icon: 'el-icon-s-flag' }
      },
      // 用户转盘链接信息配置
      {
        path: "/spinlinkconfig",
        name: "spinlinkconfig",
        component: () => import('@/views/activity/spinlinkconfig/index'),
        meta: { title: 'spinlinkconfig', icon: 'el-icon-s-flag' }
      },
      // 转盘链接用户
      {
        path: "/spinlink",
        name: "spinlink",
        component: () => import('@/views/activity/spinlink/index'),
        meta: { title: 'spinlink', icon: 'el-icon-s-flag' }
      },
      // 用户代金券链接配置
      {
        path: "/voucherlinkconfig",
        name: "voucherlinkconfig",
        component: () => import('@/views/activity/voucherlinkconfig/index'),
        meta: { title: 'voucherlinkconfig', icon: 'el-icon-s-flag' }
      },
      // 代金券链接用户
      {
        path: "/voucherlink",
        name: "voucherlink",
        component: () => import('@/views/activity/voucherlink/index'),
        meta: { title: 'voucherlink', icon: 'el-icon-s-flag' }
      },
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
    path: '/bonusgroup',
    component: Layout,
    meta: { title: 'bonusgroup', icon: 'el-icon-s-flag' },
    children: [
      {//代理奖金组方案
        path: 'agentbonusgroup',
        name: 'agentbonusgroup',
        component: () => import('@/views/bonusgroup/agentbonusgroup/index'),
        meta: { title: 'agentbonusgroup', icon: 'el-icon-s-flag' }
      },
      {//系统奖金组
        path: 'sysbonusgroup',
        name: 'sysbonusgroup',
        component: () => import('@/views/bonusgroup/sysbonusgroup/index'),
        meta: { title: 'sysbonusgroup', icon: 'el-icon-s-flag' }
      },
      {//代理平台游戏信息
        path: 'gwgameinfo',
        name: 'gwgameinfo',
        component: () => import('@/views/bonusgroup/gwgameinfo/index'),
        meta: { title: 'gwgameinfo', icon: 'el-icon-s-flag' }
      },
      {//代理奖金组奖金设定
        path: 'agentGameInfo',
        name: 'agentGameInfo',
        component: () => import('@/views/bonusgroup/agentGameInfo/index'),
        meta: { title: 'agentGameInfo', icon: 'el-icon-s-flag' }
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
  },
  // {
  //   path: '/rule',
  //   component: Layout,
  //   name: "rule",
  //   meta: { title: 'Rule', icon: 'el-icon-s-tools' },
  //   children: [
  //     {
  //       path: 'ruleBusiness ',
  //       name: 'ruleBusiness',
  //       component: () => import('@/views/rule/business/index'),
  //       meta: { title: 'RuleBussines', icon: 'form' }
  //     },
  //     {
  //       path: 'ruleCondition',
  //       name: 'ruleCondition',
  //       component: () => import('@/views/rule/condition/index'),
  //       meta: { title: 'RuleCondition', icon: 'form' }
  //     }
  //   ]
  // },
]
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
  //   path: '/rule',
  //   component: Layout,
  //   name: "rule",
  //   meta: { title: 'Rule', icon: 'el-icon-s-tools' },
  //   children: [
  //     {
  //       path: 'ruleBusiness ',
  //       name: 'ruleBusiness',
  //       component: () => import('@/views/rule/business/index'),
  //       meta: { title: 'RuleBussines', icon: 'form' }
  //     },
  //     {
  //       path: 'ruleCondition',
  //       name: 'ruleCondition',
  //       component: () => import('@/views/rule/condition/index'),
  //       meta: { title: 'RuleCondition', icon: 'form' }
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]


const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  // mode: 'history', 
  routes: constantRoutes,
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
      flatten(nameList, v.children, btnP)
      nameList.push({ name: v.menuCode, path: v.menuUrl })
      if (v.menuCode.match(/:(.*)$/)) { //按钮权限页有children的情况, [会员详情]
        btnP.push(v.menuCode)
      }
    } else if (v.menuCode && v.menuCode.match(/:(.*)$/)) {     // 是否是按钮权限页
      btnP.push(v.menuCode)
    } else {
      nameList.push({ name: v.menuCode, path: v.menuUrl })
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
