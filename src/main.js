import { createApp } from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'
import router from './router'
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
