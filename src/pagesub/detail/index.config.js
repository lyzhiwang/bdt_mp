export default definePageConfig({
  navigationStyle: 'default', // custom
  // navigationBarTextStyle: 'white',
  // backgroundColor: '#000',
  // transparentTitle: 'auto',
  // usingComponents: {
  //   'pay-button': 'plugin://microapp-trade-plugin/pay-button',
  // },
  usingComponents: {
    "zijie-pay-button": "../../components/pay-button/pay-button",
  },
})
