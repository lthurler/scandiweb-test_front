<script>
export default {
    name: 'ButtonVue',
    
    props: ['label'],    
}
</script>

<template>
    <button>{{label}}</button>    
</template>

<style lang="sass" scoped>
@import '../assets/sass/variables'

button
    padding: .5rem 1rem
    color: $primary-color
    background-color: #c62e2e
    border: none
    box-shadow: 3px 4px $secondary-color
    transition: .5s

    &:hover
        cursor: pointer
        background-color: #48b853
        color: $secondary-color

</style>
