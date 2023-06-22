<script>
import ButtonVue from './ButtonVue.vue';

export default {
    name: "HeaderVue",
    
    props: {
        view: {
            type: String,
            required: true,
            default: 'list',
        },
    },
    methods: {

        goToProductAdd() {
            this.$router.push('/addproduct')
        },

        goToProductList() {
            this.$router.push('/')
        }
    },    
    components: { ButtonVue },
    
}
</script>

<template>
    <header>
        <div id="header">
            <div v-if="view === 'list'">
                <h1>Product List</h1>
            </div>
            <div v-if="view === 'add'">
                <h1>Product Add</h1>
            </div>

            <div id="container">
                <ButtonVue v-if="view === 'list'" @click.prevent="goToProductAdd" label="ADD"/>
                <ButtonVue v-if="view === 'list'" @click.prevent="$emit('button-clicked')" label="MASS DELETE" id="delete-product-btn"/>
                <ButtonVue v-if="view === 'add'" @click.prevent="$emit('button-clicked')" label="Save"/>
                <ButtonVue v-if="view === 'add'" @click.prevent="goToProductList" label="Cancel"/>
            </div>
        </div>
    </header>
</template>

<style lang="sass" scoped>
@import '../assets/sass/variables'

header
    background-color: #fff
    padding: 0 1.5rem

    #header
        height: 15vh
        display: flex
        align-items: center
        justify-content: space-between
        color: $secondary-color
        background-color: $primary-color
        padding: 2rem 1.5rem 0 0.5rem
        width: 100%
        border-bottom: 3px solid $secondary-color

    #container
        display: flex
        gap: 20px
        padding-bottom: 1rem 
        
</style>
