<script>
import HeaderVue from '../components/HeaderVue.vue'
import FooterVue from '../components/FooterVue.vue'
import useVuelidate from '@vuelidate/core'
import { required, decimal, helpers, maxLength, integer } from '@vuelidate/validators/'
import { reactive, computed } from 'vue'


// const url = "http://localhost/scandiweb-back/product/"  
const url = "https://scandiweb-test.leothurler.com/product/"

var skus = []


export default {
  name: 'ProductAdd',

  components: { HeaderVue, FooterVue },

  setup() {

    const state = reactive({
      sku: "",
      name: "",
      price: "",
      product_type: "",
      weight: "",
      size: "",
      height: "",
      width: "",
      length: ""
    })

    async function listProduct() {

      const parameter = {
        method: 'GET',
        headers: {
          'Accept': '*/*',          
          'Content-Type': 'application/json'
        }
      }

      await fetch(url + "get", parameter)
        .then(response => {

          if (!response.ok) {
            throw new Error('Network error');
          }
          return response.json();
        })

        .then(data =>{

          if(data.type === 'success') {
             data.response.map(product => {
             skus.push(product.sku)              
            })
  
          } else {  
            console.error(data)
          } 
        })

      .catch (error => {
        console.log(error)
      })
    }
    listProduct()
    
    const isUnique = (value) => !value || !skus.includes(value)
    const alphaSpace = helpers.regex(/^[a-zA-Z0-9\s]/g)
    const alphaNum = helpers.regex(/^[0-9a-zA-Z]/g)

    const rules = computed(() => {

      return {
        sku: {
          required: helpers.withMessage('Please, submit required sku', required),
          isUnique: helpers.withMessage('This Sku is already in use, please supply another value', isUnique),
          maxLength: helpers.withMessage('Maximum sku length is 11', maxLength(11)),
          alphaNum: helpers.withMessage('Please, provide alphanumeric only', alphaNum)
        },
        name: {
          required: helpers.withMessage('Please, submit required name', required),
          maxLength: helpers.withMessage('Maximum name length is 30', maxLength(30)),
          alphaSpace: helpers.withMessage('Please, provide alphanumeric and spaces only', alphaSpace)
        },
        price: {
          required: helpers.withMessage('Please, submit required price', required),
          decimal: helpers.withMessage('Please, submit required price', decimal),
          maxLength: helpers.withMessage('Maximum price is 10', maxLength(10)),
        },
        product_type: { required: helpers.withMessage('Please, submit required product type', required) },
          weight: state.product_type === 'book' && {
          required: helpers.withMessage('Please, submit required price', required),
          maxLength: helpers.withMessage('Maximum weight is 4', maxLength(4)),
          integer: helpers.withMessage('Please, provide integer only', integer)
        },
        size: state.product_type === 'size' && {
          required: helpers.withMessage('Please, submit required price', required),
          maxLength: helpers.withMessage('Maximum size is 4', maxLength(4)),
          integer: helpers.withMessage('Please, provide integer only', integer)
        },
        height: state.product_type === 'furniture' && {
          required: helpers.withMessage('Please, submit required price', required),
          maxLength: helpers.withMessage('Maximum height is 4', maxLength(4)),
          integer: helpers.withMessage('Please, provide integer only', integer)
        },
        width: state.product_type === 'furniture' && {
          required: helpers.withMessage('Please, submit required price', required),
          maxLength: helpers.withMessage('Maximum width is 4', maxLength(4)),
          integer: helpers.withMessage('Please, provide integer only', integer)
        },
        length: state.product_type === 'furniture' && {
          required: helpers.withMessage('Please, submit required price', required),
          maxLength: helpers.withMessage('Maximum lenght is 4', maxLength(4)),
          integer: helpers.withMessage('Please, provide integer only', integer)
        },
      }
    })

    const v$ = useVuelidate(rules, state)

    return {
      v$,
      state
    }
  },

  methods: {

    updateType(event) {
      this.state.product_type = event.target.value      
    },

    async saveProduct() {
      this.v$.$reset()

      const isFormCorrect = await this.v$.$validate()

      if (!isFormCorrect) return

      if (isFormCorrect) {
        this[this.state.product_type + "Save"]()
      }
    },

    async handlePost(data){

      const dataJson = JSON.stringify(data)

      const parameter = {
        method: 'POST',
        headers: {
            'Accept': '*/*',            
            'Content-Type': 'application/json'
          },
        body: dataJson
      };

      await fetch(url + "post", parameter)
       .then(response => {

          if (!response.ok) {
            throw new Error('Network error');
        }
        return response.json();
      })

       .then(data => {
        console.log(data)
       })

       this.$router.push('/')        

       .catch(error => {
        console.log(error)
      })
    },

    async dvdSave() {

      const data = {
        sku: this.state.sku,
        name: this.state.name,
        price: this.state.price,
        product_type: this.state.product_type,
        size: this.state.size
      }

      this.handlePost(data)
    },

    async bookSave() {

      const data = {
        sku: this.state.sku,
        name: this.state.name,
        price: this.state.price,
        product_type: this.state.product_type,
        weight: this.state.weight
      }

      this.handlePost(data)
    },

    async furnitureSave() {

      const data = {
        sku: this.state.sku,
        name: this.state.name,
        price: this.state.price,
        product_type: this.state.product_type,
        height: this.state.height,
        width: this.state.width,
        length: this.state.length
      }

      this.handlePost(data)
    }
  },
}
</script>

