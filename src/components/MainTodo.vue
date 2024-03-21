<script setup lang="ts">
import { ref } from 'vue'

import { useTodoList } from '@/composables/useTodoList'
import ButtonAdd from '@/components/ButtonAdd.vue'
import ButtonDel from '@/components/ButtonDel.vue'
import ButtonEdit from '@/components/ButtonEdit.vue'
import ButtonShow from '@/components/ButtonShow.vue'

const todo = ref<string | undefined>()
const isEdit = ref(false)
const { todoList, add, show, edit, del, check, countFin } = useTodoList()

const addTodo = () => {
  if (!todo.value) return //(!todo.value)が空かチェック、空ならtrue,逆ならfalseでユーザーが入力ないときは関数から抜ける。
  add(todo.value) //空でない、ユーザーが何か入力している時todo.valueの値を取る
  todo.value = '' //空の配列を設定することでタスクを入力するたびクリアされる。
}

//編集ボタン機能
//↓IDパラメーターを受け取り関数showTodoに渡す
const showTodo = (id: number) => {
  //↓押された編集ボタンのidを取得してtodo.valueに代入
  todo.value = show(id)
  //todo.valueの値があればisEditの値(value)をtrueに設定して編集モードがon
  if (todo.value) {
    isEdit.value = true
  }
}

//変更ボタン機能
const editTodo = () => {
  if (!todo.value) return
  edit(todo.value)
  //↓falseにするのは編集モードを終了するかどうかtrueにしておくと編集モードが終わらず変更ボタン→追加に戻らない。
  isEdit.value = false
  todo.value = ''
}
//削除ボタン機能
const deleteTodo = (id: number) => {
  isEdit.value = false
  del(id)
}

const changeCheck = (id: number) => {
  // check 関数を呼び出す
  check(id)
}
</script>

<template>
  <div>
    <input type="text" class="todo_input" v-model="todo" placeholder="+ TODOを入力" />
    <ButtonEdit @edit-click="editTodo" v-if="isEdit" />
    <ButtonAdd @add-click="addTodo" v-else />
  </div>
  <div class="box_list">
    <div class="todo_list" v-for="todo in todoList" :key="todo.id">
      <div class="todo" :class="{ fin: todo.checked }">
        <input
          type="checkbox"
          class="check"
          @change="changeCheck(todo.id)"
          :checked="todo.checked"
        />
        <label>{{ todo.task }}</label>
      </div>
      <div class="btns">
        <ButtonShow @show-click="showTodo(todo.id)" />
        <ButtonDel @del-click="deleteTodo(todo.id)" />
      </div>
    </div>
  </div>
  <div class="finCount">
    <span>完了:{{ countFin }}、</span>
    <span>未完了:{{ todoList.length - countFin }}</span>
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
.box_list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 20px;
}

.todo_list {
  display: flex;
  gap: 8px;
  align-items: center;
}

.todo {
  width: 250px;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.check {
  margin-right: 12px;
  transform: scale(1.6);
}

.btns {
  display: flex;
  gap: 4px;
}

.green {
  background-color: #00c853;
}
.pink {
  background-color: #ff4081;
}
.fin {
  color: #777;
  text-decoration: line-through;
  background-color: #ddd;
}
.finCount {
  margin-top: 8px;
  font-size: 0.8em;
}
</style>
