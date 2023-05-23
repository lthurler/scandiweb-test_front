<script>

export default {
    name: "FooterVue",    
    
}
</script>

<template>
    <footer>
        <div id="footer">
            <p>Scandiweb Test assignment</p>
        </div>
    </footer>
</template>

<style lang="sass">
@import '../assets/sass/variables'

footer
    height: 10vh
    position: absolute
    bottom: 0
    width: 100%
    padding: 0 1.5rem
    background-color: $primary-color

    #footer
        color: $secondary-color
        background-color: $primary-color
        width: 100%
        border-top: 3px solid $secondary-color
        text-align: center

        p
            padding: 1rem 0

</style>
