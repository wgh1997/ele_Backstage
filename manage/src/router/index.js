import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import admin from "@/router/admin";
import shop from "./shop"
import mop from "../components/mop.vue";
import commodity from "./commodity"
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'home',
      component: Home,
    },
    {
      path: '/mop',
      name: 'mop',
      component: mop,
    },
    {
      path: '/about',
      name: 'about',
      component: function () { 
        return import('@/views/About.vue')
      }
    }
  ].concat(admin,shop,commodity)
})
