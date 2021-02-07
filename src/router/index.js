import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import store from '../store' 

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue')
  },
  {
    path: '/notas',
    name: 'notas',
    component: () => import(/* webpackChunkName: "about" */ '../views/Notas.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(next())
  const rutaProtegida = to.matched.some(record => record.meta.requireAuth) 
  if (rutaProtegida && store.state.token === '') {
    console.log('login')
    return next({ name: 'login' })
    // next({ name: 'notas' })
    // Aqui se me ocurre meter un if para validar si el usuariohace un sign-up
  }
  // if (rutaProtegida) {
  //   console.log('notas')
  //   return next({ name: 'notas' })
  //   // next()
  // }
  else {
    console.log('next')
    // console.log(localStorage.getItem('token'))
    return next()
  }
})



export default router
