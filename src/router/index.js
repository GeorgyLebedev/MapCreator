import {createRouter, createWebHistory} from 'vue-router'
import Main from "@/views/Main"; //компонент главной страницы
import Login from "@/views/Login" //компонент страницы авторизации/регистрации
import MapCanvas from "@/views/MapCanvas" //компонент страницы редактирования карт
import NotFound from "@/views/NotFound" //компонент страницы 404
const routes = [ //настройки маршрутов в зависимости от url
  {
    path: '/',
    redirect: '/Main'
  },
  {
    path: '/Main',
    name: 'Main',
    component: Main,
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/MapCanvas/:id', //страница редактирования принимает url-параметр с id выбранной карты
    name: 'MapCanvas',
    component: MapCanvas,
  },
  {
    path: "/:pathMatch(.*)*", //если url не совпадает ни с одной страницей, выводим страницу 404
    name: "NotFound",
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(), //роутер будет запоминать предыдущие страницы
  routes
})

export default router
