<template>
  <div class="filters-add-todo">
    <div class="add-todo-form">
      <input
        id="newUserId"
        class="custom-input add-todo-form__id"
        type="text"
        v-model="newTodo.userId"
        placeholder="ID"
      />
      <input
        id="newTitle"
        class="custom-input add-todo-form__title"
        type="text"
        v-model="newTodo.title"
        placeholder="Title"
      />
      <button class="add-todo-button" @click="addTodo">Add Todo</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { addNewTodo } from '@/api/API';
import { useTodosStore } from '@/stores/todos.ts';
import { NewTodo, Todo } from '@/types/Todo.type.ts';
import { notify } from '@kyvg/vue3-notification';

const { addTodoToStore } = useTodosStore();

const newTodo = ref<NewTodo>({
  userId: '',
  title: ''
});

watch(newTodo, (newVal) => {
  if (!/^\d*$/.test(String(newVal.userId))) {
    newVal.userId = '';
  }
}, { deep: true });

const addTodo = async () => {
  if (newTodo.value.userId && newTodo.value.title) {
    try {
      const response = await addNewTodo({
        userId: Math.trunc(+newTodo.value.userId),
        title: newTodo.value.title
      });
      if (response.status === 201) {
        addTodoToStore(response.data);
        newTodo.value.userId = '';
        newTodo.value.title = '';
        notify({
          title: 'Success',
          type: 'success',
          text: 'You have successfully created a new todo!'
        });
      } else {
        newTodo.value.userId = '';
        newTodo.value.title = '';
        notify({
          title: 'Error',
          type: 'error',
          text: 'Something went wrong!'
        });
      }
    } catch (error) {
      console.error('Failed to add new todo:', error);
    }
  }
};
</script>

<style lang="scss">
.filters {
  &-add-todo {
    display: flex;
    min-height: 76px;
    flex-direction: column;
    gap: 10px;
    width: 500px;
    padding: 20px;
    background-color: #f2f2f2;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 0px 2px rgba(0, 0, 0, 0.2);

    .add-todo-form {
      display: flex;
      justify-content: space-between;
      &__id {
        width: 50px;
      }
      &__title {
        width: 250px;
      }
    }

    .add-todo-button {
      border: none;
      padding: 10px 0;
      border-radius: 4px;
      background-color: #007bff;
      color: white;
      font-size: 14px;
      width: 120px;
      text-transform: uppercase;
      font-weight: 500;
      cursor: pointer;
      transition:
        background-color 0.15s,
        box-shadow 0.15s,
        transform 0.15s;
      &:hover {
        background-color: #0056b3;
      }

      outline: none;
      border: none;
    }
  }
}

@media screen and (max-width: 560px) {
  .filters-add-todo .add-todo-form{
    flex-wrap: wrap;
  }
  .filters-add-todo .add-todo-form__title{
    width: calc(100% - 70px);
  }
  .filters-add-todo{
    width: 100%;
  }
  .filters-add-todo .add-todo-button {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
