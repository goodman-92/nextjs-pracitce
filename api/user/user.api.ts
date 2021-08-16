import client from "../axiosClient";
import {AxiosResponse} from "axios";

const userAPI: {path: string, fetch(): Promise<AxiosResponse>} = {
	path: 'api/user',
	fetch: (url = userAPI.path) => client.get(url)
}


export {
	userAPI
}