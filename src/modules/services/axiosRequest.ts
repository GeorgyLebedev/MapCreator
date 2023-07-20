import axios from "axios"; //подключаем axios
import handleError from "@/modules/services/serverErrorsHandler";
axios.defaults.withCredentials=true //позволяем axios передавать cookie с запросами
export default class AxiosRequest {
    private baseURL="http://localhost:1111/" //базовый URL сервера
	authHeader: string
	url:string
	method:string
	data:any

    constructor(url:string, method:string, data:any={}) {
	this.authHeader=`Bearer ${localStorage.getItem('TOKEN')}` //прикрепляем токен авторизации
	this.url = this.baseURL+url; //получаем полный URL
	this.method = method; // GET, POST, PUT, DELETE
	this.data = data; //данные
    }
    async sendRequest() { //отправить запрос
	try {
		const response:any = (await axios({ //ожидание отправки запроса
		method: this.method,
		url: this.url,
		headers: {
		    authorization: this.authHeader, //подстановка заголовка авторизации
		},
		data: this.data
	    })).data
	    if(response?.newToken) { //если получен новый токен
		localStorage.setItem('TOKEN', response.newToken)//обновляем его
		this.authHeader=`Bearer ${localStorage.getItem('TOKEN')}`
		const responseRepeat:any = (await axios({ //и повторяем прошлый запрос
		    method: this.method,
		    url: this.url,
		    headers: {
			authorization: this.authHeader,
		    },
		    data: this.data,
		})).data;
		return responseRepeat
	    }
	    else
	    return response
	} catch (e:any) {
		await handleError(e)
		return undefined
	}
    }
}
