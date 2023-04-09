import { createApp } from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
import "@/assets/css/Common.css"
const app=createApp(App)
const store = createStore({
    state () {
	return {
	}
    }
})
app.use(router)
app.use(store)
app.mount('#app')
