<template>
  <div class="auth-form auth-form--signup">
    <h2 class="auth-form__title">Sign In</h2>
    <form class="auth-form__form" @submit.prevent="handleSubmit">
      <div class="auth-form__form-group">
        <label class="auth-form__form-label" for="username">Username</label>
        <input
          class="auth-form__form-input"
          type="text"
          id="username"
          v-model="username"
          @input="validateUsername"
        />
        <span class="auth-form__form-error" v-if="errors.username">{{ errors.username }}</span>
      </div>

      <div class="auth-form__form-group">
        <label class="auth-form__form-label" for="phone">Phone Number</label>
        <input
          class="auth-form__form-input"
          type="text"
          id="phone"
          v-model="phone"
          @input="validatePhone"
        />
        <span class="auth-form__form-error" v-if="errors.phone">{{ errors.phone }}</span>
      </div>
      <button class="auth-form__form-button" type="submit">Sign In</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { loginUser } from '@/api/API';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.ts';
import { User } from '@/types/User.type.ts';

const { signInUser } = useAuthStore();
const username = ref('');
const phone = ref('');
const errors = ref({
  username: '',
  phone: ''
});

const router = useRouter();

const validateUsername = () => {
  const usernameRegex = /^[A-Za-z]+$/;
  if (!username.value.match(usernameRegex)) {
    errors.value.username = 'Username must contain only letters';
  } else {
    errors.value.username = '';
  }
};

const validatePhone = () => {
  const phoneRegex = /^[0-9xX\s\-\+\(\).]*$/;
  if (!phone.value.match(phoneRegex)) {
    errors.value.phone = 'Phone number contains invalid characters';
  } else {
    errors.value.phone = '';
  }
};

const handleSubmit = async () => {
  validateUsername();
  validatePhone();
  if (!errors.value.username && !errors.value.phone) {
    try {
      const userData = { username: username.value, phone: phone.value };
      const response = await loginUser(userData);
      if (response.status === 200 && response.data?.length > 0) {
        const currentUserList = response.data;
        signInUser(currentUserList[0]);
        router.push({ name: 'home' });
      }
    } catch (error) {
      console.error('Failed to log in user:', error);
      alert('Failed to log in user. Please try again later.');
    }
  }
};
</script>

<style lang="scss"></style>
