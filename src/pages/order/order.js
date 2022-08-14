import React from "react";
import "antd/dist/antd.css";
import { Skeleton} from "antd";



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