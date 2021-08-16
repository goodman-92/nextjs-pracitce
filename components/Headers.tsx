import {useRouter} from "next/router";
import React from "react";
import axios, {AxiosResponse} from "axios";
import layouts from "../styles/layouts.module.css";
import {Button, Layout, Menu, Popconfirm} from "antd";

const {Header} = Layout;

const Headers = ({me}: { me: { name: string } }) => {
	const router = useRouter();

	const goMenu = ({key}: { key: string }) => router.push(key).catch()

	const goLogin = (e: React.MouseEvent) => {
		e.preventDefault();
		router.push('login').catch(console.error)
	}
	const goHome = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		router.push('/').catch(console.error)
	}

	const goLogout = async (): Promise<void> => {
		const {data, status}: AxiosResponse = await axios.get('http://localhost:5000/api/logout')
		router.replace('/').catch(console.error)
	}

	return (
		<Header className={layouts.header} style={{display: "flex"}}>
			<div style={{flex: "1", color: '#fff', cursor: 'pointer', fontSize: "15px", marginRight: "10px"}}
				 onClick={goHome}>
				Mara
			</div>

			<Menu style={{flex: "7"}} theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
				<Menu.Item key="post" onClick={goMenu} about="post">글쓰기</Menu.Item>
				<Menu.Item key="chat" onClick={goMenu} about="chat">채팅</Menu.Item>
				<Menu.Item key="user" onClick={goMenu} about="user">사용자</Menu.Item>
			</Menu>

			{
				me ?
					<div>
						<div className="user-name" style={{color: "white"}}>
							<span style={{marginRight: "1rem"}}>{me.name}</span>
							<Popconfirm title="정말 로그아웃할꺼야?" onConfirm={goLogout}>
								<Button type='dashed'>
									로그 아웃
								</Button>
							</Popconfirm>

						</div>
					</div> :
					<div>
						<div className={layouts.cursor} key="login" onClick={goLogin}>
							로그인
						</div>
					</div>
			}
		</Header>

	);
}

export default Header