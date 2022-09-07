import React, { useEffect, useState } from 'react';
import "./Dashboard.css";
import Orders from '../../pages/orders/orders';
import ApexChart from '../chart';
import Candles from '../../repositories/candles';
import Candle from '../../utils/candle';
import { Spin } from 'antd';
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import {
    Routes,
    Route,
    Link
} from "react-router-dom";

function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [symbol, setSymbol] = useState("BTCUSDT");
    const [interval, setStateInterval] = useState("1m");

    const onSymbolChange = (event) => {
        setSymbol(event.target.value)
    }

    const onIntervalChange = (event) => {
        setStateInterval(event.target.value)
    }

    useEffect(() => {
        !loading ?? setLoading(true);
        Candles.getKlines({ symbol, interval })
            .then(res => {
                setData(res);
                setLoading(false);
            })
            .catch(error => console.log(error));
    }, [symbol, interval],);

    const { lastJsonMessage } = useWebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLocaleLowerCase()}@kline_${interval}`, {
    onOpen: () => console.log("Connected to Binance"),
    onError: (err) => console.log(err),    
    shouldReconnect: () => 3000,
    onMessage: () => {
      if (lastJsonMessage) {
        const newCandle = new Candle(lastJsonMessage.k.t, lastJsonMessage.k.o, lastJsonMessage.k.h, lastJsonMessage.k.l, lastJsonMessage.k.c)
        let newData = [...data];

        if(lastJsonMessage.k.x === false) {
          newData[newData.length - 1] = newCandle;
        } else {
          newData.splice(0, 1);
          newData.push(newCandle);
        }
        setData(newData);
      }
    },
  });


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
                            </ul>
                        </div>
                    </nav>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Routes>
                            <Route
                                path="/orders"
                                element={
                                    <>
                                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                                            <h1 className="h2">Orders</h1>
                                        </div>
                                        <Orders />
                                    </>
                                }
                            />
                            <Route
                                path="/chart"
                                element={
                                    <>
                                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                                            <h1 className="h2">Chart</h1>
                                        </div>
                                        <div id="chart">
                                            <div className="container">
                                                <div className="row">
                                                    <select className="form-select m-3" onChange={onSymbolChange}>
                                                        <option value="BTCUSDT">BTC/USDT</option>
                                                        <option value="ETHUSDT">ETH/USDT</option>
                                                        <option value="ETCUSDT">ETC/USDT</option>
                                                    </select>

                                                </div>
                                                <div className="row">
                                                    <select className="form-select m-3" onChange={onIntervalChange}>
                                                        <option value="1m">1m</option>
                                                        <option value="15m">15m</option>
                                                        <option value="1d">1d</option>
                                                    </select>
                                                </div>
                                            </div>
                                            {loading ? (
                                                <Spin />
                                            ) : (
                                                <ApexChart
                                                    data={data}
                                                    loading={loading}
                                                />
                                            )}
                                        </div>
                                    </>
                                } />
                        </Routes>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Dashboard;