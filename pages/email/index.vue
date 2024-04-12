<template>
  <div class="cont">
    <div class="templates">
      <h1>Templates</h1>
      <div class="cards">
        <div class="card" v-for="template in templates" @click="selectTemplate(template.body, template.title)">
          {{template.title}}
        </div>
      </div>

    </div>
  </div>
    <div class="form">
      <h1>Email Scheduler</h1>
      <DynamicForm ref="formRef"  :form-inputs="emailTemplate" @form-submitted="login" button="Schedule Email"/>
      <UModal v-model="emailSent">
         <div class="modal">
           <h1>
             Email Scheduled Succesfully!
           </h1>
           <button @click="saveEmailTemplate">Save Email Template</button>
           <button @click="emailSent=!emailSent"> Close</button>
         </div>
      </UModal>
    </div>


</template>

<script>
import {Paragraph} from "@tiptap/extension-paragraph";
import DynamicForm from "~/components/DynamicForm.vue";
import http from "~/http/http.js";
const lowlight = TiptapcreateLowlight(Tiptapcommon);

const editor = useEditor({
  injectCSS: true,
  extensions: [
    TiptapStarterKit.configure({
      codeBlock: false,
    }),
    TiptapCodeBlockLowlight.configure({
      lowlight,
    }),
    Paragraph,
  ],
});
export default {
  components:{
    DynamicForm,
  },
  setup() {
    const formRef = ref();
    const emailSent = ref(false);
    const emailLoad = ref(null);
    const templates = ref([]);
    const emailTemplate =  [
      {
        name: 'Date',
        fieldName: 'dates',
        type: 'multi-date',
        validators: ['required'],
        value: [],
        editorIndex: 0
      },
      {
        name: 'Recipients',
        fieldName: 'recipients',
        type: 'recipients',
        validators: ['required'],
        value: [],
      },
      {
        name: 'title',
        fieldName: 'title',
        type: 'text',
        validators: ['required', 'minLength'],
        value: '421412',
      },
      {
        name: 'Message',
        fieldName: 'body',
        type: 'editor',
        validators: ['required'],
        value: '',
        editorIndex: 0
      },
    ];
    return {
      emailTemplate,
      emailSent,
      emailLoad,
      formRef,
      templates
    }
  },
  mounted() {
    this.getTemplates();
  },
  methods:{
    async login(emittedValue) {
      await http.post('/tasks/create', {
        data: emittedValue,
      }).then(async (res)=>{
        this.emailLoad = emittedValue;
        this.emailSent = true;
      })
    },
    async saveEmailTemplate(emittedValue) {
      const {body, title } = this.emailLoad;
      await http.post('/templates', {
        data: {body, title},
      }).then(async (res)=>{
        this.emailSent = true;
        this.emailLoad = ref(null);
      })
    },
    async getTemplates() {
      await http.get('/templates').then(async (res)=>{
        this.templates = res.data.map((r)=>{
          return{
            title: r.title,
            body: r.body,
          }
        });
      })
    },
    selectTemplate(body, title){
      this.$refs.formRef.setTemplate(title, body);
    }
  }
}
</script>

<style lang="scss" scoped>
 @import "scss/breakpoints";
.cont{
  row-gap: 30px;
  display: flex;
  flex-direction: column;
}
.form{
  flex: 2;
}
.templates{
  flex:1;
  flex-direction: column;
  .cards{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    @include smaller(md){
      grid-template-columns: 1fr 1fr;
    }
    @include smaller(sm){
      grid-template-columns: 1fr;
    }
    column-gap: 20px;
    .card{
      height: 200px;
      margin-bottom: 20px;
      width: 100%;
      margin-inline: auto auto;
      cursor:pointer;
      display: flex;
      border: 3px black solid;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
    }

  }
}
.modal{
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 10px;
  justify-content: center;
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
}

</style>