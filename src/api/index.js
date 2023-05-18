import request from '@/utils/request'

// 微信登录
export function wxAuthLogin(data){
  return request({
    headers: {
      loading: true
    },
    url: '/login',
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