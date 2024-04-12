<template>
  <div class="login-screen">
    <div class="login">
      <div class="title">
        {{title}}
      </div>
      <DynamicForm v-if="isLogin" :form-inputs="loginForm" @form-submitted="login" :button="'login'"/>
      <DynamicForm v-else :form-inputs="registerForm" @form-submitted="register" :button="'create user'"/>
      <div class="register-text" v-if="isLogin" @click="isLogin=!isLogin">Don't have accont? Register</div>
      <div class="register-text" v-else @click="isLogin=!isLogin">Back to login</div>
    </div>
    <section class="image-section">
      <img src="assets/images/home.jpg">
    </section>
  </div>
  <UModal v-model="isModalOpen" :overlay="false" >
    <div class="modal">
      {{modalText}}
    </div>
  </UModal>

</template>

<script setup lang="ts">
import type {Login} from "~/interfaces/user/user-actions.js";
import {userStore} from "~/store/user.store.js";
import type {DynamicForm} from "~/interfaces/dynamic-form.js";
import http from '@/http/http';

definePageMeta({
  middleware: ['login'],
});


const store = userStore();
const {isLoggedIn} = storeToRefs(store);
const config = useRuntimeConfig();
const isLogin = ref(true);
const title = computed(() => {
  return isLogin.value ? 'Sign In' : 'Sign Up'
});
const isModalOpen = ref(false);
const modalText = ref('Sikeres regisztráció');

const loginForm: DynamicForm[] = [
  {
    name: 'login',
    type: 'text',
    fieldName: 'username',
    validators: ['required'],
    value: ''
  },
  {
    name: 'password',
    type: 'password',
    fieldName: 'password',
    validators: ['required'],
    value: ''
  },
]
const registerForm = [
  {
    name: 'username',
    type: 'text',
    fieldName: 'username',
    validators: ['required'],
    value: ''
  },
  {
    name: 'password',
    type: 'password',
    fieldName: 'password',
    validators: ['required'],
    value: ''
  },
];


async function login(emittedValue: Login) {
  await http.post('/users/login', {
    data: emittedValue,
  }).then(async (res)=>{
    isLoggedIn.value = true;
    localStorage.setItem('token', res.data);
    await navigateTo('/')
  }).catch((e) => {
    modalText.value = 'Wrong password or username';
    isModalOpen.value = true;
    setTimeout(()=>{
      isModalOpen.value = false;
    }, 3000);
  }).finally(()=>{

  })
}

async function register(emittedValue: Login) {
  await http.post( '/users/create', {
    data: emittedValue
  }).then(() => {
    isLogin.value = true;
    modalText.value = 'Sikeres regisztráció';
  }).catch((e) => {
    modalText.value = 'Felhasználónév foglalt';
  }).finally(()=>{
    isModalOpen.value = true;
    setTimeout(()=>{
      isModalOpen.value = false;
    }, 3000);
  })

}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/breakpoints.scss";

.login-screen {
  display: flex;
  height: 80%;
  justify-content: center;
  align-items: center;
  @include smaller(md) {
    flex-direction: column-reverse;
    padding-inline: 20px 10px;
  }
  .login {
    flex: 2;
    @include smaller(md) {
      width: 100%;
    }
    max-width: 800px;

    .title {
      font-size: 4rem;
      font-weight: 800;
      margin-block: 75px;
    }

    .register-text {
      margin-top: 30px;
      text-align: center;
      font-weight: 600;
      font-size: 2rem;
      cursor: pointer;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
}

.image-section {
  width: 50%;
  flex: 3;
  @include smaller(md) {
    display: none;
  }



  img {
    width: 100%;
    object-fit: cover;

  }
}
.modal{
  padding: 20px 40px;
  font-weight: bold;
  font-size:1.5rem;
  text-align: center;
}

</style>