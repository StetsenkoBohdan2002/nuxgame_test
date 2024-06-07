<script setup lang="ts">
import Header from '@/components/Header/Header.vue';
import Spinner from '@/components/Spinner/Spinner.vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/auth.ts';
import Sidebar from '@/components/Sidebar/Sidebar.vue';

const { getAuthStatus, getUserData } = useAuthStore();
</script>

<template>
  <div class="app-wrapper">
    <Header v-if="getAuthStatus" />
    <RouterView />
    <Spinner />
    <notifications class="notification" width="400" position="bottom right" />
    <Sidebar :userData="getUserData" />
  </div>
</template>

<style lang="scss">

.notification .notification-title {
  font-size: 20px;
  text-transform: uppercase;
}
.notification .notification-content {
  font-size: 16px;
}

.notification .vue-notification-template {
  border-radius: 5px;
  border-left-width: 10px;
}

.notification .vue-notification-template.error {
  background: #e54258;
  border-color: #b22235;
}
.notification .vue-notification-template.success {
  border-color: #08ab6d;
  background: #0dd488;
}
</style>
