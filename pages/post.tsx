import {ChangeEvent, FC, useState} from "react";
import {Button, Input} from "antd";
import {useObserver} from "mobx-react-lite";
import {observer} from "mobx-react";
import {useStore} from "../store/Store";


const Post: FC = observer(() => {
	const store = useStore();
	const [content, setContent] = useState<string>("")

	const onChangeTitle = ({currentTarget}: ChangeEvent<HTMLInputElement>) => {
		setContent(currentTarget.value);
	};

	return (
		<>
			<div className="form">
				글쓰기<Input onChange={onChangeTitle}/><Button onClick={() => store.addTodo(content)}>입력하기</Button>
			</div>

			<ul className="todoList">
				{
					store.todoData.map((todo) => (
							<div className="box">
								<div>{todo.id}</div>
								<div>{todo.content}</div>
								<div>{todo.checked ? '체크함' : '체크안함'}</div>
							</div>
						)
					)

				}
			</ul>
		</>
	)
})

export default Post