import React from "react";
import "antd/dist/antd.css";
import { Table, notification, Skeleton, Tag, Button } from "antd";
import OrdersRepository from "../../repositories/orders";
import { Link } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from "websocket";



// console.log(client)

export default class Order extends React.Component {
  state = {
    order: [],
    loadingOrder: true,
  };



  componentDidMount() {
    // this.getOrder();
    this.onConnectWS("etcusdt");
  };

  

  render() {
    const {
      order,
      loadingOrder
    } = this.state;

    const {
      teste
    } = this.props;

    return (
      <>
        {loadingOrder ? (
          <Skeleton active />
        ) : (
          <div>{order.p}</div>
        )}
      </>
    );
  }
};