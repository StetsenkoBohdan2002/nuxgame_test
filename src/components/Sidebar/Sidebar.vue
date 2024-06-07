<template>
  <div
    ref="sidebarRef"
    v-if="userData"
    :class="['sidebar', { 'sidebar--open': isOpen }]"
    v-click-outside="handleClickOutside"
  >
    <div>
      <div class="sidebar__user-info">
        <h3>{{ userData.name }}</h3>
        <p class="sidebar__user-email">{{ userData.email }}</p>
      </div>
      <div class="sidebar__divider"></div>
      <div class="sidebar__user-details">
        <h4 class="sidebar__section-title">User Details</h4>
        <ul class="sidebar__details-list">
          <li><strong>ID:</strong> {{ userData.id }}</li>
          <li><strong>Website:</strong> {{ userData.website }}</li>
          <li><strong>Phone:</strong> {{ userData.phone }}</li>
        </ul>
      </div>
      <div class="sidebar__divider"></div>
      <div class="sidebar__company-info" v-if="userData.company">
        <h4 class="sidebar__section-title">Company</h4>
        <p><strong>Name:</strong> {{ userData.company.name }}</p>
        <p><strong>Catch Phrase:</strong> {{ userData.company.catchPhrase }}</p>
        <p><strong>Business:</strong> {{ userData.company.bs }}</p>
      </div>
    </div>
    <button class="sidebar__logout-button" @click="handleLogout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps, Ref } from 'vue';
import emitter from '@/eventBus';
import { useAuthStore } from '@/stores/auth.ts';
import type { User } from '@/types/User.type';
const { logoutUser } = useAuthStore();

const props = defineProps<{
  userData: User;
}>();

const sidebarRef: Ref<HTMLElement | null> = ref(null);
const isOpen: Ref<boolean> = ref(false);
let isOpenByEventBus: boolean = false;

const handleToggleSidebar = (): void => {
  isOpen.value = !isOpen.value;
  isOpenByEventBus = true;
};

const handleLogout = (): void => {
  logoutUser();
  isOpen.value = !isOpen.value;
  isOpenByEventBus = true;
};

const handleClickOutside = (): void => {
  if (!isOpenByEventBus) {
    isOpen.value = false;
  }
  isOpenByEventBus = false;
};

onMounted(() => {
  emitter.on('toggle-sidebar', handleToggleSidebar);
});
</script>

<style lang="scss">
.sidebar {
  &__user-info,
  &__user-details,
  &__company-info {
    padding: 20px;
    color: rgb(0, 0, 0);
  }
  &__logout-button {
    padding: 10px 0;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 14px;
    margin: 0 20px;
    width: 85%;
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

  &__user-email {
    font-size: 14px;
    opacity: 0.7;
  }

  &__divider {
    height: 1px;
    background-color: rgba(61, 61, 61, 0.2);
    margin: 20px 0;
  }

  &__user-details,
  &__company-info {
    .sidebar__section-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }
  }

  &__user-details {
    .sidebar__details-list {
      padding-left: 0;
      list-style-type: none;
    }

    li {
      margin-bottom: 5px;
    }

    strong {
      margin-right: 5px;
    }
  }

  position: absolute;
  top: 0;
  margin-top: 7vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: -400px; 
  width: 300px;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  color: white;
  transition: left 0.3s ease;

  &--open {
    left: 0; 
  }
}
</style>
