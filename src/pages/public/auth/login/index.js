import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import LoginForm from '../../../../components/login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import colours from "../../../../lib/colours"



const theme = createTheme();

export default class Login extends Component {
    render() {

        return (
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }} style={{ backgroundColor: colours.primary.gray }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    {/* <CssBaseline /> */}
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        component={Paper}
                        // elevation={2}
                        square display="flex"
                        justifyContent="center"
                        alignItems="center"
                        style={{
                            backgroundColor: colours.primary.gray
                        }}
                    >
                        <LoginForm />
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}