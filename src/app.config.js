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
  ],
  subpackages: [
    {
      root: 'pagesub',
      pages: [
        'sub1/index',
        'detail/index',
        'credentials/index',
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
})
