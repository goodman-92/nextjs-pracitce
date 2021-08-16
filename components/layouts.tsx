import React, {FC, memo} from "react";
import {Layout} from 'antd';
import Headers from "./Headers"

const {Content, Footer} = Layout;

const Layouts: FC = ({children, ...pageProps}) => {
	
	return (
		<>
			<Layout style={{minHeight: '100vh'}}>
				<Layout className="site-layout">
					<Headers/>
					<Content style={{margin: '0 16px'}}>
						{children}
					</Content>
					<Footer style={{textAlign: 'center', border: "1px solid black"}}>Ant Design ©2018 Created by Ant UED</Footer>
				</Layout>
			</Layout>
		</>
	);
}

export default memo(Layouts)
