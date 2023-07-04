export default defineAppConfig({
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: 'pages/home/index',
      },
      {
        pagePath: 'pages/ucenter/index',
      },
    ],
  },
  pages: [
    'pages/home/index',
    'pages/ucenter/index',
    'pages/login/index',
    // "pages/index/index",
    // 提单页
    // "ext://microapp-trade-plugin/order-confirm",
    // // 退款申请页配置
    // "ext://microapp-trade-plugin/refund-apply",
    // // 退款详情页
    // "ext://microapp-trade-plugin/refund-detail"
  ],

  subpackages: [
    {
      root: 'pagesub',
      pages: [
        'sub1/index',
        'orders/index',
        'orders/detail',
        'refund/index',
        'detail/index',
        'credentials/index',
        'payment/index',
        'payment/notice',
        'seller/store',
        'appraise/index',
      ]
    },
  ],
  window: {
    backgroundColor: '#fff',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '',
    navigationBarTextStyle: 'black',
  },
  lazyCodeLoading: "requiredComponents",
  requiredPrivateInfos: ["getLocation", "chooseLocation"],
  permission : {
    "scope.userLocation" : {
        "desc" : "为了更好的为您提供服务"
    }
  },
  plugins:{
    "microapp-trade-plugin": {
      "version": "1.1.2",
      "provider": 'wxidxxxxxxxxxxxxxxxx',
      // "isDynamic": true
    }
  }
})
