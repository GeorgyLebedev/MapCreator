import AxiosRequest from "@/modules/services/axiosRequest";
import iUser from "@/modules/intefaces/user";
export const updateUserData = async (data: any): Promise<void> => {
    const request: AxiosRequest = new AxiosRequest("user/", "put", data)
    const response = await request.sendRequest()
    if (response) {
        location.reload()
    }
}
export const getUser=async():Promise<iUser> =>{
    const request = new AxiosRequest("user/", "get")
    return (await request.sendRequest()).user
}
