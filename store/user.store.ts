// @ts-ignore
import {defineStore} from 'pinia';
import http from '@/http/http';
export const userStore = defineStore({
    id: 'user',
    state:() =>{
        return {
            isLoggedIn: false,
            token: ''
        }
    },
    actions: {
        logOut(){
            localStorage.removeItem('token');
            this.$patch({isLoggedIn: false, token: ''})
        },
        setToken(token: string){
            this.$patch({isLoggedIn: true, token: token});
        },
        async authenticate(){
             await http.get('/users/authenticate').then(()=>{
                this.$state.isLoggedIn = true;
            }).catch(()=>{
                this.$state.isLoggedIn = false;
                localStorage.removeItem('token');
            });
        }

    },
    getters: {
        token:(state)=>{
            return state.token;
        }
    }

})