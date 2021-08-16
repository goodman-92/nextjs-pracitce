import {FC, memo, useState} from "react";
import {Layout, Menu, Breadcrumb} from 'antd';
import {
	DesktopOutlined,
	PieChartOutlined,
	FileOutlined,
	TeamOutlined,
	UserOutlined,
} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

const Layouts: FC = () => {

	const [collapsed, setCollaped] = useState(false)

	const onCollapse = () => {
		setCollaped(prev => !prev);
	}

	return (
		<>
			<Layout style={{minHeight: '100vh'}}>
				<Layout className="site-layout">
					<Header className="site-layout-background" style={{padding: 0}}>
						<nav>네비게이션</nav>
					</Header>
					<Content style={{margin: '0 16px'}}>
						<Breadcrumb style={{margin: '16px 0'}}>
							<Breadcrumb.Item>User</Breadcrumb.Item>
							<Breadcrumb.Item>Bill</Breadcrumb.Item>
						</Breadcrumb>
						<div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
							Bill is a cat.
						</div>
					</Content>
					<Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
				</Layout>
			</Layout>

		</>
	);
}

export default memo(Layouts)
