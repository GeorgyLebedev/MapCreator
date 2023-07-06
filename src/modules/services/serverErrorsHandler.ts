import {AxiosError} from "axios";
import store from "@/modules/store/store";
import router from "@/router";

export default async function handleError(error: AxiosError): Promise<void> {
    if(error.response?.status===401 || error.response?.status===403){
        localStorage.clear()
        await router.push({path:'/Login'})
    }
    if(error.response?.data){
        store.commit('setNotification', ['error', (error.response.data as { message: string })?.message]);
    }
    else console.log(error)
}
