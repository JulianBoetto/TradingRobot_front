import React, { Component } from 'react';

import {
    Form,
    Input
} from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
import LoginForm from '../../../../components/login';
// import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import moment from 'moment';
// import styles from './style.module.scss';

const styles = {
    header: "",
    header_content: "",
    logo: "",
};

const tokenLoading = false;

const anoAtual = moment(new Date()).format('YYYY');

const theme = createTheme();

export default class Login extends Component {
    onSubmit = event => {
        event.preventDefault();
        const { form, login, history } = this.props;
        form.validateFields((error, values) => {
            if (!error) {
                login(values, history);
            }
        });
    };

    render() {

        return (
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }} style={{ backgroundColor: "#282c34" }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <CssBaseline />
                    {/* <Grid
                        item
                        xs={false}
                        sm={3}
                        md={4}
                        // sx={{
                        //     backgroundImage: 'url()',
                        //     backgroundSize: 'cover',
                        //     backgroundPosition: 'center',
                        // }}
                    /> */}
                    <Grid item xs={12} sm={6} md={4} component={Paper} elevation={2} square display="flex"
                        justifyContent="center"
                        alignItems="center"
                        // minHeight="100vh"
                        height='0vh'
                    >
                        <LoginForm />
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}