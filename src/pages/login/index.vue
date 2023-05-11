<template>
<view class="page2 loginPage fcenter">
    <template v-if="config.sysinfo">
        <cdn-img :src="config.sysinfo.logo" class="logo-box" mode="aspectFit"/>
        <view class="row"><text class="oemName">{{config.sysinfo.name}}</text></view>
    </template>
    <view class="power" v-if="step===2">
        <view class="g6">申请获取您的以下权限</view>
        <view class="desc">获取您的手机号信息，仅限于参与活动和下单时信息使用</view>
    </view>
    <nut-button type="primary" v-if="step===1" @click="ttLogin" class="btn auth">抖音一键登录</nut-button>
    <!-- 获取微信手机号 -->
    <nut-button type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="btn auth" v-else-if="step===2">一键获取手机号</nut-button>
    <!-- 返回 -->
    <!-- <nut-button plain type="primary" @click="back" class="btn back">取消登录</nut-button> -->
    <p class="vcenter" v-if="step===1">
        <nut-checkbox v-model="protocol">已阅读并同意</nut-checkbox>
        <text>用户协议</text>和<text>隐私政策</text>
    </p>
</view>
</template>

<script>
import { reactive, toRefs, onBeforeUnmount } from 'vue'
import { showLoading, hideLoading, login, getUserInfo, getUserProfile, showToast, canIUse } from '@tarojs/taro'
import { useUserStore, useConfigStore } from "@/stores";
import { back, redirectTo, switchTab } from '@/router'
import { wxAuthLogin } from '@/api/index' 
import './login.scss'

export default {
    name: 'login',
	// components: {  },
    setup() {
        definePageConfig({
            navigationStyle: 'default', // custom
        })
        const user = useUserStore()
        const config = useConfigStore()
        const state = reactive({
            step: 1,
            protocol: false,
        })
        let login_data = {}

        function userInfoFun(parame){
            return canIUse('getUserProfile')
                ? getUserProfile({force: true, ...parame}) 
                : getUserInfo({withCredentials: true, ...parame});
        }

        function ttLogin(){
            showLoading({title: '加载中', mask: true});
            // 先登录
            login({
                success : loginRes => {
                    console.log(111, loginRes)
                    login_data.login_code = loginRes.code
                },
                fail: hideLoading,
            })
            // 然后获取用户头像昵称
            userInfoFun({
                success: infoRes => {
                    console.log(1111, infoRes)
                    state.step = 2
                    login_data.login_iv = infoRes.iv;
                    login_data.login_encryptedData = infoRes.encryptedData;
                    const { nickName, avatarUrl } = infoRes.userInfo;
                    if(!user.info.avatarUrl&&!user.info.nickName){
                        user.setUserInfo({ nickName, avatarUrl });
                    }
                },
                fail(){
                    showToast({ title: '获取资料失败', icon: 'none', duration: 3000})
                },
                complete: hideLoading,
            })
        }
        function getPhoneNumber(e){
            console.log(111, e.detail)
            // const { code, encryptedData, iv } = e.detail;
            // if(!code || !encryptedData || !iv) return showToast({ title: '获取手机号失败', icon: 'none', duration: 3000})
            // wxAuthLogin({ ...login_data, code, encryptedData, iv } ).then(res=>{
            //     if(res.data){
            //         const { token, id } = res.data;
            //         user.setUserToken(token);
            //         user.setUserInfo({id});
            //         const url = user.beforeLoginUrl ? user.beforeLoginUrl : '/pages/ucenter/index';
            //         const path = url.split("?")[0]
            //         if(path !== '/pages/ucenter/index') user.getUserInfo()
            //         if(['/pages/home/index','/pages/ucenter/index','/pages/task/index'].indexOf(path)>-1){
            //             switchTab({ url })
            //         }else{
            //             redirectTo({ url })
            //         }
            //     }
            // })
        }
        onBeforeUnmount(()=>{
            if(user.beforeLoginUrl) user.setBeforeLoginUrl('')
        })
        return {
            ...toRefs(state),
            config,
            ttLogin,
            getPhoneNumber
        }
    },
}
</script>
