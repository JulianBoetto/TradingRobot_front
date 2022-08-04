import { Button, PageHeader, Row, Statistic, Tag, notification } from 'antd'
import React, { Component } from 'react';
import OrdersRepository from '../../repositories/orders';


export default class Orders extends Component {
    state = {
        ordersData: [],
    };

    componentDidMount() {
        this.getOrders();
    };

    getOrders = async () => {
        OrdersRepository.getOrders()
            .then(data => {
                console.log(data)
                this.setState({
                    ordersData: data
                })
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
            ordersData
        } = this.state;

        const details = () =>
            ordersData.map(order => (
                <PageHeader
                    onBack={() => window.history.back()}
                    title={order.symbol}
                    tags={<Tag color="blue">Running</Tag>}
                    subTitle="This is a subtitle"
                    extra={[
                        <Button key="3">Operation</Button>,
                        <Button key="2">Operation</Button>,
                        <Button key="1" type="primary">
                            Primary
                        </Button>,
                    ]}
                    key={order.clientOrderId}
                >
                    <Row>
                        <Statistic title="Status" value={order.side} />
                        <Statistic
                            title="Price"
                            prefix="$"
                            value={order.price}
                            style={{
                                margin: '0 32px',
                            }}
                        />
                        <Statistic title="Balance" prefix="$" value={3345.08} />
                    </Row>
                </PageHeader>
            ))



        return (
            <div style={{
                // backgroundColor: "red"
            }}>
                {details()}
            </div>
        );
    }
};