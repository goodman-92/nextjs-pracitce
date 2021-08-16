import client from "../axiosClient";
import {AxiosResponse} from "axios";

type UserReqBody = {
	email: string,
	password: string
}


interface BS_API {
	code: string;
	message: string
	name: string
}

const loginApi = {
	path: "/api/login",
	fetch: async (userReqBody: UserReqBody): Promise<AxiosResponse<BS_API>> => {
		return await client.post(loginApi.path, userReqBody)
	}
}

const authApi = {
	path: '/api/auth',
	fetch: async (jwt: string): Promise<AxiosResponse> => {
	 	return await client.post(authApi.path, {jwt})
	}
}


export {
	loginApi,
	authApi
}