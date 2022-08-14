import React from "react";
import "antd/dist/antd.css";
import { Table, notification, Skeleton, Tag, Button, Spin, Modal } from "antd";
import OrdersRepository from "../../repositories/orders";
import { Link, BrowserRouter } from 'react-router-dom';
import OrderDetails from "../../components/order-details";



export default class Orders extends React.Component {
  state = {
    orders: null,
    order: [],
    loading: true,
    loadingOrder: false,
    visible: false,
    confirmLoading: false,
    titleModal: "",
    modalText: "",
    actualPrice: 0,
    historic: [],
    totalValue: 0,
  }

  componentDidMount() {
    this.getOrders();
  };


  getOrders = async () => {
    OrdersRepository.getOrders()
      .then(data => {
        if (data) {
          this.setState({
            orders: data,
            loading: false
          });
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

  getOrder = async (symbol) => {
    const order = this.state.orders.find(order => order.symbol === symbol)
    this.setState({ loadingOrder: true, titleModal: symbol, visible: true })
    OrdersRepository.getOrder(symbol, order)
      .then(data => {
        if (data.historic) {
          this.setState({
            // actualPrice: data.price,
            historic: data.historic,
            totalValue: data.totalValue,
            loadingOrder: false
          })
        }
        console.log(data)
      })
      .catch(error => {
        notification.error({
          message: `Erro: ${error}`,
        });
      })
      .finally(() => {
      });
  };

  showModal = () => {
    this.setState({ visible: true })
  };

  handleOk = () => {
    this.setState({ visible: false, confirmLoading: false })
  };

  handleCancel = () => {
    this.setState({ visible: false })
  };

  render() {
    const {
      orders,
      loading,
      visible,
      loadingOrder,
      confirmLoading,
      titleModal,
      modalText,
      actualPrice,
      historic,
      totalValue
    } = this.state;

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
        render: symbol => (
          <BrowserRouter>
            <Link to={`order/${symbol.toLowerCase()}`}>{symbol}</Link>
          </BrowserRouter >
        ),
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
        render: total => `${total} USDT`,
        width: "20%"
      },
      {
        title: "Actual Value",
        dataIndex: "symbol",
        width: "20%",
        render: symbol => (
          <Button onClick={() => this.getOrder(symbol)}>
            view historic orders
          </Button>
        )
      }
    ];

    return (
      <>
        {loading ? (
          <Skeleton active />
        ) : (
          <>
            <Modal
              title={titleModal}
              visible={visible}
              onOk={this.handleOk}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
            >
              {loadingOrder ? (
                <Spin />
              ) : (
                <OrderDetails
                  symbol={titleModal}
                  price={actualPrice}
                  historic={historic}
                  totalValue={totalValue}
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
    );
  }
};