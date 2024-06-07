<template>
  <div class="todos-list">
    <TodosHeader />
    <TodosBody :filteredTodos="filteredTodos" />
  </div>
</template>

<script setup lang="ts">
import TodosHeader from '@/components/Todo/TodosHeader.vue';
import TodosBody from '@/components/Todo/TodosBody.vue';
import { Todo } from '@/types/Todo.type.ts';
const props = defineProps<{
  filteredTodos: Array<Todo>;
}>();
</script>

<style lang="scss">
.todos-list {
  width: 100%;
}
</style>
