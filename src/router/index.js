import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from '../App';
import Dashboard from '../components/dashboard';
import IndexLayout from '../layout/index';
import Orders from '../pages/orders/orders';
import Login from "../pages/public/auth/login/index";

const Loader = (path) => {
  switch (path) {
    case "/orders":
      return <IndexLayout />;

    default:
      return <Login />
  }
};

class Router extends React.Component {
  render() {
    return (
      // <>
      //   {Loader(window.location.pathname)}
      // </>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default Router;