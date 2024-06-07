import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { Ref } from 'vue';
import type { User } from '@/types/User.type';
import { useTodosStore } from './todos';

export const useAuthStore = defineStore('auth', () => {
  const { resetTodos } = useTodosStore();
  const router = useRouter();
  const isAuth = ref<boolean>(false);
  const userData = ref<User>(populateUserDataFromStorage());

  function signInUser(data: User) {
    userData.value = data;
    isAuth.value = true;
    localStorage['userData'] = JSON.stringify(userData.value);
    populateUserDataFromStorage();
  }

  function logoutUser() {
    userData.value = {} as User;
    isAuth.value = false;
    localStorage.removeItem('userData');
    resetTodos();
    router.push({ name: 'signin' });
  }

  function populateUserDataFromStorage(): User {
    if (localStorage['userData']) {
      isAuth.value = true;
      return JSON.parse(localStorage['userData']);
    } else {
      return {} as User;
    }
  }

  const getAuthStatus = computed<Ref<boolean>>(() => isAuth);
  const getUserData = computed<Ref<User>>(() => userData);

  return { userData, getAuthStatus, getUserData, signInUser, logoutUser };
});
