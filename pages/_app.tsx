import 'antd/dist/antd.css';
import type {AppProps} from 'next/app'
import {appWithTranslation} from "next-i18next";
import Layouts from "../components/layouts/layouts";
import React from "react";
import Head from "next/head";
import {useRouter} from "next/router";
import Heads from "../components/layouts/Heads";

function MyApp({Component, pageProps}: AppProps) {
	const router = useRouter();

	return (
		<>
			<Heads/>
			<Layouts {...pageProps}><Component {...pageProps} /></Layouts>
		</>
	)
}

export default appWithTranslation(MyApp);

