<template>
  <div class="home-page">
    <div class="container">
      <div class="home-page-wrapper">
        <AddTodo />
        <Filters
          :userIds="getUserIds"
          :statusFilter="statusFilter"
          :userFilter="userFilter"
          :searchQuery="searchQuery"
          @changeStatusFilter="changeStatusFilter"
          @changeUserFilter="changeUserFilter"
          @changeSearchQuery="changeSearchQuery"
        />
        <TodosList :filteredTodos="filteredTodos" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AddTodo from '@/components/Todo/AddTodo.vue';
import Filters from '@/components/Filters/Filters.vue';
import TodosList from '@/components/Todo/TodosList.vue';
import { onMounted, ref, computed, onUnmounted } from 'vue';
import { useTodosStore } from '@/stores/todos.ts';
import { Todo } from '@/types/Todo.type.ts';
import { useAuthStore } from '@/stores/auth.ts';
import { storeToRefs } from 'pinia';
import { AxiosResponse } from 'axios';
import { getTodos } from '@/api/API.ts';
const { getUserTodos, setUserTodos, makeFavoriteById, addTodoToStore } = useTodosStore();
const { getUserIds } = storeToRefs(useTodosStore());
const { getUserData } = useAuthStore();
const statusFilter = ref<string>('all');
const userFilter = ref<string>('all');
const searchQuery = ref<string>('');

const changeStatusFilter = (newValue: string): void => {
  statusFilter.value = newValue;
};
const changeUserFilter = (newValue: string): void => {
  userFilter.value = newValue;
};
const changeSearchQuery = (newValue: string): void => {
  searchQuery.value = newValue;
};

onMounted(async () => {
  try {
    if (!getUserTodos.value.length) {
      const response: AxiosResponse<Todo[]> = await getTodos();
      if (response.status === 200) {
        setUserTodos(response.data);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

const filteredTodos = computed<Todo[]>(() => {
  let filtered: Todo[] = getUserTodos.value;

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter((todo: Todo) => {
      if (statusFilter.value === 'favorites') {
        return todo.favorite;
      }
      return todo.completed === (statusFilter.value === 'completed');
    });
  }

  if (userFilter.value !== 'all') {
    filtered = filtered.filter((todo: Todo) => todo.userId === parseInt(userFilter.value));
  }

  if (searchQuery.value.trim() !== '') {
    const search = new RegExp(searchQuery.value.trim(), 'i');
    filtered = filtered.filter((todo: Todo) => todo.title.match(search));
  }

  return filtered;
});
</script>

<style lang="scss">
.home-page {
  position: relative;
  max-width: 100vw;
  min-height: 93vh;
  &-wrapper {
    padding-top: 20px;
  }
}

.custom-input {
  height: 35px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
}

.custom-select {
  padding: 8px;
  height: 35px;
  border-radius: 4px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;
  width: 100%;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
}

.empty {
  width: 50px;
}
</style>
