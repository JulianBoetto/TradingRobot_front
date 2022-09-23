import React, { useEffect, useState } from 'react';
import { Button, notification, Spin } from 'antd';
import Symbols from "../../repositories/symbols";

function Notifications() {
    const [symbols, setSymbols] = useState([]);
    const [loading, setLoading] = useState(true);

    const getSymbols = async () => {
        const token = sessionStorage.getItem("ACCESS_TOKEN");
        Symbols.getSymbols(token)
            .then(data => {
                if (data) {
                    setSymbols(data);
                    setLoading(false);
                }
            })
            .catch(error => {
                notification.error({
                    message: `Erro: ${error}`,
                });
            })
            .finally(() => {
            });
    };


    useEffect(() => {
        getSymbols()
    }, [])
    return (
        <div className="list-group list-group-checkable d-grid gap-2 border-0 w-auto m-5">
            {
                loading ? (<Spin />) : (
                    symbols.map(el => (
                        <label key={el._id} className="list-group-item rounded-3 py-3" htmlFor="listGroupCheckableRadios1">
                            {el.symbol}/{el.pair}
                            <span className="d-block small opacity-50"></span>
                        </label>
                    ))
                )
            }
            <Button >
                Add
            </Button>
        </div>
    )
}

export default Notifications;