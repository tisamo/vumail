<template>
  <div>
    <div class="head">
      <h1>Scheduled Emails</h1>    <div class="write-mail"><nuxt-link to="/email">Write Email</nuxt-link></div>
    </div>
    <section>
      <TemplateCard v-for="(c, index) in tasks"  :key="index" :cardData="c"/>
    </section>
  </div>
</template>

<script >
import http from '@/http/http.js';
definePageMeta({
  middleware: ['auth'],
});
export default {
  setup() {
    const tasks = ref([]);
    const templateCards = [{
      name: 'template',
      subject: 'card'
    },
      {
        name: 'template',
        subject: 'card'
      },
      {
        name: 'template',
        subject: 'card'
      },];

    return {
      templateCards,
      tasks
    }
  },
  mounted() {
    this.getTasks();
  },
  methods:{
   async getTasks(){
     await http.get('/tasks').then((res)=>{
       this.tasks = res.data.map((t)=>{
         return{
           id: t._id,
           name: t.body,
           subject: t.title
         }
       });
     }).catch((err)=>{
       console.log(err);
     })
    }

  },
}
</script>

<style lang="scss" scoped>
.head{
  display: flex;
  align-items: center;
  .write-mail{
    font-weight: bold;
    font-size:3rem;
    margin-left: auto;
  }
}

section{
  display: flex;
  margin-top: 20px;
  row-gap: 50px;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>