import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ApexChart from '../components/chart';
import Dashboard from '../components/dashboard';
import Orders from '../pages/orders/orders';
import Login from "../pages/public/auth/login/index";

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} >
            <Route path='orders' element={<Orders />} />
            <Route path='chart' element={<ApexChart />} />
          </Route>
          <Route
            path="*"
            element={<Login />}
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default Router;