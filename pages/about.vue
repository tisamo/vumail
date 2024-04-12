<template>
 <section>
   <div>
     <span>Contact:</span> <span>kristof.krasznai95@gmail.com</span>
   </div>

 </section>
</template>

<script>

definePageMeta({
  middleware: ['auth'],
});
export default {

}
</script>

<style lang="scss" scoped>
section{
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  div{
    display: flex;
    column-gap: 30px;
    span{
      font-size:3rem;
      &:first-child{
        font-weight: 800;
      }
    }
  }
}
</style>