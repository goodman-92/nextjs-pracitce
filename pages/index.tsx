import React from 'react'
import {NextPageContext} from "next";
import {withUser} from "../shared/pageUtil";

export default function IndexPage() {

	return (
		<div>Home</div>
	)
}

export const getServerSideProps = withUser((context: NextPageContext) => {

	return {
		props: {}
	}
})