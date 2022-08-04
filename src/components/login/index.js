import React from 'react';
import { Button, Form, Input } from 'antd';
import Auth from "../../repositories/auth";

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default class LoginForm extends React.Component {
    state = {
        email: "",
        password: "",
        loading: true
    };

    onSubmit = async (event) => {
        event.preventDefault();
        const login = await Auth.signInWithEmailAndPassword(this.state.email, this.state.password)
    };





    render() {
        const {
            loading
        } = this.state


        return (
            <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <img
                        src='logo.png'
                        style={{
                            width: "150px",
                        }}>
                    </img>
                </Form.Item>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Button ghost htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
};