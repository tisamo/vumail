<template>
  <header>
 <nav>
   <ul>
     <li><nuxt-link to="/">Home</nuxt-link></li>
     <li><nuxt-link to="emails">Emails</nuxt-link></li>
     <li><nuxt-link to="about">About</nuxt-link></li>
     <li><nuxt-link @click="logOut">LogOut</nuxt-link></li>
   </ul>
 </nav>
  </header>
</template>

<script>
import {userStore} from "@/store/user.store.ts";


export default {
methods:{
  logOut(){
    userStore().logOut();
    navigateTo('/login');
  }
}
}
</script>

<style lang="scss" scoped>
  @import "assets/scss/breakpoints";
  header{
    margin-bottom: 20px;
  }
  nav{
    border-bottom: 5px black solid;
    padding-bottom: 10px;
    ul{
      padding: unset;
      margin: 20px 0 0 0;
      list-style: none;
      font-size: 3rem;
      column-gap: 50px;
      @include smaller(md){
        column-gap: 40px;
        font-size: 2rem;
      }
      @include smaller(sm){
        column-gap: 25px;
        font-size: 1.5rem;
      }

      font-weight: 700;
      text-transform: capitalize;
      display: flex;

      li{
        cursor: pointer;
        &:last-child{
          margin-left: auto;
        }
      }
    }

    a{
      text-decoration: none;
      color: black;
    }

  }
</style>