<template>
  <main>
    <Header v-if="isLoggedIn"/>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
    <UModals />

  </main>
</template>

<script>
import { userStore } from '@/store/user.store.ts'

export default {

  setup(){
    const store = userStore();
    const {isLoggedIn} = storeToRefs(store);
    return{
      isLoggedIn
    }

  }

}


</script>

<style lang="scss" >
@import "assets/scss/breakpoints";
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}


main{
  max-width: 1600px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  @include smaller(md){
    padding-inline: 20px 20px;
  }
}


</style>