// @ts-ignore
import {defineStore} from 'pinia';

export const useCounterStore = defineStore({
    id: 'templates',
    state:() =>{
        return {
            templates: []
        }
    },
    getters: {
        getTemplates: (state)=>{
            return state.templates;
        },
        findTemplate: (state) =>{
            return (name: string)=> state.templates.find((n)=> n === name)
        },
        removeTemplate: (state) =>{
           return   (index: number)=> state.templates = state.templates.splice(0, index);
        }
    }

})