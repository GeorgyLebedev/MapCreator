import axios from "axios";
axios.defaults.withCredentials=true
export default class AxiosRequest {
    baseURL="http://localhost:1111/"
    constructor(url, method, data={}, authHeader=`Bearer ${localStorage.getItem('TOKEN')}`) {
	this.url = this.baseURL+url;
	this.method = method;
	this.authHeader = authHeader;
	this.data = data;
    }
    async sendRequest() {
	try {
	    const response = (await axios({
		method: this.method,
		url: this.url,
		headers: {
		    authorization: this.authHeader,
		},
		data: this.data
	    })).data
	    if(response.newToken) {
		localStorage.setItem('TOKEN', response.newToken)
		this.authHeader=`Bearer ${localStorage.getItem('TOKEN')}`
		await this.sendRequest()
	    }
	    else
	    return response
	} catch (e) {
	    console.log(e.message);
	}
    }
}
