<!-- TextInput.vue -->
<template>
  <h1 v-if="title">{{ title }}</h1>
  <div class="inputs">
    <div v-for="(input, index) in formInputs" :key="index">
      <div v-if="input.type === 'text' || input.type === 'email' || input.type === 'password'">
        <div>
          <label :for="input.name">{{ input.name }}</label>
        </div>
        <input :type="input.type" :id="input.name" v-model="state[input.fieldName]" @input="markAsDirty(input.name)">
      </div>
      <div v-if="input.type === 'date'">
        <div>
          <label :for="input.name">{{ input.name }}</label>
          <input :type="input.type" :id="input.name" v-model="state[input.fieldName]" @input="markAsDirty(input.name)">
        </div>
      </div>
      <div v-if="input.type==='multi-date'">
        <label :for="input.name">{{ input.name }}</label>
        <VueDatePicker v-model="state[input.fieldName]"  placeholder="Choose the date"  multi-dates />
      </div>
      <div v-if="input.type === 'editor'">
        <label :for="input.name">{{ input.name }}</label>
        <div>
          <div id="editor" v-if="editors[input.editorIndex]">
            <button
                @click="editors[input.editorIndex].chain().focus().toggleBold().run()"
                :disabled="!editors[input.editorIndex].can().chain().focus().toggleBold().run()"
                :class="{ 'is-active': editors[input.editorIndex].isActive('bold') }"
            >
              bold
            </button>
            <button
                @click="editors[input.editorIndex].chain().focus().toggleItalic().run()"
                :disabled="!editors[input.editorIndex].can().chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editors[input.editorIndex].isActive('italic') }"
            >
              italic
            </button>
            <button
                @click="editors[input.editorIndex].chain().focus().toggleStrike().run()"
                :disabled="!editors[input.editorIndex].can().chain().focus().toggleStrike().run()"
                :class="{ 'is-active': editors[input.editorIndex].isActive('strike') }"
            >
              strike
            </button>
            <button
                @click="editors[input.editorIndex].chain().focus().toggleCode().run()"
                :disabled="!editors[input.editorIndex].can().chain().focus().toggleCode().run()"
                :class="{ 'is-active': editors[input.editorIndex].isActive('code') }"
            >
              code
            </button>
            <button @click="editors[input.editorIndex].chain().focus().unsetAllMarks().run()">
              clear marks
            </button>
            <button @click="editors[input.editorIndex].chain().focus().clearNodes().run()">
              clear nodes
            </button>
            <button
                @click="editors[input.editorIndex].chain().focus().setParagraph().run()"
                :class="{ 'is-active': editors[input.editorIndex].isActive('paragraph') }"
            >
              paragraph
            </button>
            <button
                @click="editors[input.editorIndex].chain().focus().toggleHeading({ level: 1 }).run()"
                :class="{ 'is-active': editors[input.editorIndex].isActive('heading', { level: 1 }) }"
            >
              h1
            </button>
            <button
                @click="editors[input.editorIndex].chain().focus().toggleHeading({ level: 2 }).run()"
                :class="{ 'is-active': editors[input.editorIndex].isActive('heading', { level: 2 }) }"
            >
              h2
            </button>
            <button
                @click="editors[input.editorIndex].chain().focus().toggleHeading({ level: 3 }).run()"
                :class="{ 'is-active': editors[input.editorIndex].isActive('heading', { level: 3 }) }"
            >
              h3
            </button>
            <button
                @click="editors[input.editorIndex].chain().focus().toggleHeading({ level: 4 }).run()"
                :class="{ 'is-active': editors[input.editorIndex].isActive('heading', { level: 4 }) }"
            >
              h4
            </button>
            <button
                @click="editors[input.editorIndex].chain().focus().toggleHeading({ level: 5 }).run()"
                :class="{ 'is-active': editors[input.editorIndex].isActive('heading', { level: 5 }) }"
            >
              h5
            </button>
            <button
                @click="editors[input.editorIndex].chain().focus().toggleHeading({ level: 6 }).run()"
                :class="{ 'is-active': editors[input.editorIndex].isActive('heading', { level: 6 }) }"
            >
              h6
            </button>
            <button
                @click="editors[input.editorIndex].chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editors[input.editorIndex].isActive('bulletList') }"
            >
              bullet list
            </button>
            <button
                @click="editors[input.editorIndex].chain().focus().toggleOrderedList().run()"
                :class="{ 'is-active': editors[input.editorIndex].isActive('orderedList') }"
            >
              ordered list
            </button>
            <button
                @click="editors[input.editorIndex].chain().focus().toggleCodeBlock().run()"
                :class="{ 'is-active': editors[input.editorIndex].isActive('codeBlock') }"
            >
              code block
            </button>
            <button
                @click="editors[input.editorIndex].chain().focus().toggleBlockquote().run()"
                :class="{ 'is-active': editors[input.editorIndex].isActive('blockquote') }"
            >
              blockquote
            </button>
            <button @click="editors[input.editorIndex].chain().focus().setHorizontalRule().run()">
              horizontal rule
            </button>
            <button @click="editors[input.editorIndex].chain().focus().setHardBreak().run()">
              hard break
            </button>
            <button
                @click="editors[input.editorIndex].chain().focus().undo().run()"
                :disabled="!editors[input.editorIndex].can().chain().focus().undo().run()"
            >
              undo
            </button>
            <button
                @click="editors[input.editorIndex].chain().focus().redo().run()"
                :disabled="!editors[input.editorIndex].can().chain().focus().redo().run()"
            >
              redo
            </button>
          </div>

          <TiptapEditorContent class="content" :id="editors[input.editorIndex]"  :editor="editors[input.editorIndex]" v-model="state[input.fieldName]" @input="markAsDirty(input.fieldName, input.editorIndex)" />
        </div>
    <!--<textarea id="editable" :name="input.name" v-model="state[input.fieldName]" @input="markAsDirty(input.name)"></textarea>-->
      </div>

      <div v-if="input.type === 'recipients'">
        <label :for="input.name">{{ input.name }}</label>
        <Recipient @recipientsChanged="updateRecipients(input.fieldName, $event)"/>
      </div>
      <div class="errors" v-if="v$[input.fieldName].$errors.length">
      <span v-for="(err, index) in v$[input.fieldName].$errors" :key="index">
          {{ err.$message }}
        </span>
      </div>
    </div>
  </div>
  <button class="action"  @click="submitForm" @keydown.enter="submitForm" :disabled="v$.$invalid">{{ button }}</button>

