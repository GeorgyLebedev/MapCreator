import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// @ts-ignore
import Main from '@/views/Main.vue'; //компонент главной страницы
// @ts-ignore
import Login from '@/views/Login.vue'; //компонент страницы авторизации/регистрации
// @ts-ignore
import MapCanvas from '@/views/MapCanvas.vue'; //компонент страницы редактирования карт
// @ts-ignore
import NotFound from '@/views/NotFound.vue'; //компонент страницы 404

const routes: Array<RouteRecordRaw> = [
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
    path: '/MapCanvas/', //страница редактирования принимает url-параметр с id выбранной карты
    name: 'MapCanvas',
    component: MapCanvas,
    props: true
  },
  {
    path: "/:pathMatch(.*)", //если url не совпадает ни с одной страницей, выводим страницу 404
    name: "NotFound",
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(), //роутер будет запоминать предыдущие страницы
  routes
});

export default router;
