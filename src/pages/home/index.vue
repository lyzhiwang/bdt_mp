<template>
<SafeAreaView class="page">
	<nut-swiper :init-page="1" :pagination-visible="true" :loop="true" pagination-color="#426543" auto-play="3000">
		<nut-swiper-item v-for="(item,index) in imgsList" :key="index">
			<cdn-img class="swiper-img" :src="item"/>
		</nut-swiper-item>
  	</nut-swiper>
	
	<view class="main">
		<!-- 热卖爆款 -->
		<view class="hot-box">
			<cdn-img class="hot-h-img" src="/static/img/home/hot-header.png"/>
			<view class="hot-box-main">
				<view class="hot-bm-header">
					<cdn-img class="title-img" src="/static/img/home/hot-title.png"/>
					<text>更多></text>
				</view>	
				<view class="goods-list">
					<scroll-view scroll-x="true" style="width: 100%; overflow:hidden;">
						<view style="display: flex;">
							<goods-box v-for="i in 10"></goods-box>
						</view>	
					</scroll-view>
					
				</view>
			</view>
		</view>
  
		<!-- 菜单 -->
		<view class="tabBox">
			<view class="tabItem" v-for="(item, index) in tabs" :key="index" :class="{'action-tab': current===item.value}" @click="changeTab(item)">{{item.label}}</view>
		</view>

		<view class="goodsList">
			<view class="goodsItem" v-for="(item, index) in List" @click="goToSub(`detail/index?id=${item.id}`)">
				<cdn-img class="goodsImg" :src=" item.image " mode="aspectFill" lazyLoad/>
				<view class="g-content">
					<!-- <nut-ellipsis 
					content='123336555' 
					direction="end"
					class="titleBox" 
					rows="3"></nut-ellipsis> -->
                        <view class="title">{{ item.product_name }}</view>
					<view class="g-info">
						<view class="price-Box">
							<view class="price">{{item.sku.actual_amount }} <text class="discount">{{item.sku.discount}}折</text></view>
							<view class="old-price">￥{{ item.sku.origin_amount }}</view>
						</view>

						<view class="btn">立即购买</view>
					</view>
				</view>
			</view>
			<nut-divider v-if="listStatus=='loading'">加载中...</nut-divider>
      <nut-divider v-else-if="listStatus=='nomore'">没有更多了</nut-divider>
		</view>
	</view>
	<!-- 底部TabBar -->
	<CustomTabBar/>
</SafeAreaView>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'
import CustomTabBar from '../../components/CustomTabBar.vue';
import GoodsBox from "../../components/GoodsBox.vue";
import { useDidShow, useLoad, useReachBottom } from '@tarojs/taro'
import { useUserStore, useConfigStore } from "@/stores";
import { navigateTo } from "@/router/index";
import { goToSub } from '@/utils/nav'
import { getGoodList } from "@/api/index";
import "./index.scss";
export default {
	name: 'Index',
	components: { CustomTabBar },
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

		const params = ref({
			page: 1,
			size: 10,
			type: 1 // 1营业额提现 2活动余额提现
		})
		const meta = {}

		const goodsList = ref([])
        const List = ref([])
        //商品列表
        const page = ref(1)
        let paging = { page: 1, size: 20}
                paging = {page: page.value, size: 20}
                // paging.type = state.tab4value==0 ? null : state.tab4value
                getGoodList(paging).then(res=>{
                    // if(res.meta){
                    //     last_page = res.meta.last_page
                    // }
                    if(res.data){
                        List.value = List.value.concat(res.data)
                    }
                })
		useReachBottom(()=>{
				console.log('触发底部')
				// const str = (user.mode===1 ? 'star' : 'talent')
				if(params.value.page >= meta.last_page) return listStatus.value = 'nomore';
				listStatus.value = 'loading'
				if(params.value.page < meta.last_page){
					params.value.page += 1;
					getList()
				}
		})

		const getList=()=>{
          
			cashLog(params.value).then(res=>{
				if(res.meta){
					meta = res.meta
				}
				if(res.data){
					goodsList.value = goodsList.value.concat(res.data)
				}
			})
		}
		
		const imgsList = ref(['https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg', 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg'])
		const listStatus = ref('loadmore')
		const tabs = ref([{value: 1, label: '人气新品'},{value: 2, label: '当前热门'},{value: 3, label: '离我最近'},{value: 4, label: '开抢预告'}])
		const current = ref(1) // 当前选择菜单
		const changeTab = item =>{
			current.value = item.value
		}

		// const toDetail = ()=>{
		// 	navigateTo({url: `/pagesub/detail/index?id=${l.order_id}`})
		// }

		return {
			...toRefs(state),imgsList, tabs, current,goToSub, changeTab, listStatus,List
		}
	},
	onShareAppMessage(res){ // 点击右上角转发
		console.log(111, res)
	},
	onUploadDouyinVideo(){ // 发布抖音视频
		
	},
}
</script>