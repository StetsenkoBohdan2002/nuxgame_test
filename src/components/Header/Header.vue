<template>
  <header class="header">
    <div class="container">
      <div class="header-wrapper">
        <div class="header-wrapper__meta">
          <RouterLink to="/" class="header__logo">Logo</RouterLink>
        </div>
        <div class="header-wrapper__func" @click="openSidebar">
          <img
            class="icon header-wrapper__func_user"
            src="@/assets/icons/user-icon.svg"
            alt="User icon"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import emitter from '@/eventBus.ts';

const openSidebar = () => {
  emitter.emit('toggle-sidebar');
};
</script>

<style scoped lang="scss">
.header {
  height: 7vh;
  min-height: 7vh;
  background-color: #4facfe;
  color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  &-wrapper {
    display: flex;
    align-items: center;
    min-height: inherit;
    justify-content: space-between;
    &__func {
      display: flex;
      align-items: center;
      &_user {
        background-color: #eaeaea43;
        padding: 7px;
        border-radius: 50%;
        cursor: pointer;
        height: 40px;
        width: 40px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        transition: transform 0.15s ease-in-out;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
  &__logo {
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: bold;
    color: #ffffff;
    text-decoration: none;
  }
}
</style>
