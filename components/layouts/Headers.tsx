import {useRouter} from "next/router";
import React, {memo, useState} from "react";
import axios from "axios";
import layouts from "../../styles/layouts.module.css";
import {Dropdown, Layout, Menu, Modal} from "antd";
import useSwr from "swr";
import {userApi} from "../../api/user/user.api";
import Cookies from "js-cookie";
import classNames from "classnames";
import {DeleteOutlined, PictureOutlined, UploadOutlined} from "@ant-design/icons";

const {Header} = Layout;

const UserThumb = () => {
	const {data: user, error} = useSwr(userApi.path, userApi.fetch);
	console.log(error, 'userError')

	if (error || !user) return null;

	const { image, name, email} = user;

	return (
		<div className={classNames(layouts.userThumb, 'flex')}>
			<div className={layouts.userImage__wrap}>
				{user.image ? <img src={image} alt="userImage"/> : <div>{name[0].toUpperCase()}</div>}
				<div className={layouts.userImage__status}/>
			</div>
		</div>
	);
}

function ProfileModal() {
	return (
		<div className={layouts.profileModal_container}>
			<section className="profileModal__header">
				<span>프로필 사진 변경</span>
				<span>모든 microsoft 365 앱에 대해 업데이트 됩니다.</span>
			</section>
			<section className="profileModal__content">
				<div className="column" style={{display:"flex", flexDirection: "column"}}>
					<div className="profileModal__buttons">
						<div className="profileModal__image__upload">
							<UploadOutlined/>
							사진 업로드
						</div>
						<div className="profileModal__image__delete">
							<DeleteOutlined/>
							사진 삭제
						</div>
					</div>
					<div className="profileModal__uploadImage">
						<div className="profileModal__uploadImage__wrapper">
							<UserThumb/>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

const UserMenu = ({user: {name, image, email}}: any) => {
	const [isShowImgEdit, setIsShowImgEdit] = useState(false);

	const openImageUploadModal = () => {
		setIsShowImgEdit(false);
		handleModalVisible();
	}

	const [isModalVisible, setIsModalVisible] = useState(false);
	const handleModalVisible = () => setIsModalVisible(true);

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
					<UserThumb/>
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

			<Modal closable={false} footer={null}
				   children={<ProfileModal/>} onCancel={() => setIsModalVisible(false)} visible={isModalVisible}/>
		</div>
	);
}

const UserImg = memo(({handleModalVisible}: any) => {
	const {data: userInfo, error} = useSwr(userApi.path, userApi.fetch);

	if (!userInfo) return null

	return (
		<div className={layouts.header__user}>
			<Dropdown trigger={["click"]} overlay={<UserMenu user={userInfo} handleModalVisible={handleModalVisible}/>}>
				<div>
					<UserThumb/>
				</div>
			</Dropdown>
		</div>
	);
})

const Headers = () => {
	const router = useRouter();
	const goMenu = ({key}: { key: string }) => router.push(key).catch()
	const {data: userInfo, error} = useSwr(userApi.path, userApi.fetch)

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

			<div className={layouts.header__user}>
				<UserImg/>
			</div>
		</Header>

	);
}

export default Headers