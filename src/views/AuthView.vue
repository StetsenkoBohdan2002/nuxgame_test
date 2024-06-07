<template>
  <div class="auth">
    <div class="container">
      <div class="auth-wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.auth {
  min-height: 100vh;
  background: linear-gradient(-45deg, #4facfe, #00f2fe);
  display: flex;
  justify-content: center;
  align-items: center;

  &-wrapper {
    min-height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-form {
    width: 400px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);

    &__title {
      margin-bottom: 1.5rem;
      text-align: center;
      font-size: 1.7rem;
      font-weight: 600;
      color: #333;
    }

    &__form {
      display: flex;
      flex-direction: column;

      &-group {
        margin-bottom: 1.2rem;

        &:nth-child(2) {
          margin-bottom: 0;
        }
      }

      &-label {
        margin-bottom: 0.5rem;
        display: block;
        font-weight: 500;
        color: #333333;
      }

      &-input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        transition:
          border-color 0.3s,
          box-shadow 0.3s;

        &:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }
        &:focus-visible {
          outline: none;
          outline-offset: none;
        }
      }

      &-error {
        color: #e5243e;
        font-size: 0.75rem;
        margin-top: 0.25rem;
        display: block;
      }

      &-button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        font-size: 18px;
        text-transform: uppercase;
        font-weight: 500;
        margin-top: 40px;
        cursor: pointer;
        transition:
          background-color 0.15s,
          box-shadow 0.15s,
          transform 0.15s;

        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        &:hover {
          background-color: #0056b3;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transform: translateY(-2px); 
        }

        outline: none;
        border: none;

        &:active {
          transform: translateY(0); 
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}
</style>
