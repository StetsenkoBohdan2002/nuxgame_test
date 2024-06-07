<template>
  <div class="filters">
    <div class="filters-meta">
      <div class="filter">
        <label class="filter-label" for="status-filter">Filter by Status:</label>
        <select
          id="status-filter"
          :value="statusFilter"
          @input="changeStatusFilter"
          class="custom-select"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
          <option value="favorites">Favorites</option>
        </select>
      </div>
      <div class="filter">
        <label class="filter-label" for="user-filter">Filter by User ID:</label>
        <select
          id="user-filter"
          :value="userFilter"
          @input="changeUserFilter"
          class="custom-select"
        >
          <option value="all">All Users</option>
          <option v-for="userId in userIds" :key="userId" :value="userId">
            {{ userId }}
          </option>
        </select>
      </div>
      <div class="filter search-filter">
        <label class="filter-label" for="custom-input">Search by Title:</label>
        <input
          type="text"
          id="custom-input"
          :value="searchQuery"
          @input="changeSearchQuery"
          placeholder="Enter title..."
          class="custom-input"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue';
import { useTodosStore } from '@/stores/todos.ts';

const props = defineProps<{
  statusFilter: string;
  userFilter: string;
  searchQuery: string;
  userIds: number[];
}>();

const emits = defineEmits(['changeStatusFilter', 'changeUserFilter', 'changeSearchQuery']);

const changeStatusFilter = (e: Event) => {
  emits('changeStatusFilter', (e.target as HTMLInputElement).value);
};
const changeUserFilter = (e: Event) => {
  emits('changeUserFilter', (e.target as HTMLInputElement).value);
};
const changeSearchQuery = (e: Event) => {
  emits('changeSearchQuery', (e.target as HTMLInputElement).value);
};
</script>

<style lang="scss">
.filters {
  display: flex;
  min-height: 84px;
  justify-content: space-between;
  align-items: center;
  &-meta {
    display: flex;
    gap: 20px;
    width: 100%;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  &-meta {
    width: 80%;
  }

  & .filter {
    display: flex;
    flex-direction: column;
    &:last-child {
      width: 300px;
    }
    &-label {
      font-size: 14px;
    }
  }
}
</style>
