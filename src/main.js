import { createApp } from 'vue'
import store from "@/modules/store/store";
import App from './App.vue'
import router from './router'
import "@/assets/css/Common.css"
const app=createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
