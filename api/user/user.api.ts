import client from "../axiosClient";
import {AxiosResponse} from "axios";

class Me {
	constructor(data: any) {
		console.log(data, '생성자')
		this.username = data.name
	}

	username: string
}


interface UserInfo {
	image: string;
	name: string;
	email: string;
	status: 'possible' | 'offLine' | 'interdict';
}

const userApi = {
	path: 'api/user',
	fetch: () => client.get(userApi.path).then(({data}: AxiosResponse<UserInfo>) => data).catch(console.error)
}


export {
	userApi
}