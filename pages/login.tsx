import React from 'react';
import {Button, Checkbox, Form, Input} from 'antd';
import {GithubFilled, GoogleCircleFilled} from "@ant-design/icons";
import {GetServerSideProps} from "next";
import {loginApi} from "../api/auth/auth.api";
import {useRouter} from "next/router";
import {userApi} from "../api/user/user.api";

type Props = {};

type LoginDto = {
	email: string
	password: string
}

const login = (props: Props) => {
	const router = useRouter()

	const onFinish = async ({email, password}: LoginDto) => {
		try {
			await loginApi.fetch({email, password})

			return await router.replace('/').catch(console.error)

		} catch (e) {
			console.log(e, 'error')
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	const goSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
		console.log(e)
	}

	return (
		<div style={{
			backgroundColor: "#fff",
			width: "100%",
			height: "80vh",
			padding: "50px",
			display: "flex",
			flexDirection: "column"
		}}>
			<div className="form-box" style={{
				width: "50%",
				height: "auto",
				padding: "20px",
				display: "flex",
				flexDirection: "column",
				border: "1px solid red"
			}}>
				<Form
					name="basic"
					labelCol={{span: 8}}
					wrapperCol={{span: 16}}
					initialValues={{remember: true}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item
						label="Email"
						name="email"
						rules={[{required: true, message: 'Please input your username!'}]}
					>
						<Input/>
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[{required: true, message: 'Please input your password!'}]}
					>
						<Input.Password/>
					</Form.Item>

					<Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<Form.Item wrapperCol={{offset: 8, span: 16}}><Button type="primary" htmlType="submit">go
						Login</Button></Form.Item>
					<Form.Item wrapperCol={{offset: 8, span: 16}}><Button type="ghost" onClick={goSignUp}>go Sign
						up</Button></Form.Item>
					<Form.Item><Button icon={<GithubFilled/>}>Github</Button></Form.Item>
					<Form.Item><Button icon={<GoogleCircleFilled/>}>Github</Button></Form.Item>
				</Form>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({req, res, previewData}) => {

	try {
		await userApi.fetch()

		return {
			redirect: {
				destination: "/login"
			},
			props: {}
		}

	} catch (e) {
		return {
			props: {}
		}
	}

}

export default login