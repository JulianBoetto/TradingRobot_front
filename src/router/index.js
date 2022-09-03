import React from 'react';
// import RouteAuthorization from './authorizer';
import IndexLayout from '../layout/index';
import Login from "../pages/public/auth/login/index";
const login = true;


class Router extends React.Component {
  render() {
    return (
      <>
        {login ? (<Login />) : (<IndexLayout />)}
      </>
    );
  }
}

export default Router;