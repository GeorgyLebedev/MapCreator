/* eslint-disable */
import {Store} from "vuex";
import VueRouter  from 'vue-router';
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '@vue/runtime-core'{
  interface ComponentCustomProperties {
    $store: Store<any>;
    $router: VueRouter
  }
}

