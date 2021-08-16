import client from "../../../api/axiosClient";
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


export {
	loginApi
}