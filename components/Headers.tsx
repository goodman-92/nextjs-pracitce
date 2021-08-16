import {useRouter} from "next/router";
import React, {memo} from "react";
import axios from "axios";
import layouts from "../styles/layouts.module.css";
import {Dropdown, Layout, Menu} from "antd";
import useSwr from "swr";
import {userApi} from "../api/user/user.api";
import Cookies from "js-cookie";
import classNames from "classnames";

const {Header} = Layout;

const UserMenu = ({userInfo}: any) => {
	return (
		<div className={layouts.userMenu}>
			<div className={classNames(layouts.userMenu__box, 'flex')}>

			</div>
			<div className={layouts.userMenu__box}></div>
			<div className={layouts.userMenu__box}></div>
		</div>
	);
}

const UserImg = memo(() => {
	const {data: userInfo, error} = useSwr(userApi.path, userApi.fetch);
	console.log(userInfo, error, 'userInfo log')
	if (!userInfo) return null

	return (
		<div className={layouts.header__user}>
			<Dropdown overlay={<UserMenu user={userInfo}/>}>
				<div className={layouts.userImage__wrap}>
					{userInfo.image ?
						<img src={userInfo.image} alt="userImage"/>
						:
						<div>
							{userInfo.name[0].toUpperCase()}
						</div>
					}
					<div className={layouts.userImage__status}>
					</div>
				</div>
			</Dropdown>

		</div>
	);
})

const Headers = () => {
	const router = useRouter();
	const goMenu = ({key}: { key: string }) => router.push(key).catch()
	const {data: userInfo, error} = useSwr(userApi.path, userApi.fetch)

	const goLogin = (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			router.push('/signIn').catch()
		} catch (e) {
			console.log(e, 'error')
		}
	}

	const goHome = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		router.push('/').catch(console.error)
	}

	const goLogout = async (): Promise<void> => {
		try {
			await axios.get('http://localhost:5000/api/logout')
			Cookies.remove('jwt');
			await router.replace('/signIn');
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<Header className={layouts.header} style={{display: "flex"}}>
			<div style={{flex: "1", color: '#fff', cursor: 'pointer', fontSize: "15px", marginRight: "10px"}}
				 onClick={goHome}>
				Jeams
			</div>

			<Menu style={{flex: "7", height: "3.5rem",}} theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
				<Menu.Item key="post" onClick={goMenu} about="post">글쓰기</Menu.Item>
				<Menu.Item key="chat" onClick={goMenu} about="chat">채팅</Menu.Item>
				<Menu.Item key="user" onClick={goMenu} about="user">사용자</Menu.Item>
			</Menu>

			<div style={{flex: "2"}}>
				<UserImg/>
			</div>
		</Header>

	);
}

export default Headers