<template>
  <main>
    <HeaderVue :view="'add'" @button-clicked="saveProduct" />
    <div class="form_content">

      <form @submit="saveProduct" class="contact_form" id="product_form">

        <div class="contact_form-div">
          <label>SKU</label>
          <input type="text" name="sku" v-model="state.sku" class="contact_form-input" id="sku">
          <div class="error_msg" v-if="v$.sku.$error">
            <p>{{ v$.sku.$errors[0].$message }}</p>
          </div>
        </div>

        <div class="contact_form-div">
          <label>Name</label>
          <input type="text" name="product_name" v-model="state.name" class="contact_form-input" id="name">
          <div class="error_msg" v-if="v$.name.$error">
            <p>{{ v$.name.$errors[0].$message }}</p>
          </div>
        </div>

        <div class="contact_form-div" id="price_div">
          <label>Price ($)</label>
          <input type="number" name="product_price" v-model="state.price" class="contact_form-input" id="price">
          <div class="error_msg" v-if="v$.price.$error">
            <p>{{ v$.price.$errors[0].$message }}</p>
          </div>
        </div>

        <div class="contact_form-select">
          <label>Type Switcher</label>
          <select name="product_type" id="productType" v-model="state.product_type" @change="updateType">
            <option value="" selected>Type Switcher</option>
            <option value="dvd">DVD</option>
            <option value="furniture">Furniture</option>
            <option value="book">Book</option>
          </select>

          <div class="error_msg" v-if="v$.product_type.$error">
            <p>{{ v$.product_type.$errors[0].$message }}</p>
          </div>
        </div>

        <div v-if="state.product_type === 'book'">
          <div class="contact_form-switch">
            <label>Weight (KG)</label>
            <input type="number" name="furniture_weight" v-model="state.weight" class="contact_form-input" id="weight">

            <div class="error_msg" v-if="v$.weight.$error">
              <p>{{ v$.weight.$errors[0].$message }}</p>
            </div>
          </div>

          <div id="type_description">
            <p>Please provide the Weight in KG</p>
          </div>
        </div>

        <div v-if="state.product_type === 'dvd'">
          <div class="contact_form-dvd">
            <label>Size (MB)</label>
            <input type="number" name="furniture_size" v-model="state.size" class="contact_form-input" id="size">

            <div class="error_msg" v-if="v$.size.$error">
              <p>{{ v$.size.$errors[0].$message }}</p>
            </div>
          </div>

          <div id="type_description">
            <p>Please provide the size in MB</p>
          </div>
        </div>

        <div v-if="state.product_type === 'furniture'">
          <div class="contact_form-switch">
            <label>Height (CM)</label>
            <input type="number" name="furniture_height" v-model="state.height" class="contact_form-input" id="height">

            <div class="error_msg" v-if="v$.height.$error">
              <p>{{ v$.height.$errors[0].$message }}</p>
            </div>
          </div>

          <div class="contact_form-switch">
            <label id="h4width">Width (CM)</label>
            <input type="number" name="furniture_width" v-model="state.width" class="contact_form-input" id="width">

            <div class="error_msg" v-if="v$.width.$error">
              <p>{{ v$.width.$errors[0].$message }}</p>
            </div>
          </div>

          <div class="contact_form-switch">
            <label>length (CM)</label>
            <input type="number" name="furniture_length" v-model="state.length" class="contact_form-input" id="length">

            <div class="error_msg" v-if="v$.length.$error">
              <p>{{ v$.length.$errors[0].$message }}</p>
            </div>
          </div>

          <div id="type_description">
            <p>Please provide dimensions in HxWxL format</p>
          </div>
        </div>
      </form>
    </div>

    <FooterVue />
    
  </main>
</template>

<style lang="sass" scoped>
@import '../assets/sass/variables'

.form_content
    height: 75vh
    padding: 3rem 1rem
    background-color: $primary-color
    color: $secondary-color
    
    .contact_form
        .contact_form-div
            display: grid
            grid-template-columns: 4.5rem 14rem 26rem         
            padding-bottom: 1rem
            column-gap: 1rem

            label
                padding-left: 1rem                

            .contact_form-input
                width: 100%
                height: 1.6rem
                border: 2px solid $secondary-color               
                padding: 0.5rem

            p
                color: $tertiary-color                
                margin-left: 2rem
                
        .contact_form-select
            display: grid
            grid-template-columns: 7.5rem 7rem 26rem           
            padding: 2rem 0 3rem 0
            column-gap: 1rem
            
            label
                padding-left: 1rem
            
            p
                color: $tertiary-color                
                margin-left: 6rem
        
        #productType
            width: 100%
            height: 2rem                
            text-align: center
            border: 2px solid $secondary-color

        .contact_form-switch
            display: grid
            grid-template-columns: 6.5rem 12.5rem 26rem         
            padding-bottom: 1rem
            column-gap: 0.5rem                          

            label
                padding-left: 1rem                

            .contact_form-input
                width: 100%
                height: 1.6rem
                border: 2px solid $secondary-color                
                padding: 0.5rem
            
            p
                color: $tertiary-color                
                margin-left: 2rem

        .contact_form-dvd
            display: grid
            grid-template-columns: 6rem 13.5rem 26rem          
            padding-bottom: 1rem

            label
                padding-left: 1rem                

            .contact_form-input
                width: 100%
                height: 1.6rem
                border: 2px solid $secondary-color                
                padding: 0.5rem

            p
                color: $tertiary-color                
                margin-left: 2rem

        #type_description
            font-weight: bold
            padding-left: 1rem                    

</style>
