import { ref } from 'vue'

//exportで外部から使えるようにする
export const useTodoList = () => {
  const todoList = ref<{ id: number; task: string; checked: boolean }[]>([])
  const ls = localStorage.todoList

  //ローカルストレージにtodoListが存在していればparseし、
  //ならなければundifinedになるため空配列をセット
  todoList.value = ls ? JSON.parse(ls) : []

  //TodoリストからIDをもとにTODO情報を取得
  const findById = (id: number) => {
    return todoList.value.find((todo) => todo.id === id)
  }

  //TodoリストからIDをもとにインデックスを取得 vueのconst addTodo = () =>から
  //findIndexByIdはaddTodo関数内で同じIdがあるかを見る
  const findIndexById = (id: number) => {
    return todoList.value.findIndex((todo) => todo.id === id)
  }

  const add = (task: string) => {
    const id = new Date().getTime() //Idを簡易的にミリ秒で登録
    todoList.value.push({ id: id, task: task, checked: false }) //配列に入力TODOを格納
    localStorage.todoList = JSON.stringify(todoList.value) //ローカルストレージに登録
  }

  //編集ボタンが押されたときの表示処理
  const editId = ref(-1)
  //編集表示
  const show = (id: number) => {
    const todo = findById(id)
    editId.value = id
    return todo?.task //todo?は取得できればtask,できなければundefinedを返す。
  }

  //変更ボタンが押されたときの表示処理
  const edit = (task: string) => {
    const todo = findById(editId.value)
    const idx = findIndexById(editId.value)

    if (todo) {
      todo.task = task
      todoList.value.splice(idx, 1, todo) //splice関数でidxを元にTODOを置換
      localStorage.todoList = JSON.stringify(todoList.value)
      editId.value = -1 //編集モードを解除
    }
  }

  //削除ボタンが押されたときの処理
  const del = (id: number) => {
    const todo = findById(id)
    if (todo) {
      const delMsg = '「' + todo.task + '」を削除しますか?'
      if (!confirm(delMsg)) return

      const idx = findIndexById(id)
      todoList.value.splice(idx, 1)
      localStorage.todoList = JSON.stringify(todoList.value)
    }
  }

  //チェックボックス
  const check = (id: number) => {
    const todo = findById(id)
    const idx = findIndexById(id)
    if (todo) {
      todo.checked = !todo.checked
      todoList.value.splice(idx, 1, todo)
      localStorage.todoList = JSON.stringify(todoList.value)
    }
  }
  return { todoList, add, show, edit, del, check }
}
