<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'

//typeを使わず、直接書く方法
const emit = defineEmits<{
  'show-click': [void]
}>()
</script>

<template>
  <BaseButton color="blue" @on-click="emit('show-click')">編</BaseButton>
</template>
