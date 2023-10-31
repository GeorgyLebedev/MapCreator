import AxiosRequest from "@/modules/services/axiosRequest";
import store from "@/modules/store/store";
export const getPalette = async (): Promise<void | string[]> => {
    try {
        const request = new AxiosRequest('options/', 'get')
        const response = await request.sendRequest()
        if (response && response.options) return response.options.palette
    } catch (e: any) {
        store.commit("setNotification", ["error", "Ошибка загрузки палитры: " + e.message])
    }
}
export const updatePalette = async (index: number, color: number): Promise<void> => {
    const options = {index, color}
    store.commit('colorsStore/updatePalette', options)
    try {
        const request = new AxiosRequest('options/', 'put', {palette: store.getters["colorsStore/getPaletteColors"]})
        await request.sendRequest()
    } catch (e: any) {
        store.commit("setNotification", ["error", "Ошибка обновления палитры: " + e.message])
    }
}
