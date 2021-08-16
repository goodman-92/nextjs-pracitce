import React, {FC} from 'react'
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


const SignUp: FC = () => {

	const {t} = useTranslation('common')

	return (
		<div className="w-full max-w-xs flex justify-center">
		</div>
	)
}

export default SignUp

export const getStaticProps = async ({locale}: { locale: string }) => {

	return {
		props: {
			...(await serverSideTranslations(locale, ['common'],
				{
					i18n: {
						defaultLocale: 'en',
						locales: ['en', 'ko']
					}
				},
			))
		}
	}
}