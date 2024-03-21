<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'

//typeを使わず、直接書く方法
const emit = defineEmits<{
  'del-click': [void]
}>()
</script>

<template>
  <BaseButton color="pink" @on-click="emit('del-click')">削除</BaseButton>
</template>
