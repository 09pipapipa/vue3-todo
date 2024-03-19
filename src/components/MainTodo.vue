<script setup lang="ts">
import { ref } from 'vue'

//todoを繰り返し表示する
const todo = ref('')
const todoList = ref<{ id: number; task: string }[]>([])

const ls = localStorage.todoList
todoList.value = ls ? JSON.parse(ls) : []

//Todoを登録する
const addTodo = () => {
  //IDをミリ秒で登録する
  const id = new Date().getTime()
  //配列に入力TODOを格納
  todoList.value.push({ id: id, task: todo.value })
  //ローカルストレージに登録
  localStorage.todoList = JSON.stringify(todoList.value)
  //登録後は入力欄を空にする
  todo.value = ''
}

//編集ボタンを押すと入力欄にtodoを表示
//編集ボタンを押したときにtrueにする
const isEdit = ref(false)
let editId = -1

const showTodo = (id: number) => {
  //TdoリストからIDに一致するTodoを取得
  const findTodo = todoList.value.find((todo) => todo.id === id)
  //取得した要素からtaskを取り出し入力欄へ
  if (findTodo) {
    todo.value = findTodo.task
    isEdit.value = true
    editId = id
  }
  const editTodo = () => {}
}

//editTodoの処理を追加
const editTodo = () => {
  //TodoリストからIDに一致するTodoを取得
  const findTodo = todoList.value.find((todo) => todo.id === editId)

  //TodoリストからIdに一致するインデックスを取得
  const idx = todoList.value.findIndex((todo) => todo.id === editId)

  // taskを編集後のTodoで置き換え
  if (findTodo) {
    findTodo.task = todo.value

    //splice関数でインデックスをもとに対象オブジェクトを置き換え
    todoList.value.splice(idx, 1, findTodo)
    //localStorageに保存
    localStorage.todoList = JSON.stringify(todoList.value)

    //初期値に戻す
    isEdit.value = false
    editId = -1
    todo.value = ''
  }
}
</script>

<template>
  <div>
    <input type="text" class="todo_input" v-model="todo" placeholder="+ TODOを入力" />
    <button class="btn green" @click="editTodo" v-show="isEdit">変更</button>
    <button class="btn" @click="addTodo" v-show="!isEdit">追加</button>
  </div>
  <div class="box_list">
    <div class="todo_list" v-for="todo in todoList" :key="todo.id">
      <div class="todo">
        <input type="checkbox" class="check" />
        <label>{{ todo.task }}</label>
      </div>
      <div class="btns">
        <button class="btn green" @click="showTodo(todo.id)">編</button>
        <button class="btn pink">削</button>
      </div>
    </div>
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
</style>
