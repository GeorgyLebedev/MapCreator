import axios from "axios";
axios.defaults.withCredentials=true
export default class AxiosRequest {
    baseURL="http://localhost:1111/"
    constructor(url, method, data={}) {
	this.authHeader=`Bearer ${localStorage.getItem('TOKEN')}`
	this.url = this.baseURL+url;
	this.method = method;
	this.data = data;
    }
    async sendRequest() {
        let response
	try {
            response = (await axios({
		method: this.method,
		url: this.url,
		headers: {
		    authorization: this.authHeader,
		},
		data: this.data
	    })).data
	    if(response.newToken) {
	        alert("Token Update")
		localStorage.setItem('TOKEN', response.newToken)
		localStorage.setItem('USER', response.username)
		this.authHeader=`Bearer ${localStorage.getItem('TOKEN')}`
		let responseRepeat = (await axios({
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
