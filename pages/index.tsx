import React from 'react'
import {GetServerSideProps, NextPageContext} from "next";
import {useRouter} from "next/router";
import cookies from "next-cookies";

export default function IndexPage() {
	const router = useRouter()

	return (
		<div>
			Home
		</div>
	)
}

function withUser(callback: any) {
	return async function (context: NextPageContext) {
		const {jwt} = cookies(context)

		if (!jwt) {
			return {
				redirect: {
					destination: '/login',
					statusCode: 302
				}
			}
		}

		return await callback(context)
	}
}

export const getServerSideProps = withUser((context: NextPageContext) => {

	return {
		props: {}
	}
})