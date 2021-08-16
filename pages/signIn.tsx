import * as React from 'react';
import {Button, Input} from "antd";
import {useState} from "react";
import {loginApi} from "../api/auth/auth.api";
import {useRouter} from "next/router";

type Props = {};

const signIn = (props: Props) => {

	const router = useRouter();
	const [loginInfo, setLoginInfo] = useState({
		username: '',
		password: ''
	})

	const joinGithub = (event: React.MouseEvent<HTMLElement>): Window | null => {
		event.preventDefault();
		
		const clientId = process.env['NEXT_PUBLIC_client_id'];

		return window.open(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=http://localhost:3000/callback`)
	}

	const doLogin = async () => {
		const { username: email, password } = loginInfo;
		if (!email || !password){
			return window.alert('이메일 또는 패스워드를 입력해주 세요')
		}
		try {
			await loginApi.fetch({email, password})
			return router.replace('/')

		} catch (e) {
			if (!e.response){
				alert('네트워크 에러입니다')
			}
		}
	}

	const onChangeInput = ({currentTarget: {name, value}}: React.FormEvent<HTMLInputElement>) => {
		setLoginInfo((prev) => {
			return {
				...prev,
				[name]: value
			}
		})

	}

	return (
		<div className="container h-full border flex flex-col">
			<div className="h-full flex flex-col">
				<Input name='username' onChange={onChangeInput}/>
				<Input name='password' onChange={onChangeInput}/>
				<Button.Group>
					<Button onClick={doLogin} htmlType={'button'} type='primary'>
						로그인
					</Button>
				</Button.Group>

				<button className="xl:w-20 h-10 border bg-black-200" onClick={joinGithub}>Continue with GitHub</button>
				<button className="xl:w-20 border bg-yellow-100">Continue with KaKaoTalk</button>
			</div>
		</div>
	)
}

export default signIn;


