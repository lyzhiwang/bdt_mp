<template>
<input type="text" class="klt" :value="modelValue" @input="inputHandler" :placeholder="placeholder" :cursor-spacing="distance"/>
</template>

<script setup>
import { computed } from 'vue';
import { useConfigStore } from '@/stores'

const config = useConfigStore()
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    cursorSpacing: {
        type: Number,
        default: 10,
    }
});
const distance = computed(()=>config.ios?props.cursorSpacing+40:props.cursorSpacing)
function inputHandler(e){
    emit('update:modelValue', e.target.value)
}
</script>

<style lang="scss">
.klt{
    height: 40px;
    line-height: 38px;
    border-radius: 20px;
    padding: 0 10px;
    box-sizing: border-box;
}
</style>