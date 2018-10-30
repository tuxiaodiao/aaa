import Main from '@/view/main'
import parentView from '@/components/parent-view'

/**
 * meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export default [
  {
    path: '/data-search',
    name: 'data-search',
    meta: {
      icon: 'ios-pulse-strong',
      title: '数据查询',
      access: ['admin'],
      sites: ['S001']
    },
    component: Main,
    children: [{
      path: 'real-time-search',
      name: 'real-time-search',
      meta: {
        title: '详情数据'
      },
      component: () =>
          import('@/view/data-search/real-time-search.vue')
    },
    {
      path: 'history-search',
      name: 'history-search',
      meta: {
        title: '历史数据'
      },
      component: () =>
          import('@/view/data-search/history-search.vue')
    }
    ]
  },
  {
    path: '/date-statistics',
    name: 'date-statistics',
    meta: {
      icon: 'stats-bars',
      title: '按日统计'
    },
    component: Main,
    children: [{
      path: 'zh-date',
      name: 'zh-date',
      meta: {
        title: '日间实时'
      },
      component: () =>
          import('@/view/date-statistics/zh-date.vue')
    },
    {
      path: 'xs-date',
      name: 'xs-date',
      meta: {
        title: '维度统计'
      },
      component: () =>
          import('@/view/date-statistics/xs-date.vue')
    }
    ]
  },
  {
    path: '/data-analyze',
    name: 'data-analyze',
    meta: {
      icon: 'stats-bars',
      title: '数据分析',
      notCache: true
    },
    component: Main,
    children: [{
      path: 'customer-flow',
      name: 'customer-flow',
      meta: {
        title: '时间段客流',
        notCache: true
      },
      component: () =>
          import('@/view/data-analyze/customer-flow/customerFlow.vue')
    },
    {
      path: 'user-flow-history',
      name: 'user-flow-history',
      meta: {
        title: '客流历史对比',
        notCache: true
      },
      component: () =>
          import('@/view/data-analyze/user-flow-history/user-flow-history.vue')
    },
    {
      path: 'attr-place',
      name: 'attr-place',
      meta: {
        title: '客源地'
      },
      component: () =>
          import('@/view/data-analyze/attr-place/attrPlace.vue')
    },
    {
      path: 'age-gender',
      name: 'age-gender',
      meta: {
        title: '年龄段与性别'
      },
      component: () =>
          import('@/view/data-analyze/age-gender/ageGender.vue')
    },
    {
      path: 'age',
      name: 'age',
      meta: {
        title: '年龄段'
      },
      component: () =>
          import('@/view/data-analyze/age/age.vue')
    },
    {
      path: 'gender',
      name: 'gender',
      meta: {
        title: '性别'
      },
      component: () =>
          import('@/view/data-analyze/gender/gender.vue')
    },
    {
      path: 'direct-ota',
      name: 'direct-ota',
      meta: {
        title: '直销与OTA客流'
      },
      component: () =>
          import('@/view/data-analyze/direct-ota/directOta.vue')
    },
    {
      path: 'direct',
      name: 'direct',
      meta: {
        title: '直销客流'
      },
      component: () =>
          import('@/view/data-analyze/direct/direct.vue')
    },
    {
      path: 'ota',
      name: 'ota',
      meta: {
        title: 'OTA客流'
      },
      component: () =>
          import('@/view/data-analyze/ota/ota.vue')
    },

    {
      path: 'agency-person',
      name: 'agency-person',
      meta: {
        title: '团队与散客'
      },
      component: () =>
          import('@/view/data-analyze/agency-person/agencyPerson.vue')
    },
    {
      path: 'agency',
      name: 'agency',
      meta: {
        title: '团队'
      },
      component: () =>
          import('@/view/data-analyze/agency/agency.vue')
    },
    {
      path: 'seller',
      name: 'seller',
      meta: {
        title: '销售员'
      },
      component: () =>
          import('@/view/data-analyze/seller/seller.vue')
    },
    {
      path: 'coupon',
      name: 'coupon',
      meta: {
        title: '优惠票'
      },
      component: () =>
          import('@/view/data-analyze/coupon/coupon.vue')
    },
    {
      path: 'pay-channel',
      name: 'pay-channel',
      meta: {
        title: '支付渠道'
      },
      component: () =>
          import('@/view/data-analyze/pay-channel/payChannel.vue')
    },

    {
      path: 'ticket-time',
      name: 'ticket-time',
      meta: {
        title: '现场售票时段',
        notCache: true
      },
      component: () =>
          import('@/view/data-analyze/ticket-time/ticket-time.vue')
    },
    {
      path: 'lock-medium',
      name: 'lock-medium',
      meta: {
        title: '过闸介质',
        notCache: true
      },
      component: () =>
          import('@/view/data-analyze/lock-medium/lock-medium.vue')
    },
    {
      path: 'refund-abnormal',
      name: 'refund-abnormal',
      meta: {
        title: '退票异常',
        notCache: true
      },
      component: () =>
          import('@/view/data-analyze/refund-abnormal/refund-abnormal.vue')
    },
    {
      path: 'travel-agency',
      name: 'travel-agency',
      meta: {
        title: '旅行社',
        notCache: true
      },
      component: () =>
          import('@/view/data-analyze/travel-agency/travel-agency.vue')
    },
    {
      path: 'tickets-kind',
      name: 'tickets-kind',
      meta: {
        title: '票种',
        notCache: true
      },
      component: () =>
          import('@/view/data-analyze/tickets-kind/tickets-kind.vue')
    },
    {
      path: 'sale-use-period',
      name: 'sale-use-period',
      meta: {
        title: '购票入园日期',
        notCache: true
      },
      component: () =>
          import('@/view/data-analyze/sale-use-period/sale-use-period.vue')
    },
    {
      path: 'repeat',
      name: 'repeat',
      meta: {
        title: '二次入园',
        notCache: true
      },
      component: () =>
          import('@/view/data-analyze/repeat/repeat.vue')
    },
    {
      path: 'appointment',
      name: 'appointment',
      meta: {
        title: '预约与实际入园',
        notCache: true
      },
      component: () =>
          import('@/view/data-analyze/appointment/appointment.vue')
    }

    ]
  },
  {
    path: '/data-operations',
    name: 'data-operations',
    meta: {
      icon: 'wrench',
      title: '数据运维',
      access: ['super_admin', 'admin'],
      sites: ['S001', 'N001', 'W001']
    },
    component: Main,
    children: [{
      path: 'common-data',
      name: 'common-data',
      meta: {
        title: '公共数据'
      },
      component: () =>
          import('@/view/data-operations/common-data.vue')
    },
    {
      path: 'source-data',
      meta: {
        title: '源数据',
        sites: ['S001']
      },
      name: 'source-data',
      component: () =>
          import('@/view/data-operations/source-data.vue')
    },
    {
      path: 'latitude-param',
      meta: {
        title: '维度参数',
        sites: ['W001']
      },
      name: 'latitude-param',
      component: () =>
          import('@/view/data-operations/latitude-param.vue')
    }
    ]
  },
  {
    path: '/user-admin',
    name: 'user-admin',
    redirect: '/user-admin',
    component: Main,
    meta: {
      title: '用户管理',
      icon: 'ios-body',
      hideInMenu: false,
      notCache: false,
      access: ['super_admin', 'admin']
    },
    children: [{
      path: 'user-admin',
      name: 'user-admin',
      meta: {
        title: '用户管理',
        icon: 'ios-body',
        hideInMenu: false,
        notCache: false
      },
      component: () =>
        import('@/view/user-admin/user')
    }]
  }
]
