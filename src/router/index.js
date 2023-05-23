import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../views/ProductList.vue'
import ProductAdd from '../views/ProductAdd.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Product list',
      component: ProductList
    },
    {
      path: '/addproduct',
      name: 'Product Add',
      component: ProductAdd
    }
  ]
})

export default router
