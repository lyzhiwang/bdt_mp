
// import { getGoods } from "@/api/index";
Component({
  properties: {
    mode: Number,
    orderId: {
      type: String,
      value: "",
    },
  },

  data() {
    return{
        // GoodsList:""
    }
  },

  methods: {
 // js
// bind:consume 使用示例
//核销订单后触发
orderChangeHandler(event){
    console.log(1111)
    const { orderId } = event.detail
    //do something
},

// bind:applyrefund 使用示例
//点击申请退款时触发的方法
applyRefund(event){
    console.log(222)
    const { orderId } = event.detail
    return new Promise((resolve)=>{
      resolve( {name: 'test' } )
    })
},

// bind:refund 使用示例
//申请退款时触发的方法
handleRefund(event) {
    console.log(333)
    const { status, result } = event.detail;
    if (status === 'success') {
        const { refundId, outRefundNo } = result;
    } else {
        const { errMsg } = result;
    }
},

// 错误信息含义见下文 bind:error报错信息
handleError(event) {
    console.log(444)
    const { errMsg ,errNo} = event.detail;
    // do something
    // errNo（错误码，对应某种具体报错原因）
    // errMsg（报错信息）
}

  },
});
