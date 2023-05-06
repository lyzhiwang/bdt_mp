<template>
<template v-if="listLen>0">
    <nut-divider v-if="listStatus=='loading'">加载中...</nut-divider>
    <nut-divider v-else-if="listStatus=='nomore'&&page>1">没有更多了</nut-divider>
</template>
<nut-empty :description="desc" v-else></nut-empty>
</template>

<script setup>
const props = defineProps({
    listLen: {
        type: Number,
        default: 0,
    },
    listStatus: {
        type: String,
        default: 'loadmore',
    },
    desc: {
        type: String,
        default: '暂无数据',
    },
    page:{
        type: Number,
        default: 1,
    }
});
</script>