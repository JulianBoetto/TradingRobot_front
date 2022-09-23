import React from 'react';
import "./Dashboard.css";
import {
    Link,
    Outlet
} from "react-router-dom";
import { logout } from '../../services/auth';

function Dashboard(props) {

    return (
        <>
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <img src='/logo.png' style={{ height: "50px" }} />
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/dashboard">Trading Robot</a>
                <input className="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search" />
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        {/* <Link
                            className="nav-link px-3"
                            to={"/"}
                            onClick={()=>logout}
                        >Sign out</Link> */}
                        <a
                            className="nav-link px-3"
                            onClick={logout}
                            href="/"
                        >
                            Logout
                        </a>
                    </div>
                </div>
            </header>

            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky pt-3 sidebar-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard/orders">
                                        <span data-feather="file" className="align-text-bottom"></span>
                                        Orders
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/dashboard/chart">
                                        <span data-feather="home" className="align-text-bottom"></span>
                                        Chart
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/dashboard/notifications">
                                        <span data-feather="home" className="align-text-bottom"></span>
                                        Notifications
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Outlet />
                        {/* <Routes>
                            <Route
                                path="/orders"
                                element={
                                    <>
                                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                                            <h1 className="h2">Orders</h1>
                                        </div>
                                        <Orders
                                            symbol={symbol}
                                        />
                                    </>
                                }
                            />
                            <Route
                                path="/chart"
                                element={
                                    <>
                                        
                                    </>
                                } />
                        </Routes> */}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Dashboard;