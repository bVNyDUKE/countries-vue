import { createApp } from 'vue'
import App from './App.vue'
import Home from './pages/Home.vue'
import Country from './pages/Country.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name:'Home', component: Home },
    { path: '/:country', name:'Country', component: Country },
  ],
})

createApp(App).use(router).mount('#app')
