import axios, {AxiosInstance, AxiosPromise} from "axios";
import {i18n, useTranslation, } from "next-i18next";

const client : AxiosInstance = axios.create({
	baseURL: 'http://localhost:5000',
	// headers: {},
	timeout: 10000,
	withCredentials: true,
	responseType:"json",
	headers: {
		
	},
	transformResponse: [
		( data ) => {
		    return data
			// const { t } = useTranslation('serverCode', {})
			// data.tMessage = t(data.code)

		}
	]
})

export default client