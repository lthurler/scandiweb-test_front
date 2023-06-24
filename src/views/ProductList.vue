<script>
import HeaderVue from '../components/HeaderVue.vue'
import FooterVue from '../components/FooterVue.vue'
// import { process } from '../env.js'

// const url = "http://scandiweb-test.xp3.biz/product/"
const url = "https://scandweb-test.000webhostapp.com/product/"

export default {
  name: 'ProductList',

  data() {
    return {
      product_id: [],
      products: [],
      card: true
    }
  },

  components: { HeaderVue, FooterVue },

  methods: {

    handleChange(event) {

      const id = event.target.value

      if (event.target.checked) {

        this.product_id.push(id)

        console.log(this.product_id)

      } else {

        const index = this.product_id.indexOf(id)

        if (index > -1) {

          this.product_id.splice(index, 1)
        }
      }
    },

    async listProduct() {

      const parameter = {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      };

      try {
        const req = await fetch(url + "list", parameter)
        const res = await req.text()
        const data = JSON.parse(res)
        this.products = data.response.filter((product) => product.active == 1)

        console.log(this.products)

      } catch (error) {

        console.log(error)
      }
    },

    async deleteProduct() {

      console.log(this.product_id)

      if (this.product_id.length !== 0) {
        const data = {
          product_id: this.product_id
        }

        console.log(data)

        const dataJson = JSON.stringify(data)

        const parameter = {
          method: 'PATCH',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
          },
          body: dataJson
        }

        try {
          const req = await fetch(url + "delete", parameter)
          const res = await req.json()
          this.product_id = []
          this.card = false
          this.listProduct()
          this.card = true

          console.log(res)

        } catch (error) {
          console.log(error)
        }

      } else {

        let msg = "no product to delete"
        console.log(msg)
      }

    }
  },

  created() {
    this.listProduct()
  }

}
</script>

<template>
  <main>
    <HeaderVue :view="'list'" @button-clicked="deleteProduct" />
    <div v-if="card == true" id="content">
      <div v-for="product in products" :key="product.product_id" id="product_container">

        <div id="product_list">
          <input type="checkbox" class="delete-checkbox" name="product_id" :value="product.product_id"
            @change="handleChange">

          <div id="product_content">
            <p>{{ product.sku }}</p>            
            <p>{{ product.name }}</p>
            <p>{{ product.price }} $</p>
            <p v-if="product.weight !== '0'">Weight: {{ product.weight }} Kg</p>
            <p v-if="product.size !== '0'">Size: {{ product.size }} MB</p>
            <p v-if="product.dimension !== '0x0x0'">Dimension: {{ product.dimension }}</p>
          </div>

        </div>
      </div>
    </div>
    <FooterVue />
  </main>
</template>

<style lang="sass" scoped>
@import '../assets/sass/variables'

#content
    width: 100%
    padding: 1.5rem 2rem
    overflow: auto
    max-height: 75vh
    display: grid
    grid-template-columns: repeat(4, 1fr)
    grid-row-gap: 2rem
    grid-column-gap: 2rem    

    #product_container              
        background-color: $primary-color        
        border: 3px solid $secondary-color

        #product_list                        
            padding: 1rem            
            padding-bottom: 4rem
    
            .delete-checkbox                
                margin: 0
                padding: 0

            #product_content
                font-size: 1rem                
                width: 100%
                color: $secondary-color
                display: flex
                flex-direction: column
                align-items: center
                justify-content: center
                padding: 0 .8rem                

            #product_content p:first-child
                text-transform: uppercase
</style>
