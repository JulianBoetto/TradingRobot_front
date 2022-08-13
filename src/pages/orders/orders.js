import React from "react";
import "antd/dist/antd.css";
import { Table, notification, Skeleton } from "antd";
import OrdersRepository from "../../repositories/orders"

export default class Orders extends React.Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    this.getOrders();
  };

  getOrders = async () => {
    OrdersRepository.getOrders()
      .then(data => {
        if(data)
        this.setState({
          orders: data,
          loading: false
        });
      })
      .catch(error => {
        notification.error({
          message: `Erro: ${error}`,
        });
      })
      .finally(() => {
      });
  }

  render() {
    const {
      orders,
      loading
    } = this.state;
    
    const columns = [
      {
        title: "Date",
        dataIndex: "formatTime",
        sorter: true,
        render: formatTime => formatTime,
        width: "20%"
      },
      {
        title: "Pair",
        dataIndex: "symbol",
        sorter: true,
        render: symbol => symbol,
        // filters: [
        //   { text: "Male", value: "male" },
        //   { text: "Female", value: "female" }
        // ],
        width: "20%"
      },
      {
        title: "Side",
        dataIndex: "side",
        sorter: true,
        render: side => side,
        // filters: [
        //   { text: "Male", value: "male" },
        //   { text: "Female", value: "female" }
        // ],
        width: "20%"
      }, {
        title: "Price",
        dataIndex: "price",
        sorter: true,
        render: price => price,
        // filters: [
        //   { text: "Male", value: "male" },
        //   { text: "Female", value: "female" }
        // ],
        width: "20%"
      },
      {
        title: "Amount",
        dataIndex: "origQty",
        sorter: true,
        render: amount => amount,
        // filters: [
        //   { text: "Male", value: "male" },
        //   { text: "Female", value: "female" }
        // ],
        width: "20%"
      },
      {
        title: "Total",
        dataIndex: "total",
        sorter: true,
        render: total => total,
        // filters: [
        //   { text: "Male", value: "male" },
        //   { text: "Female", value: "female" }
        // ],
        width: "20%"
      },
    ];

    return (
      <>
        {loading ? (
          <Skeleton active/>
        ) : (
          <Table
            columns={columns}
            rowKey={orders => orders.orderId}
            dataSource={orders}
            pagination={false}
          />
        )}
      </>
    );
  }
};