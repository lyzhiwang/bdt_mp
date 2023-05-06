<template>
    <textarea type="text" class="area" :value="modelValue" @input="inputHandler" :placeholder="placeholder" :cursor-spacing="distance"/>
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
const distance = computed(()=>config.ios?190:150)
function inputHandler(e){
    emit('update:modelValue', e.target.value)
}
</script>

<style lang="scss">
.area{
    height: 150px;
    padding: 0 10px;
    box-sizing: border-box;
}
</style>