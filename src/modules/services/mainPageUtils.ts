import AxiosRequest from "@/modules/services/axiosRequest";
import router from '@/router'
import store from "@/modules/store/store";
import Imap from "@/modules/intefaces/map";
export const logOut=async():Promise<void>=> {
    localStorage.clear()
    try {
        await new AxiosRequest('auth/logout', 'post').sendRequest()
        await router.push('/Login')
    } catch (e:any) {
        store.commit("setNotification", ["error","Ошибка сервера: " + e.message])
    }
}
export const addNewMap=async(title:string, resolution:string):Promise<void>=> {
    let map:Imap, request:AxiosRequest
    try {
        map = {
            title: title,
            creationDate: new Date(),
            changeDate: new Date(),
            description: "",
            resolution: resolution,
            objects: {},
        }
        request = new AxiosRequest('map/', 'post', map)
        await request.sendRequest()
        store.commit('modalFlags/setShowNewMapWin', false)
    } catch (e:any) {
        store.commit("setNotification", ["error","Ошибка сервера: " + e.message])
    }
}
export const getMaps=async ():Promise<undefined | object[]>=> { //получение карт пользователя
    let response, request:AxiosRequest
    try {//запрос на сервер с использованием AxiosRequest
        request = new AxiosRequest('map/', 'get')
        response = await request.sendRequest() //ожидание ответа
        if (response?.maps) //если карты получены
            return response.maps //передать их в массив
        return undefined
    } catch (e:any) {
        store.commit("setNotification", ["error","Ошибка сервера: " + e.message])
    }
}
export const deleteMap=async (map:Imap):Promise<void>=>{
    let request:AxiosRequest
    try{
        request=new AxiosRequest(`map/${map._id}`, "delete")
        await request.sendRequest()
        map={} as Imap
        store.commit('modalFlags/setShowDelMapWin', false)
    }
    catch (e:any) {
        store.commit("setNotification", ["error","Ошибка сервера: " + e.message])
    }
}

export const updateMapMetadata=async(map:Imap):Promise<void>=>{
    let request:AxiosRequest
    try{
        request=new AxiosRequest(`map/${map._id}`, "put", {title:map.title, description:map.description})
        await request.sendRequest()
        store.commit("modalFlags/setShowEditMapWin", false)
    }
    catch (e:any){
        store.commit("setNotification", ["error","Ошибка сервера: " + e.message])
    }
}
