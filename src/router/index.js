import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ApexChart from '../components/chart';
import Dashboard from '../components/dashboard';
import Orders from '../components/orders/orders';
import Login from "../pages/public/auth/login/index";
import Notifications from '../components/notifications/Notifications';
import ProtectedRoutes from './protectedRoutes';
import { verify } from '../services/auth';

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route element={<ProtectedRoutes verify={verify}/>} >
            <Route path='/dashboard' element={<Dashboard />} >
              <Route path='orders' element={<Orders />} />
              <Route path='chart' element={<ApexChart />} />
              <Route path='notifications' element={<Notifications />} />
            </Route>
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