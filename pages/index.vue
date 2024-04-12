<template>
  <section>
    <TemplateCard v-for="(c, index) in templateCards"  :key="index" :cardData="c"/>
  </section>
</template>

<script>


definePageMeta({
  middleware: ['auth'],
});
export default {

  setup() {
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
      templateCards
    }
  }
}
</script>

<style lang="scss" scoped>
 section{
   display: grid;
   grid-template-columns: 1fr 1fr 1fr;
   justify-content: space-around;
   justify-items: center;
 }

</style>