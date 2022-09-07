import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table, notification, Skeleton, Tag, Button, Spin, Modal } from "antd";
import OrdersRepository from "../../repositories/orders";
import { Link, BrowserRouter } from 'react-router-dom';
import OrderDetails from "../../components/order-details";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";


function Orders() {
  const [orders, setOrders] = useState(null);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [modalText, setModalText] = useState("");
  const [actualPrice, setActualPrice] = useState(0);
  const [historic, setHistoric] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [loadingWebsocket, setLoadingWS] = useState(true);
  const [totalQty, setTotalQty] = useState(0);
  const [isOpenWS, setIsOpenWS] = useState(true);
  let ws;

  
  
  
  // const { lastJsonMessage, sendJsonMessage } = useWebSocket(`wss://stream.binance.com:9443/ws/ticker`, {
  //   onOpen: () => console.log("Connected to Binance"),
  //   onError: (err) => console.log(err),    
  //   shouldReconnect: () => 3000,
  //   onMessage: () => {
  //     if (lastJsonMessage) {
  //       console.log(lastJsonMessage)
  //     }
  //   },
  // },isOpenWS);

  // const symbol = "BTCUSDT"

  // const onConnectWS = (symbol) => {
  //   sendJsonMessage({
  //     "method": "SUBSCRIBE",
  //     "params": [
  //       `${symbol.toLowerCase()}@aggTrade`
  //     ],
  //     "id": 1
  //   })
  // }


  const cancelWebsocket = () => {
    // ws.close();
  }

  const getOrders = async () => {
    OrdersRepository.getOrders()
      .then(data => {
        if (data) {
          console.log(data)
          setOrders(data);
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

  const getOrder = async (symbol) => {
    // const order = this.state.orders.find(order => order.symbol === symbol)

    // this.setState({ loadingOrder: true, titleModal: symbol, visible: true })
    OrdersRepository.getOrder(symbol)
      .then(data => {
        if (data.historic) {
          // this.setState({
          //   totalQty: data.totalQty,
          //   historic: data.historic,
          //   totalValue: data.totalValue,
          //   loadingOrder: false
          // })
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

  const getHistoricOrder = async (symbol) => {
    
    // !isOpenWS ?? setIsOpenWS(true);
    // onConnectWS(symbol);
    getOrder(symbol);
    setLoadingOrder(true);
    setTitleModal(symbol);
    setVisible(true);
    OrdersRepository.getHistoricOrder(symbol)
      .then(data => {
        if (data.historic) {
          setTotalQty(data.totalQty);
          setHistoric(data.historic);
          setTotalValue(data.totalValue);
          setLoadingOrder(false);
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

  const handleOk = () => {
    setIsOpenWS(false);
    setLoadingWS(true);
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setLoadingWS(true);
    setIsOpenWS(false);
    setVisible(false);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "formatTime",
      render: formatTime => formatTime,
      width: "20%",
    },
    {
      title: "Pair",
      dataIndex: "symbol",
      // render: symbol => (
      //   <BrowserRouter>
      //     <Link to={`order/${symbol.toLowerCase()}`}>{symbol}</Link>
      //   </BrowserRouter >
      // ),
      width: "20%",
    },
    {
      title: "Side",
      dataIndex: "side",
      render: (_, { side }) => {
        let color = "red";
        if (side !== 'SELL') {
          color = 'green';
        }

        return (
          <Tag color={color} key={side}>
            {side}
          </Tag>
        );
      },
      width: "20%"
    }, {
      title: "Price",
      dataIndex: "price",
      render: price => price,
      width: "20%"
    },
    {
      title: "Amount",
      dataIndex: "origQty",
      render: amount => amount,
      width: "20%"
    },
    {
      title: "Total",
      dataIndex: "total",
      render: total => `${total}`,
      width: "20%"
    },
    {
      title: "Actual Value",
      dataIndex: "symbol",
      width: "20%",
      render: symbol => (
        <Button onClick={() => getHistoricOrder(symbol)}>
          view historic orders
        </Button>
      )
    }
  ];

  useEffect(() => {
    getOrders();
  }, [],
  );

  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <Modal
            title={titleModal}
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            {loadingOrder ? (
              <Spin />
            ) : (
              <OrderDetails
                symbol={titleModal}
                price={actualPrice}
                historic={historic}
                totalValue={totalValue}
                loadingWebsocket={loadingWebsocket}
                actualPrice={actualPrice}
                totalQty={totalQty}
              />
            )}
          </Modal>
          <Table
            columns={columns}
            rowKey={orders => orders.orderId}
            dataSource={orders}
            pagination={{ defaultPageSize: 6 }}
          />
        </>
      )}
    </>
  )
}

export default Orders