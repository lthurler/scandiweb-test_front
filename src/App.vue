<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style lang="sass">
@import './assets/sass/variables'

*
    margin: 0
    padding: 0
    box-sizing: border-box

html
    background-color: $primary-color
  
    main
      position: relative
      background-color: $primary-color
      height: 100vh
      width: 100%

</style>
