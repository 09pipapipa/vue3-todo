<script setup lang="ts">
type Props = {
  color: string
}

type Emits = {
  'on-click': [void]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleClick = () => {
  emit('on-click')
}

const aaa = () => {}
</script>

<template>
  <button class="btn" :class="props.color" @click="handleClick"><slot /></button>
</template>

<style scoped>
.btn {
  padding: 8px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  background-color: #03a9f4;
  border-radius: 6px;
}
.blue {
  background-color: #03a9f4;
}
.green {
  background-color: #00c853;
}
.pink {
  background-color: #ff4081;
}
</style>
