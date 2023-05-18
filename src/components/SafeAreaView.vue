<template>
<view :style="{'padding-bottom': `${config.safeAreaBot}px!important`}">
    <slot></slot>
</view>
</template>

<script setup>
import { useConfigStore } from '@/stores'
const config = useConfigStore()
</script>