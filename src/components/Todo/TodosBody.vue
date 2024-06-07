<template>
  <div class="todos-body">
    <template v-if="filteredTodos.length">
      <TodoItem v-for="todo in filteredTodos" :key="generateUniqueId(todo)" :todo="todo" />
    </template>
    <template v-else>
      <div class="empty-body">Not Found</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import TodoItem from './TodoItem.vue';
import { defineProps } from 'vue';
import { Todo } from '@/types/Todo.type.ts';

const props = defineProps<{
  filteredTodos: Array<Todo>;
}>();

const generateUniqueId = (todo: Todo): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substr(2, 9); 
  const uniqueId = `${timestamp}${randomString}${todo.title}${todo.id}`; 
  return uniqueId;
};
</script>

<style lang="scss">
.todos-body {
  overflow: auto;
  height: calc(93vh - 84px - 76px - 48px - 50px);
  border-bottom: 1px solid #ddd;
}
.empty-body {
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 500;
  color: #5c5c5c;
}
</style>
