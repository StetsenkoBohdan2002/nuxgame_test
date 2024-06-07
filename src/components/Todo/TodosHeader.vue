<template>
  <div class="todos-header">
    <div class="todos-cell todos-user-id">User Id</div>
    <div class="todos-cell todos-id">ID</div>
    <div class="todos-cell todos-title">Title</div>
    <div class="todos-cell todos-completed">Completed</div>
    <div class="todos-cell empty"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.todos {
  &-header {
    height: 48px;
    background-color: #f2f2f2;
    font-weight: bold;
    display: flex;
    border-bottom: 1px solid #ddd;

    .todos-cell {
      text-align: left;
      padding: 12px;

      &.todos-id {
        width: 50px;
      }

      &.todos-user-id {
        width: 80px;
      }

      &.todos-title {
        flex-grow: 1;
      }

      &.todos-completed {
        width: 100px;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &.empty {
        min-width: 50px;
      }
    }
  }
}

@media screen and (max-width: 560px) {
  .todos-header {
    font-size: 12px;
  }
  .todos-header .todos-cell.todos-user-id {
    min-width: 70px;
    max-width: 70px;
  }
  .todos-header .todos-cell.empty {
    min-width: 40px;
    max-width: 40px;
  }
  .todos-header .todos-cell.todos-completed {
    width: 60px;
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
