<template>
<view :style="{'padding-bottom': `${config.safeAreaBot}px`}">
    <slot></slot>
</view>
</template>

<script setup>
import { useConfigStore } from '@/stores'
const config = useConfigStore()
</script>