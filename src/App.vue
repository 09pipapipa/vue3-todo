<script setup lang="ts">
import TheFooter from '@/components/TheFooter.vue'
import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
  <div class="wrap">
    <TheHeader />
    <main class="main">メイン</main>
    <TheFooter />
  </div>
</template>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column; /*上から下に*/
  align-items: center;
  min-height: 90vh;
  padding: 0;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f8f8f8;
}
.main {
  flex: 1; /*親要素のwrapの高さmin-height: 90vh;とっていてmainはwrap90%全てをとっている*/
  padding: 16px;
}
</style>
