import {FC} from "react";
import {AlignRightOutlined, EditOutlined} from "@ant-design/icons";
import style from '../styles/chat.module.css'

function ChatRooms() {
	return (
		<div className={style.chatRooms}>
			<section className={style.chatRooms__header}>
				<h1 className={style.chatRooms__title}>Chat</h1>
				<div className={style.chatRooms__buttons}>
					<AlignRightOutlined/>
					<EditOutlined/>
				</div>
			</section>
			<section>
				<ul>
					<li>

					</li>
				</ul>
			</section>
		</div>
	);
}

const ChatDetails: FC = () => {
	return (
		<div className="chat-detail" style={{backgroundColor: "#f3f2f1"}}>
			<div className="chat-detail__header">

			</div>
		</div>
	)
}

const chat: FC = () => {

	return (
		<div style={{display: "flex"}}>
			<ChatRooms/>

			<ChatDetails/>
		</div>
	)
}

export default chat