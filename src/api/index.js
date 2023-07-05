import request from '@/utils/request'

// 微信登录
export function wxAuthLogin(data){
  return request({
    headers: {
      loading: true
    },
    url: '/user/login',
    method: 'post',
    data
  })
}

// 用户信息
export function queryUserInfo(params){
  return request({
    url: '/user/info',
    method: 'get',
    params
  })
}
// 微信登录
export function wxPhone(data){
    return request({
      headers: {
        loading: true
      },
      url: '/user/phone',
      method: 'post',
      data
    })
  }

// 获取七牛 token
export function QiniuToken(params) {
  return request({
    url: '/qn/token',
    method: 'get',
    params
  })
}

// 刷新token
export function refresh(params) {
  return request({
    url: '/refresh',
    method: 'get',
    params
  })
}

// 更新用户昵称头像
export function updateProfile(data) {
  return request({
    headers: {
      loading: true
    },
    url: '/user/update',
    method: 'post',
    data
  })
}


// 创建订单
export function createOrder(data) {
	return request({
    headers: {
      loading: true
    },
	  url: `place/order`,
	  method: 'post',
    data
	})
}
// 门店列表
export function ShopList(params) {
    return request({
        url: '/shop',
        method: 'get',
        params
    })
}
// 门店资质
export function ShopAptitude(params) {
    return request({
        url: '/shop/license',
        method: 'get',
        params
    })
}
// 商品列表
export function getGoodList(params) {
    return request({
        url: '/product',
        method: 'get',
        params
    })
}
// 订单详情
export function getGoodListShow(data) {
    return request({
        url: `/product/${data.id}`,
        method: 'get',
    })
}
// 商品信息
export function getGoods(data) {
    return request({
        url: `/product_info/${data.id}`,
        method: 'get',
    })
}

// 获取用户手机号
export function getPhone(data) {
  return request({
    url: '/user/phone',
    method: 'post',
    data
  })
}
