import {useRouter} from "next/router";
import React, {memo, useState} from "react";
import axios from "axios";
import layouts from "../../styles/layouts.module.css";
import {Dropdown, Layout, Menu, Modal} from "antd";
import useSwr from "swr";
import {userApi} from "../../api/user/user.api";
import Cookies from "js-cookie";
import classNames from "classnames";
import {PictureOutlined} from "@ant-design/icons";

const {Header} = Layout;

function UserThumb({image, name}: { image: string, name: string }) {
	return (
		<div className={classNames(layouts.userThumb, 'flex')}>
			<div className={layouts.userImage__wrap}>
				{image ? <img src={image} alt="userImage"/> : <div>{name[0].toUpperCase()}</div>}
				<div className={layouts.userImage__status}/>
			</div>
		</div>
	);
}

const UserMenu = ({user: {name, image, email}, handleModalVisible}: any) => {
	const [isShowImgEdit, setIsShowImgEdit] = useState(false);

	const openImageUploadModal = () => {
		setIsShowImgEdit(false);
		handleModalVisible(true);
	}

	return (
		<div className={layouts.userMenu}>
			<div className={layouts.userMenu__box}>
				<div className="userThumbWrap" onMouseEnter={() => setIsShowImgEdit(true)}
					 onMouseLeave={() => setIsShowImgEdit(false)}
					 style={{width: "13.3%", height: "13.3%", marginRight: "5%"}}>
					{
						isShowImgEdit && <PictureOutlined onClick={openImageUploadModal} style={{
							position: "absolute",
							zIndex: 5,
							width: '3rem',
							height: "3rem"
						}}/>
					}
					<UserThumb name={name} image={image}/>
				</div>
				<div style={{display: "flex", flexDirection: "column",}}>
					<span>{name}</span>
					<span>{email}</span>
					<div>
						<span className="status">오프라인</span>
						<span className="status-message-button">상태 메세지 설정</span>
					</div>
				</div>
			</div>
			<div className={layouts.userMenu__box}>
				계정 관리
				개인용 Teams
			</div>
			<div className={layouts.userMenu__box}>
				로그아웃
			</div>
		</div>
	);
}

const UserImg = memo(({handleModalVisible}: any) => {
	const {data: userInfo, error} = useSwr(userApi.path, userApi.fetch);

	if (!userInfo) return null

	return (
		<div className={layouts.header__user}>
			{/* 드롭다운 어떻게 써먹는거야 아나 */}
			<Dropdown trigger={["click"]} overlay={<UserMenu user={userInfo} handleModalVisible={handleModalVisible}/>}>
				<div className={layouts.userImage__wrap}>
					{userInfo.image ?
						<img src={userInfo.image} alt="userImage"/>
						:
						<div>
							{userInfo.name[0].toUpperCase()}
						</div>
					}
					<div className={layouts.userImage__status}/>
				</div>
			</Dropdown>
		</div>
	);
})

const Headers = () => {
	const router = useRouter();
	const goMenu = ({key}: { key: string }) => router.push(key).catch()
	const {data: userInfo, error} = useSwr(userApi.path, userApi.fetch)
	const [isModalVisible, setIsModalVisible] = useState(false);

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

	const handleModalVisible = () => {
		setIsModalVisible(true);
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

			<div className={layouts.header__user}>
				<UserImg handleModalVisible={handleModalVisible}/>
			</div>
			<Modal title="Basic Modal" onCancel={() => setIsModalVisible(false)} visible={isModalVisible}>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Modal>
		</Header>

	);
}

export default Headers