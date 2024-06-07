<template>
  <div class="todos-row">
    <div class="todos-cell todos-user-id">{{ todo.userId }}</div>
    <div class="todos-cell todos-id">{{ todo.id }}</div>
    <div class="todos-cell todos-title">{{ todo.title }}</div>
    <div class="todos-cell todos-completed">
      <img
        v-if="todo.completed"
        src="@/assets/icons/completed-icon.svg"
        alt="Completed Icon"
        class="icon-sm"
      />
      <img
        v-else
        src="@/assets/icons/uncompleted-icon.svg"
        alt="Uncompleted Icon"
        class="icon-sm"
      />
    </div>
    <div class="todos-cell todos-favorite" @click="makeTodoFavorite(todo)">
      <img
        v-if="todo.favorite"
        src="@/assets/icons/favorite-icon-fill.svg"
        alt="Favorite Icon"
        class="icon-sm"
      />
      <img v-else src="@/assets/icons/favorite-icon.svg" alt="Favorite Icon" class="icon-sm" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodosStore } from '@/stores/todos.ts';
import { Todo } from '@/types/Todo.type.ts';

const props = defineProps<{
  todo: Todo;
}>();
const { makeFavoriteById } = useTodosStore();

const makeTodoFavorite = (todo: Todo): void => {
  makeFavoriteById(todo.id);
};
</script>

<style lang="scss">
.todos-row {
  display: flex;
  border-bottom: 1px solid #ddd;

  &:nth-child(2n) {
    background-color: #f6f6f668;
  }

  &:last-child {
    border-bottom: none;
  }

  .todos-cell {
    text-align: left;
    padding: 12px;

    &.todos-id {
      min-width: 50px;
    }

    &.todos-user-id {
      min-width: 80px;
    }

    &.todos-title {
      flex-grow: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    &.todos-completed {
      width: 100px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &.todos-favorite {
      cursor: pointer;
      transition: transform 0.1s ease-in-out;

      &:active {
        transform: scale(1.3);
      }
    }
  }
}

@media screen and (max-width: 560px) {
  .todos-row .todos-cell.todos-user-id {
    min-width: 70px;
    max-width: 70px;
  }
  .todos-row .todos-cell.todos-favorite {
    width: 40px;
  }
  .todos-row .todos-cell.todos-completed {
    width: 60px;
  }
}
</style>
