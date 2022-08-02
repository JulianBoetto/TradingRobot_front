import React, { Component } from 'react';

import {
    Form,
    Input
} from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
// import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import moment from 'moment';
// import styles from './style.module.scss';

const styles = {
    header: "",
    header_content: "",
    logo: ""
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
                <Grid container component="main" sx={{ height: '100vh' }} style={{ backgroundColor: "#282c34"}}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={3}
                        md={4}
                        // sx={{
                        //     backgroundImage: 'url()',
                        //     backgroundSize: 'cover',
                        //     backgroundPosition: 'center',
                        // }}
                    />
                    <Grid item xs={12} sm={6} md={4} component={Paper} elevation={8} square>
                        <Box
                            sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <div className={styles.header}>
                                <div className={styles.header_content}>
                                    <div className={styles.logo}>
                                        <Link to="/">
                                            <img src="logo.png" alt="Logo" style={{ width: "50px" }} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {tokenLoading ? (
                                <h4 className="text-uppercase" style={{ textAlign: 'center' }}>
                                    <strong>Carregando...</strong>
                                </h4>
                                ) : (
                                <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
                                    <Form.Item label="E-mail" fullWidth autoFocus>
                                        <Input size="default" />
                                    </Form.Item>
                                    <span data-icon="ant-design:eye-outlined" />
                                    <Form.Item label="Senha">
                                        <Input.Password
                                            iconRender={visible =>
                                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                            }
                                        />
                                    </Form.Item>
                                    <div className={styles.formBox}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        // loading={loading}
                                        >
                                            Entrar
                                        </Button>
                                    </div>
                                </Form>
                                )}
                            </div>
                            <Grid container>
                                <Grid item xs>
                                    <div className={styles.boxForgot}>
                                        {/* <Link to="/forgot">Esqueceu sua senha?</Link> */}
                                    </div>
                                </Grid>
                            </Grid>
                            <span className={styles.footer}>
                                Trading Robot &copy; {anoAtual} - Todos os direitos reservados.
                            </span>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}