<template>
    <USelectMenu size="xl"  v-model="state"   :options="options" option-attribute="text" value-attribute="value" multiple placeholder="Select people" />
  <button @click="recipientsModal=!recipientsModal">+Add person to recipients list</button>

  <UModal v-model="recipientsModal" :overlay="false" >
    <div class="modal">
      <div class="title">
        Add Recipient
      </div>
      <input v-model="recipientInput">
      <button @click="addRecipient">Add recipient</button>
      <button style="float:right" @click="recipientsModal=!recipientsModal">Close</button>
    </div>
  </UModal>
  {{comp}}
</template>

<script>
import http from '@/http/http';
export default {
  emits: ['recipientsChanged'],
  setup(props,{emit}) {
    const options =  ref([]);
    const state = ref([]);
    const recipientsModal = ref(false);
    const recipientInput = ref('');

    watch(state,()=>{
      emit('recipientsChanged', state.value)
    })
    return {
      options,
      state,
      data: [],
      recipientInput,
      recipientsModal
    }
  },
 async mounted() {
   await this.getRecipients();
  },
  methods: {
    async addRecipient(){
      await http.post('users/recipient', {data: {email: this.recipientInput}}).then((c)=>{
        const {data} = c;
        this.options.push({value: data._id, text: data.email });
      }).catch((e)=>{
        console.log(e)
      })
    },
    async getRecipients(){
      await http.get('users/recipient').then((c)=>{
        this.options = c.data.map((rec)=>{
          return{
            text: rec.email,
            value: rec._id
          }
        })
      }).catch(()=>{
      })
    },
  }
}

</script>

<style lang="scss" scoped>
.modal {
  min-height: 150px;
  padding: 20px;


  input {
    width: 100%;
    height: 40px;
    font-size:1.5rem;
    padding-inline: 10px 10px;

  }

  .title {
    font-size: 2rem;
    margin-bottom: 10px;
    font-weight: bold;
  }

}

button {
  border: none;
  outline: none;
  color: black;
  background-color: unset;
  width: fit-content;
  text-transform: uppercase;
  font-weight: 800;
  cursor: pointer;
  font-size: 1.5rem;
  margin-top: 10px;
}
</style>