</template>
<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import useVuelidate from "@vuelidate/core";
import {required, email, minLength} from '@vuelidate/validators';
import '../scss/breakpoints.scss';
import {Paragraph} from "@tiptap/extension-paragraph";

export default {
  components:{
    VueDatePicker,
  },
  props: {
    formInputs: {
      type: Array,
      default: [
        {
          name: 'title',
          fieldName: 'title',
          type: 'text',
          validators: ['required', 'minLength'],
          value: '',
          editorIndex: 0
        },
        {
          name: 'body',
          fieldName: 'body',
          type: 'textarea',
          validators: ['required', 'minLength'],
          value: '',
          editorIndex: 1
        },
      ]
    },
    title: {
      type: String,
      required: false
    },
    button: {
      type: String,
      required: false,
      default: 'Create'
    }
  },
  setup(props) {
    const options = [];
    const lowlight = TiptapcreateLowlight(Tiptapcommon);
    const editors = [];
    const editorRef = ref('');
    const validationObj = {};
    const form = {};
    const recipientInput = ref('')
    const recipientsModal = ref(false);
    props.formInputs.forEach((f, index) => {
      form[f.fieldName] = f.value;
      validationObj[f.fieldName] = {};
      if(f.type === 'editor'){
        const editor = new TiptapEditor({
          injectCSS: true,
          onUpdate: (ed) => {
            editorRef.value = ed.editor.getHTML();
          },
          content: '',
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
        editors.push(editor);
      }
      if (f.validators.length) {
        for(let i in f.validators){
          switch (f.validators[i]){
            case 'required':
              validationObj[f.fieldName][f.validators[i]] = required;
              break;
            case 'minLength':
              validationObj[f.fieldName][f.validators[i]] = minLength(10);
              break;
          }
        }
      }
      if (f.type === 'email') {
        validationObj[f.fieldName].email = email;
      }
    })
  const state = reactive(form);
    const rules = computed(() => {
      return validationObj;
    })

    const v$ = useVuelidate(rules, state);
    const updateState = (prop, newVal)=>{
      state[prop] = newVal;
    };
    const setTemplate = (title, body) =>{
      const editorIndex = props.formInputs.find((f)=> f.fieldName === 'body').editorIndex;
      if(editorIndex > -1 && editorIndex!== undefined){
        editors[editorIndex].commands.setContent(body);
        v$['body'].$touch();
      }
      state['title'] =  title;
    };
    return {
      editors,
      options,
      updateState,
      setTemplate,
      recipientsModal,
      recipientInput,
      state, v$
    }
  },
  methods: {
    updateRecipients(fieldName, recipients){
      this.updateState(fieldName, recipients);
      this.v$[fieldName].$touch();
    },
    markAsDirty( fieldName, editorIndex) {
      if(editorIndex!== undefined){
        setTimeout(()=>{
          this.updateState(fieldName, this.editors[editorIndex].getHTML());
        });
      }
      if(!this.v$[fieldName]) return;
      this.v$[fieldName].$touch();
    },
    setTemplate(body, title){
      this.updateState('body', body)
      this.updateState('title', title)
    },
    submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.$emit('form-submitted',this.state);
      } else {
        alert('form invalid')
      }
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<!-- Add scoped styles if needed -->
<style lang="scss" scoped>
@import "../assets/scss/breakpoints.scss";

h1 {
  padding: 20px;
  background-color: black;
  text-transform: uppercase;
  color: white;
  font-weight: 800;
  width: 100%;
}

.inputs {
  display: flex;
  row-gap: 20px;
  flex-direction: column;
}

input {
  width: 92%;
  height: 40px;
  padding: 10px;
  font-size: 20px;
  margin-top: 10px;
  border: 2px black solid;
}

label {
  font-size: 25px;
  font-weight: 800;
  margin-bottom: 100px;
  text-transform: capitalize;

}

textarea {
  margin-top: 10px;
  min-height: 600px;
  width: 100%;
  padding-block: 10px 10px;
  @include smaller(md){
    min-height: 300px;
  }
}

.action {
  border: none;
  outline: none;
  color: black;
  margin-top:20px;
  background-color: unset;
  width: fit-content;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 30px;
  cursor: pointer;
  &:disabled{
    opacity: 0.1;
  }
  &--xs{
    font-size: 1.5rem;
    margin-top:10px;
  }
}

.errors{
  display: flex;
  column-gap: 10px;
  color: red;
  font-weight: 800;
  font-size: 16px;
  margin-top:10px;
}
#editor{
  display: flex;
  column-gap: 10px;
  flex-wrap: wrap;
  row-gap: 20px;
  margin-bottom: 20px;
  margin-top:20px;
  button{
   font-weight: bold;
    font-size: 1.5rem;
    padding: 10px 10px;
    border: 3px solid black;
  }
}

.content{
  border: 3px solid black;
  font-size: 1.5rem;
}
.modal{
  min-height: 150px;
  padding: 20px;
  input{
    width: 100%;
  }
  .title{
    font-size: 2rem;
    font-weight: bold;
  }
}

/* Add your component-specific styles here */
</style>
