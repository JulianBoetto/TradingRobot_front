import React from 'react';
import { Link } from "react-router-dom";
import { Button, Form, Input, Spin } from 'antd';
import Auth from "../../repositories/auth";
import jwtController from '../../utils/jwt';


const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


export default class LoginForm extends React.Component {
    state = {
        email: "",
        password: "",
        loading: false
    };

    onFinish = async (values) => {
        const login = await Auth.signInWithEmailAndPassword(values);
        jwtController.compare(login.access_token)
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
                onFinish={this.onFinish}
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
                    <Button
                        ghost
                        htmlType="submit"
                    >
                        <Link to="/dashboard">Login</Link>
                    </Button>
                </Form.Item>
            </Form>
        );
    }
};