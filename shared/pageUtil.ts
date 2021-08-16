import type {GetServerSideProps, NextApiRequest, NextApiResponse} from "next";
import {NextApiRequestQuery} from "next/dist/next-server/server/api-utils";
import {userApi} from "../api/user/user.api";
import {Me} from "../pages/_app";

export const protectResolver = async (our: any) => async ({req, res, query}: { req: NextApiRequest, res: NextApiResponse, query: NextApiRequestQuery }) => {

		try {
			console.log(userApi.fetch(), 'req')

			const {data} = await userApi.fetch()

			return our({query, resolvedUrl: "", req, res, previewData: {me: new Me(data)}})

		} catch (e) {
			return our({query, resolvedUrl: "", req, res})

		}


	}