<template>
  <div class="not-found">
    <h1 class="not-found__title">404 - Page Not Found</h1>
    <p class="not-found__message">Oops! The page you are looking for does not exist.</p>
    <RouterLink to="/" class="not-found__link">Go to Home Page</RouterLink>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.not-found {
  text-align: center;
  margin-top: 50px;

  &__title {
    font-size: 2rem;
    color: #333;
  }

  &__message {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 20px;
  }

  &__link {
    font-size: 1.1rem;
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
