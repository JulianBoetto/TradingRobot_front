import React from "react";
import "antd/dist/antd.css";
import { Table, Skeleton, Tag, Card, Tabs, Spin } from "antd";
const { TabPane } = Tabs;
const gridStyle = {
  width: '50%',
  textAlign: 'center',
};

export default class OrderDetails extends React.Component {
  render() {
    const {
      symbol,
      price,
      loadingOrder,
      historic,
      totalValue,
      loadingWebsocket,
      actualPrice,
      totalQty,
    } = this.props;

    const columns = [
      {
        title: "Date",
        dataIndex: "time",
        render: time => time
      },
      {
        title: "Price",
        dataIndex: "price",
        render: price => price
      },
      {
        title: "Side",
        dataIndex: "isBuyer",
        render: (_, { isBuyer }) => {
          let color = "red";
          let key = "SELL";
          if (isBuyer) {
            color = 'green'
            key = "BUY"
          }

          return (
            <Tag color={color} key={key}>
              {key}
            </Tag>
          )
        }
      },
      {
        title: "Quantity",
        // dataIndex: "qty",
        render: (_, { qty, commission }) => {
          // let newQty = Number(qty) - Number(commission);
          // console.log(Number(qty), Number(commission))
          return qty
        }
      },
      {
        title: "Total",
        dataIndex: "quoteQty",
        render: quoteQty => quoteQty
      }
    ];

    const columnsActualValue = [
      {
        title: "Date",
        dataIndex: "time",
        render: time => time
      },
      {
        title: "Price",
        dataIndex: "price",
        render: price => price
      },
      // {
      //   title: "Side",
      //   dataIndex: "isBuyer",
      //   render: (_, { isBuyer }) => {
      //     let color = "red";
      //     let key = "SELL";
      //     if (isBuyer) {
      //       color = 'green'
      //       key = "BUY"
      //     }

      //     return (
      //       <Tag color={color} key={key}>
      //         {key}
      //       </Tag>
      //     )
      //   }
      // },
      {
        title: "Quantity",
        // dataIndex: "qty",
        render: (_, { qty, commission }) => {
          // let newQty = Number(qty) - Number(commission);
          // console.log(Number(qty), Number(commission))
          return qty
        }
      },
      {
        title: "Total",
        dataIndex: "quoteQty",
        render: quoteQty => quoteQty
      }
    ]


    return (
      <>
        {loadingOrder ? (
          <Skeleton active />
        ) : (
          <>
            <Tabs defaultActiveKey="1" type="card" size={"small"}>
              <TabPane tab="Historic Orders" key="1">
                <Table
                  columns={columns}
                  dataSource={historic}
                  pagination={{
                    pageSize: 50,
                  }}
                  rowKey={orders => orders.id}
                  scroll={{
                    y: 240,
                  }}
                />
                <Card type="inner" title="Total" style={totalValue < 0 ? { color: 'red' } : { color: 'green' }}>
                  
                  <Card.Grid style={gridStyle}>$ {totalValue} USDT</Card.Grid>
                  <Card.Grid style={gridStyle}>{totalQty}</Card.Grid>
                </Card>
              </TabPane>
              <TabPane
                tab="Actual value"
                key="2"
                disabled={loadingWebsocket}
              >
                {/* {actualPrice} */}
                <Table
                  columns={columns}
                  dataSource={historic}
                  pagination={{
                    pageSize: 50,
                  }}
                  rowKey={orders => orders.id}
                  scroll={{
                    y: 240,
                  }}
                />
              </TabPane>
            </Tabs>
          </>
        )}
      </>
    );
  }
};