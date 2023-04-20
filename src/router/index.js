import {createRouter, createWebHistory} from 'vue-router'
import Main from "@/views/Main";
import Login from "@/views/Login"
import MapCanvas from "@/views/MapCanvas"
import NotFound from "@/views/NotFound"
const routes = [
  {
    path: '/',
    redirect: '/Main'
  },
  {
    path: '/Main',
    name: 'Main',
    component: Main
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/MapCanvas',
    name: 'MapCanvas',
    component: MapCanvas,
    props: true
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
