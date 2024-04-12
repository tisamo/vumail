<template>
  <div class="card">
    <div class="title">
    {{cardData.name}}
    </div>
    <div>
      {{cardData.subject}}
    </div>
  </div>
</template>

<script>
export default {
  props:{
    cardData:{
      type: Object,
      default:{
        name: '',
        subject: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "assets/scss/breakpoints.scss";
  .card{
    border-radius: 10px;
    border: 3px lightgray solid;
    height: 200px;
    width: 100%;
    max-width: 500px;
    @include smaller(lg){
      max-width: 375px;
    }
    @include smaller(md){
      max-width: 300px;
    }
    @include smaller(sm){
      max-width: unset;
    }
    padding: 10px;
    font-size: 1.5rem;
    .title{
      font-weight: 800;
      font-size: 2rem;
    }
  }
</style>