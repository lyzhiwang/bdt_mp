<template>
<view class="page2">
	<view>首页</view>
	<CustomTabBar/>
</view>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'
import CustomTabBarVue from '../../components/CustomTabBar.vue';
import { useDidShow, useLoad } from '@tarojs/taro'
import { useUserStore, useConfigStore } from "@/stores";
import "./index.scss";
export default {
	name: 'Index',
	components: { CustomTabBarVue },
	setup() {
		const user = useUserStore()
        const config = useConfigStore()
		const state = reactive({})
		useLoad(async(query) => {
			const url = decodeURIComponent(query.q)
			// 开启分享
			tt.showShareMenu({menus: ['share', 'record']})
			// 获取定位
			await user.updataLocation();
			// 获取用户信息
			// user.getUserInfo()
		});
		useDidShow(()=>{
			config.setSelecTab(0)
		})
		return {
			...toRefs(state),
		}
	},
	onShareAppMessage(res){ // 点击右上角转发
		console.log(111, res)
	},
	onUploadDouyinVideo(){ // 发布抖音视频
		
	},
}
</script>