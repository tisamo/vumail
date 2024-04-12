import {userStore} from "~/store/user.store.js";

export default defineNuxtRouteMiddleware(async (to) => {
    await  userStore().authenticate();
    if(!userStore().isLoggedIn && to.name!== 'login'){
        return navigateTo('/login');
    }



})