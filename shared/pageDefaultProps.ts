import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const pageDefaultProps = {
	...(serverSideTranslations("ko", ['common', 'footer'],
		{
			i18n: {
				defaultLocale: 'en',
				locales: ['en', 'ko']
			}
		},
	))
}


export {
	pageDefaultProps
}