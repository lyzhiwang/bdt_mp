
import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    Canceler
} from 'axios-miniprogram'
import { useUserStore } from '@/stores'
import { getExtConfigSync, showToast, showLoading, hideLoading, showModal, removeStorageSync, reLaunch } from '@tarojs/taro'
import { navigateTo } from '@/router'

// 设置全局的请求次数，请求的间隙
axios.defaults.retry = 2
axios.defaults.retryDelay = 1000

const baseURL = (process.env.NODE_ENV === "development") ? "http://klt.zwstk.cn" : "https://api.klt.mudanma.com";
//第三方平台自定义的数据字段
const oem_id = getExtConfigSync().oem_id;
// 创建axios实例
const service = axios.create({
    baseURL, // api 的 base_url
    timeout: 30000, // 请求超时时间
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
        'oemid': oem_id ? oem_id : 2,
        'type': 1,
    }
})


// request拦截器
service.interceptors.request.use(
    config => {
        if(config.headers.loading){
            showLoading({title: '加载中', mask: true})
        }
        const userStore = useUserStore()
        if (userStore.token) {
            config.headers['Authorization'] = 'Bearer ' + userStore.token // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config
    },
    error => {
        // Do something with request error
        Promise.reject(error)
    }
)
// response 拦截器
service.interceptors.response.use(
    response => {
        if(response.config.headers.loading){
            hideLoading()
        }
        const res = response.data
        if (res) {
            if (res.code === 0) { // code 为0请求正常
                return res
            } else {
                // 先提示错误信息
                if (res.message){
                    showToast({ title: res.message, icon: 'none', duration: 3000});
                }
                /**
                 * '700003' => '认证失败',
                 * '700004' => '当前用户已经过期(登录超时)'
                 * '700010' => '无token，code无效，删除导航栏处code，刷新页面重新登录'
                 */
                const userStore = useUserStore()
                switch (res.code) { 
                    case 210: // 活动过期
                        removeStorageSync('activity_id')
                        reLaunch({url: '/pages/home/index'});
                        break;
                    case 700003: // 没有登录
                        showModal({
                            title: '提示',
                            content: '您还未登录，请先登录',
                            success: function (res) {
                                if (res.confirm) {
                                    navigateTo({ url: '/pages/login/index' })
                                }
                            }
                        })
                        break;
                    case 700004: // 登录超时，刷新token
                        userStore.refreshToken()
                        break;
                    case 700010: // 重新获取微信授权登录
                        userStore.logOut()
                        // navigateTo({url: '/pages/login/index'})
                        break;
                }
                return Promise.reject(res)
            }
        } else {
            showToast({ title: '请求成功，返回值错误', icon: 'none', duration: 3000});
            return Promise.reject('error', response)
        }
    },
    error => {
        hideLoading()
        // http响应状态码
        const resposeCode = {
            '301': '请求需要重定向',
            '400': '请求错误',
            '401': '请求受保护，需要填写用户名字/密码',
            '403': '资源不可用',
            '404': '无法找到指定资源',
            '405': '请求方法错误',
            '406': '页面请求头不兼容',
            '407': '服务器授权后方可使用',
            '408': '请求超时，请重试',
            '409': '当前资源被占用',
            '410': '请求资源已过期',
            '413': '请求文件过大',
            '423': '当前资源被锁定',
            '424': '请求关联错误',
            '500': '服务器错误',
            '501': '服务器不支持您的请求',
            '502': '上游服务器无法响应',
            '503': '服务器维护中，请稍后再试',
            '504': '上游服务器未及时应答',
            '510': '策略未满足',
            '600': '响应头未返回'
        }
        const response = error.response || { status: 404 }
        const status = response.status
        showToast({ title: resposeCode[status]||'网络错误，请重新尝试', icon: 'none', duration: 3000});
        return Promise.reject(error)
    }
)

export default service
