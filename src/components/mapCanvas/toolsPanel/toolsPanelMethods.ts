import store from "@/modules/store/store";
import AxiosRequest from "@/modules/services/axiosRequest";

export const getOptions=async ():Promise<any> =>{
    try {
        const request = new AxiosRequest('options/', 'get')
        const response = await request.sendRequest()
        if (response && response.options) return response.options
} catch (e:any) {
    store.commit("setNotification", ["error","Ошибка сервера: " + e.message])
}
}
