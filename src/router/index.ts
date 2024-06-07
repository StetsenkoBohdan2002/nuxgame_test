import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '@/views/AuthView.vue';
import SignIn from '@/components/Auth/SignIn.vue';
import HomeView from '@/views/HomeView.vue';
import { useAuthStore } from '@/stores/auth.ts';
import  Error  from '@/views/Error.vue';
import { pinia } from '@/main.ts';

const routes = [
  {
    path: '/',
    component: HomeView,
    name: 'home'
  },
  { path: '/:pathMatch(.*)*', name: 'error', component: Error },
  {
    path: '/auth',
    component: AuthView,
    children: [
      {
        path: 'signin',
        name: 'signin',
        component: SignIn
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to) => {
  const { getAuthStatus } = useAuthStore(pinia);
  if (!getAuthStatus.value && to.name !== 'signin') {
    return { name: 'signin' };
  } else if (getAuthStatus.value && to.name === 'signin') {
    return { name: 'home' };
  }
});

export default router;
