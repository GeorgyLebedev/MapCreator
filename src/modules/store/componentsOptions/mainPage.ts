import {Module} from "vuex";
import store from "@/modules/store/store";
import AxiosRequest from "@/modules/services/axiosRequest";
import router from "@/router";
import iMap from "@/modules/intefaces/map";
import Imap from "@/modules/intefaces/map";
interface MainState {
    selectedMap: iMap,
    mapList: iMap[] | undefined,
}
const mainState: Module<MainState,any>={
    namespaced:true,
    state:{
        selectedMap: {},
        mapList: []
    },
    getters:{
        getSelectedMap:(state)=> state.selectedMap,
        getMapList:(state)=>state.mapList
    },
    mutations:{
        setMapList(state, mapList:iMap[]){
            state.mapList=mapList
        },
        setSelectedMap(state, map:iMap){
            state.selectedMap=map
        }
    },
    actions:{
        getMaps:async ({commit}):Promise<void>=> { //получение карт пользователя
            let response, request:AxiosRequest
            try {//запрос на сервер с использованием AxiosRequest
                request = new AxiosRequest('map/', 'get')
                response = await request.sendRequest() //ожидание ответа
                if (response?.maps) //если карты получены
                    commit('setMapList',response.maps)  //передать их в массив
            } catch (e:any) {
                store.commit("setNotification", ["error","Ошибка сервера: " + e.message])
            }
        },
        addNewMap:async({dispatch}, data:iMap):Promise<void>=> {
            let map:Imap, request:AxiosRequest
            try {
                map = {
                    title: data.title,
                    creationDate: new Date(),
                    changeDate: new Date(),
                    description: "",
                    resolution: data.resolution,
                    objects: {},
                }
                request = new AxiosRequest('map/', 'post', map)
                await request.sendRequest()
                store.commit('modalFlags/setShowNewMapWin', false)
                await dispatch('getMaps')
            } catch (e:any) {
                store.commit("setNotification", ["error","Ошибка сервера: " + e.message])
            }
        },
        deleteMap:async ({commit,dispatch,getters}):Promise<void>=>{
            let request:AxiosRequest
            const map=getters.getSelectedMap
            try{
                request=new AxiosRequest(`map/${map._id}`, "delete")
                await request.sendRequest()
                commit('setSelectedMap',{})
                store.commit('modalFlags/setShowDelMapWin', false)
                await dispatch('getMaps')
            }
            catch (e:any) {
                store.commit("setNotification", ["error","Ошибка сервера: " + e.message])
            }
        },
        updateMapMetadata:async({dispatch,getters}):Promise<void>=>{
            let request:AxiosRequest
            const map=getters.getSelectedMap
            try{
                request=new AxiosRequest(`map/${map._id}`, "put", {title:map.title, description:map.description})
                await request.sendRequest()
                store.commit("modalFlags/setShowEditMapWin", false)
                await dispatch('getMaps')
            }
            catch (e:any){
                store.commit("setNotification", ["error","Ошибка сервера: " + e.message])
            }
        }
    }
}
export default mainState
