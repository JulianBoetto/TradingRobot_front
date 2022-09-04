import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
    Link
} from "react-router-dom";
import "./Dashboard.css";
import Orders from '../../pages/orders/orders';
import App from '../../App';
import ApexChart from '../chart';

const { Header, Content, Sider } = Layout;

const Loader = (path) => {
    // if (path === "/orders") {
    // }


    // switch (path) {
    //     case "/orders":
    //         return <Orders></Orders>;
    //     // break;



    //     default:
    //         return <>
    //             
    //         </>
    //     // break;
    // }
    // return <Orders />
};

const Dashboard = () => {




    return (
        <>
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <img src='logo.png' style={{ height: "50px" }} />
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/dashboard">Trading Robot</a>
                <input className="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search" />
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <a className="nav-link px-3" href="/login">Sign out</a>
                    </div>
                </div>
            </header>

            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky pt-3 sidebar-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page">
                                        <span data-feather="home" className="align-text-bottom"></span>
                                        Dashboard
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link">
                                        <span data-feather="file" className="align-text-bottom"></span>
                                        Orders
                                    </a>
                                </li>

                            </ul>
                            <div>

                                {/* <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                                    <span>Saved reports</span>
                                    <a className="link-secondary" href="#" aria-label="Add a new report">
                                        <span data-feather="plus-circle" className="align-text-bottom"></span>
                                    </a>
                                </h6> */}

                            </div>
                        </div>
                    </nav>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Dashboard</h1>
                            {/* <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group me-2">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                                </div>
                                <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                                    <span data-feather="calendar" className="align-text-bottom"></span>
                                    This week
                                </button>
                            </div> */}
                        </div>
                            <ApexChart />
                        
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                        <h1 className="h2">Orders</h1>
                    
                    </div>    
                            

                            <Orders />


                    </main>
                </div>
            </div>
        </>
    );
};

export default Dashboard;