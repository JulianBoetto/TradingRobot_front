import React, { useEffect, useState } from 'react';
import {
    Button,
    notification,
    Spin,
    Modal,
    Select,
    Input
} from 'antd';
import Symbols from "../../repositories/symbols";
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

function Notifications() {
    const [symbols, setSymbols] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [symbol, setSymbol] = useState("");
    const [pair, setPair] = useState("USDT");

    const getSymbols = async () => {
        const token = sessionStorage.getItem("ACCESS_TOKEN");
        Symbols.getSymbols(token)
            .then(data => {
                if (data) {
                    setSymbols(data);
                }
            })
            .catch(error => {
                notification.error({
                    message: `Erro: ${error}`,
                });
            })
            .finally(() => {
                setLoading(false);
                setIsModalOpen(false);
                setSymbol("");
            });
    };

    const addSymbol = async () => {
        setLoading(true);
        const token = sessionStorage.getItem("ACCESS_TOKEN");
        Symbols.addSymbol(token, symbol, pair)
            .then(data => {
                getSymbols();
            })
            .catch(error => {
                notification.error({
                    message: `Erro: ${error}`,
                });
            })
            .finally(() => {
            });
    };

    const removeSymbol = async (symbol, pair) => {
        setLoading(true);
        const token = sessionStorage.getItem("ACCESS_TOKEN");
        Symbols.removeSymbol(token, symbol, pair)
            .then(data => {
                getSymbols();
            })
            .catch(error => {
                notification.error({
                    message: `Erro: ${error}`,
                });
            })
            .finally(() => {
            });
    };

    const showConfirm = (symbol, pair) => {
        confirm({
            title: 'Do you Want to delete this item?',
            icon: <ExclamationCircleOutlined />,
            content: `${symbol}/${pair}`,

            onOk() {
                removeSymbol(symbol, pair);
            },

            onCancel() {
            },
        });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        const isRepeat = symbols.find(element => element.symbol === symbol && element.pair === pair);        
        if (isRepeat) {
            setSymbol("");
            return notification.error({ message: `The item already exists` })
        }
        addSymbol();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (value) => {
        setPair(value);
    };

    const handleChangeSymbol = (e) => {
        const symbol = e.target.value.toUpperCase();
        setSymbol(symbol);
    };

    useEffect(() => {
        getSymbols()
    }, [])

    return (
        <div className="list-group list-group-checkable d-grid gap-2 border-0 w-auto m-5">
            {
                loading ? (<Spin />) : (
                    symbols.map(el => (
                        <div key={el._id} className="list-group-item rounded-3 py-3 m-3">
                            <label htmlFor="listGroupCheckableRadios1">
                                {el.symbol}/{el.pair}
                                <span className="d-block small opacity-50"></span>
                                <Button value={`${el.symbol}/${el.pair}`} onClick={() => showConfirm(el.symbol, el.pair)} type="danger">Remove</Button>
                            </label>
                        </div>
                    ))
                )
            }
            <Button type="primary" onClick={showModal}>
                Add
            </Button>
            <Modal title="Add new pair" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {
                    loading ? (
                        <Spin />
                    ) : (
                        <>
                            <Input value={symbol} onChange={handleChangeSymbol} placeholder={"Add new symbol"} />
                            <Select onChange={handleChange} defaultValue={pair}>
                                <Select.Option value="USDT">usdt</Select.Option>
                                <Select.Option value="BTC">btc</Select.Option>
                            </Select>
                        </>
                    )
                }
            </Modal>
            <Modal title="Add new pair" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {
                    loading ? (
                        <Spin />
                    ) : (
                        <>
                            <Input value={symbol} onChange={handleChangeSymbol} placeholder={"Add new symbol"} />
                            <Select onChange={handleChange} defaultValue={pair}>
                                <Select.Option value="USDT">usdt</Select.Option>
                                <Select.Option value="BTC">btc</Select.Option>
                            </Select>
                        </>
                    )
                }
            </Modal>
        </div >
    )
}

export default Notifications;