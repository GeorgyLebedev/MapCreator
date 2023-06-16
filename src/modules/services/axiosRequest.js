import axios from "axios"; //подключаем axios
axios.defaults.withCredentials=true //позволяем axios передавать cookie с запросами
export default class AxiosRequest {
    baseURL="http://localhost:1111/" //базовый URL сервера
    constructor(url, method, data={}) {
	this.authHeader=`Bearer ${localStorage.getItem('TOKEN')}` //прикрепляем токен авторизации
	this.url = this.baseURL+url; //получаем полный URL
	this.method = method; // GET, POST, PUT, DELETE
	this.data = data; //данные
    }
    async sendRequest() { //отправить запрос
        let response
	try {
            response = (await axios({ //ожидание отправки запроса
		method: this.method,
		url: this.url,
		headers: {
		    authorization: this.authHeader, //подстановка заголовка авторизации
		},
		data: this.data
	    })).data
	    if(response.newToken) { //если получен новый токен
		localStorage.setItem('TOKEN', response.newToken)//обновляем его
		localStorage.setItem('USER', response.username)
		this.authHeader=`Bearer ${localStorage.getItem('TOKEN')}`
		let responseRepeat = (await axios({ //и повторяем прошлый запрос
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
	} catch (e) {
	    return {msg:e.message}
	}
    }
}
