<script setup lang="ts">
//パラメーター渡し
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
//routesで設定した[:id]と同じ
const id = ref(route.params.id)

console.log('watch外: ', id.value)

watch(route, () => {
  id.value = route.params.id
  console.log('watch内:', id.value)
})
</script>

<template>
  <h1>blog page</h1>
  <p>blog id = {{ id }}</p>
</template>
