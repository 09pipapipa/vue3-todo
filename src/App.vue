<script setup lang="ts">
import { useRouter } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

const router = useRouter()
const goBlog = () => {
  router.push({ name: 'blogId', params: { id: 1 } })
}
</script>

<template>
  <div class="wrap">
    <TheHeader />
    <nav>
      <router-link to="/">Todo</router-link>
      | <router-link to="/about">About</router-link> | <router-link to="/blog">Blog</router-link>
    </nav>
    <main class="main"><router-view /></main>
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
