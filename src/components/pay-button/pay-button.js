
import { getGoods } from "@/api/index";
Component({
  properties: {
    mode: Number,
    goodsId: {
      type: String,
      value: "",
    },
    id:{
        type:String,
        value:"",
    },
    // orderId:{
    //     type:String,
    //     value:"",
    // }
  },

  data() {
    return{
        // GoodsList:""
    }
  },

  methods: {
    getGoodsInfo(goodsId,id) {
      return new Promise((resolve) => {
        console.log("user goodsId222222",id, goodsId);
        getGoods({id:goodsId.currentTarget.id}).then(res=>{
           console.log(res.data,'res11111111')
                resolve({
                    
                    goodsName:res.data.product_name,
					minLimits: res.data.min_limits,
                    // currentPrice:res.data.current_price,
					// goodsLabels: res.data.goods_labels,
                        if (maxLimits) {
                            maxLimits: res.data.maxLimits
                        },
					validation: {
						phoneNumber: {
							required: false  // 手机号是否必填
						}
					}
				});
        })
     
      })
    },

    onError(e) {
      console.log(e.detail);
      const { errNo, errMsg } = e.detail;
      console.log("errNo", errNo, "errMsg", errMsg);
      if (errNo === 21514) {
        tt.showToast({
          title: "失败", // 内容
          icon: "none", // 图标
        });
      } else if (errNo === 21513) {
        tt.showToast({
          title: "获取中", // 内容
          icon: "none", // 图标
        });
      }
    },


    onPay(options) {
      const { status, orderId, outOrderNo, result } = options.detail;
      console.log("onPay", status, orderId, outOrderNo, result);
      tt.navigateBack();
      tt.continueToPay({
        orderId: "orderId", // 内部订单号
        outOrderNo: "outOrderNo", // 外部订单号 2个订单号必填一个
        success: (res) => {
          const { orderId, outOrderNo } = res;
          console.log("success res", res);
          console.log("orderId", orderId, "outOrderNo", outOrderNo);
        },
        fail: (res) => {
          const { orderId, outOrderNo, errNo, errMsg, errLogId } = res;
          if (errLogId) {
            console.log("查询订单信息失败", errNo, errMsg, errLogId);
          }
          if (orderId || outOrderNo) {
            console.log("支付失败", errNo, errMsg, orderId, outOrderNo);
          }
        },
      });
      
    },
    // bind:pay 使用示例 
    // //继续支付
    //     handleContinutePay(event) {
    //         console.log(888888888)
    //         const { status, outOrderNo, result } = event.detail;
    //         if (status === 'success') {
    //             const { code } = result;
    //             if (code === 0) {
    //                 // 继续支付成功
    //             }
    //         } else {
    //             // 继续支付失败
    //         }
    //     },

    handleRefund(event) {
      const { status, result } = event.detail;
      if (status === 'success') {
        const { refundId, outRefundNo } = result;
        console.log('发起退款成功', refundId, outRefundNo);
      } else {
        const { errMsg } = result;
        console.log('发起退款失败', errMsg);
      }
    },

    userLogin(event) {
      console.log("place order", event);
      return new Promise((resolve) => {
        resolve();
        tt.login({
            success() {
                // 用户登录成功并获取信息，则调用 resolve 函数，跳转至提单页
                console.log(555555)
                resolve();
            },
            fail() {
                // 用户登录失败，则跳转提单页失败
                console.log(66666666)
                reject();
            }
        });
      });
    },
  },
});
