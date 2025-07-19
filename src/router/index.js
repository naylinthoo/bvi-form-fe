// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/FormPage.vue'
import SuccessPage from '../views/ThankYouPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/success', name: 'Success', component: SuccessPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
