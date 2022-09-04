import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import IndexLayout from '../layout/index';
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
          <Route path='/*' element={<Login />}/>
          <Route path='/orders' element={<IndexLayout />}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default Router;