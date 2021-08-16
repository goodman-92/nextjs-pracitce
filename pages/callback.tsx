import * as React from 'react';
import {useRouter} from "next/router";
import useSwr from "swr";
import {GetServerSideProps} from "next";

type Props = {};
export const Callback = (props: Props) => {
	const {query} = useRouter()

	const {
		data,
		error,
		mutate
	} = useSwr(query && query.code ? `github?code=${query.code}` : null, {
		refreshInterval: 0
	})

	if (error) return <div>에러입니다</div>
	if (!data) return <div>로딩중</div>

	console.log(data)

	return (
		<div>
			{JSON.stringify(data)}
		</div>
	);
};

export default Callback


export const getServerSideProps: GetServerSideProps = async ctx => {

	console.log(ctx.res)

	return {
		props: {}
	}

}