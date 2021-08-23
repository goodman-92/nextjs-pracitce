import {NextPageContext} from "next";
import cookies from "next-cookies";
import {authApi} from "../api/auth/auth.api";

export const withUser = (callback: any) => async (context: NextPageContext) => {
	const ctxCookies = cookies(context)

	const jwt = ctxCookies.jwt ?? "";

	if (!jwt) return {redirect: {destination: '/login', statusCode: 302}}

	try {
		await authApi.fetch(jwt);

	} catch (e) {
		return {redirect: {destination: '/login', statusCode: 302}}
	}

	return await callback(context)
}