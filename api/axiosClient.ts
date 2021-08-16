import axios, {AxiosInstance, AxiosPromise} from "axios";

const client : AxiosInstance = axios.create({
	baseURL: 'http://localhost',
	headers: {
		
	},
	timeout: 10000,
	withCredentials: true
})

export default client