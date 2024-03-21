<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'

//typeを使わず、直接書く方法
const emit = defineEmits<{
  'edit-click': [void]
}>()
</script>

<template>
  <BaseButton color="green" @on-click="emit('edit-click')">変更</BaseButton>
</template>
