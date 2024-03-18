<script setup lang="ts">
import { ref } from 'vue'

const todo = ref('')

const addTodo = () => {
  localStorage.todoList = todo.value
}
</script>

<template>
  <div>
    <input type="text" class="todo_input" v-model="todo" placeholder="+ TODOを入力" />
    <button class="btn" @click="addTodo">追加</button>
  </div>
</template>

<style scoped>
.todo_input {
  width: 250px;
  padding: 6px 8px;
  margin-right: 8px;
  font-size: 18px;
  border: 1px solid #aaa;
  border-radius: 6px;
}
.btn {
  position: relative;
  padding: 6px 8px;
  font-size: 14px;
  color: #fff;
  text-align: center;
  background-color: #03a9f4;
  border-radius: 6px;
}
.btn:active {
  top: 1px;
}
</style>
