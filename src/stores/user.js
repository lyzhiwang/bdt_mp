import { defineStore } from 'pinia'
import { refresh, queryUserInfo } from '@/api/index'
import { setStorageSync, getStorageSync, getLocation } from '@tarojs/taro'

export const useUserStore = defineStore('user', {
    persist: true, // 开启当前模块持久化
    state: () => ({
        token: getStorageSync('token')||'',
        location: {
            latitude: '',
            longitude: '',
        },
        info: {
            id: null,
            avatarUrl: '',
            nickName: '',
            balance: '0.00',
            to_be_paid: '0.00',
            total_income: '0.00',
            already_cash: '0.00',
            phone: '',
            is_settle:false,
        },
        beforeLoginUrl: '', // 登陆前的页面地址 /pages/home/index
        beforeAuthUrl: '',  // 认证前的页面地址 /pages/home/index
    }),
    getters: {
        isLogin: state => !!state.token,
    },
    actions: {
        setUserToken(str){
            this.token = str
            setStorageSync('token', str)
        },
        logOut(){
            this.setUserToken('')
        },
        setBeforeLoginUrl(url){
            this.beforeLoginUrl = url
        },
        setBeforeAuthUrl(url){
            this.beforeAuthUrl = url
        },
        setUserInfo(obj){
            const keyArr = Object.keys(obj)
            for(const item of keyArr){
                this.info[item] = obj[item]
            }
        },
        getLocalInfo(){
            // this.mode = getStorageSync('mode')
            // this.token = getStorageSync('token')
            // 获取本地信息
            const info = getStorageSync('info')
            this.setUserInfo(info)
        },
        async updataLocation(){
            // 获取用户当前地理位置
            try {
                const res = await getLocation({ type: "wgs84" })
                const { latitude, longitude } = res;
                if(latitude){
                    this.location = { latitude, longitude};
                }
                return res;
            } catch (error) {
                throw error
            }
        },
        async refreshToken(){
            try {
                const res = await refresh()
                // 更新token
                this.setUserToken(res.data.token)
                return res.data.token
            } catch (error) {
                throw error
            }
        },
        async getUserInfo(){
            if(!this.isLogin) return false
            try {
                const res = await queryUserInfo()
                if(!res.data) return false
                const { id, nickname, avatar, balance, to_be_paid, total_income, already_cash, phone, is_settle } = res.data;
                this.setUserInfo({
                    id,
                    avatarUrl: decodeURIComponent(avatar),
                    nickName: nickname,
                    balance, to_be_paid, total_income, already_cash, phone,is_settle
                })
                return id
            } catch (error) {
                throw error
            }
        },
    }
})

export default useUserStore