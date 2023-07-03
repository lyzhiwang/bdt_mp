<template>
    <SafeAreaView>
        <view class="page2 appraise">
                <view class="index"> 
                    <view class="assess"> 
                        写下你的评价吧
                        <nut-textarea v-model="form.content" placeholder="分享下你的消费心得吧~" />
                    </view>
                </view>
                <view class="index"> 
                    <view class="assess"> 
                        分享图片
                        <!-- :url="config.sysinfo.qiniu_url" -->
                        <nut-uploader 
                            :data="formData"
                            
                            :maximize="1048576"
                            class="img" 
                            :multiple="false"
                            maximum="4"
                            @oversize="OverLimit" 
                            @success="uploadSucc"
                            @delete="deleteFile"
                        ></nut-uploader>
                    </view>
                </view>
                <view class="attestation safeArea">
                    <nut-button 
                        type="primary"
                        @click="publication" 
                        class="submitBtn" 
                        :disabled="!disabled"
                    >发表评论</nut-button>
                </view>
        </view>
     
    </SafeAreaView>
   
</template>
<script setup>
import { reactive, computed } from 'vue';
import { useLoad, showToast } from '@tarojs/taro'
// import { orderComment, QiniuToken } from "@/api/index";
import { useConfigStore } from '@/stores'
import { redirectTo } from '@/router'
import "./index.scss";

const config = useConfigStore()
const formData = reactive({
    token: '',
    'x:type': 15,
});
const form = reactive({
    content: '',
    images: [],
})
const disabled = computed(()=>form.content&&form.images.length>0)
let order_id = ''

function OverLimit(){
    showToast({
        title: '图片超过1M',
        icon: 'error',
        duration: 2000
    })
}

function uploadSucc({data}){
    const id = JSON.parse(data.data).data.id
    // console.log('上传成功', data, id)
    form.images.push(id)
}

function deleteFile({index}){
    // 删除已上传的
    form.images.splice(index, 1)
}

useLoad((option) => {
    // 进入页面先获取order_id
    if(option&&option.order_id){
        order_id = option.order_id
    }
    // 获取七牛云token
    // QiniuToken({file_type:'img'}).then((res) => {
    //     if(res&&res.data){
    //         formData.token = res.data.qiniuToken
    //     }
    // })
})

const publication = () => {
    // console.log('发表评论', form)
    orderComment(order_id, form).then(res=>{
        if(res&&res.data){
            showToast({title: '发表评论成功',icon: 'success', duration: 2000})
            setTimeout(()=> redirectTo({url: '/pagesub/orders/index'}), 2000)
        }
    })
}
</script>
  