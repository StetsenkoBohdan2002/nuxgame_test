import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Todo } from '@/types/Todo.type.ts';
import { Ref } from 'vue';
import { todo } from 'node:test';
export const useTodosStore = defineStore('todos', () => {
  const todos = ref<Todo[]>(populateTodosFromStorage());
  const getUserTodos = computed<Ref<Todo[]>>(() => todos);
  const getUserIds = computed<number[]>(() => {
    return todos.value
      .map((todo) => todo.userId)
      .filter((item, index, arr) => arr.indexOf(item) === index);
  });

  function setUserTodos(newList: Todo[]): void {
    todos.value = newList.map((todo) => {
      todo.favorite = false;
      return todo;
    });
    setStorageTodos();
  }

  function addTodoToStore(todo: Todo): void {
    todo.favorite = false;
    todo.completed = false;
    todos.value.push(todo);
    addTodoToStorage(todo);
  }

  function makeFavoriteById(todoId: number): void {
    todos.value.forEach((todo) => {
      if (todo.id === todoId) {
        todo.favorite = !todo.favorite;
      }
    });
    setStorageTodos();
  }
  function resetTodos(): void {
    todos.value = [];
    localStorage.removeItem('todos');
  }

  function setStorageTodos(): void {
    localStorage['todos'] = JSON.stringify(todos.value);
  }

  function addTodoToStorage(todo: Todo): void {
    const todoList: Todo[] = JSON.parse(localStorage['todos']);
    todoList.push(todo);
    localStorage['todos'] = JSON.stringify(todoList);
    todos.value = todoList;
  }

  function populateTodosFromStorage(): Todo[] {
    if (localStorage['todos']) {
      return JSON.parse(localStorage['todos']);
    } else {
      return [];
    }
  }

  return { getUserTodos, setUserTodos, makeFavoriteById, addTodoToStore, getUserIds, resetTodos };
});
