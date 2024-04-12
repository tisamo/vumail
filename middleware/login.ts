import {userStore} from "~/store/user.store.js";
import {navigateTo} from "#app";

export default defineNuxtRouteMiddleware((to, from) => {
    const token = localStorage.getItem('token');
    if(token && (!userStore().token || !userStore().token.length)){
        userStore().setToken(token);
    }
    if(userStore().isLoggedIn){
        return navigateTo('/');
    }


})