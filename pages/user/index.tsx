import React from "react";
import {useTranslation} from "next-i18next";
import {pageDefaultProps} from "../../shared/pageDefaultProps";


const User: React.FC = ({  }) => {

	const {t} = useTranslation('common');

	return (
		<>
			Hello {t('obj.a')}
			<br/>

		</>
	)
}
export default User

export const getStaticProps = async () => {

	return {
		props: {
			...pageDefaultProps
		}
	}
}
