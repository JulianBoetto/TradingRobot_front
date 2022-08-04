import { Button, PageHeader, Row, Statistic, Tag } from 'antd'
import React, { Component } from 'react';

export default class Orders extends Component {
    render() {
        return (
            <>
                <PageHeader
                    onBack={() => window.history.back()}
                    title="Title"
                    tags={<Tag color="blue">Running</Tag>}
                    subTitle="This is a subtitle"
                    extra={[
                        <Button key="3">Operation</Button>,
                        <Button key="2">Operation</Button>,
                        <Button key="1" type="primary">
                            Primary
                        </Button>,
                    ]}
                >
                    <Row>
                        <Statistic title="Status" value="Pending" />
                        <Statistic
                            title="Price"
                            prefix="$"
                            value={568.08}
                            style={{
                                margin: '0 32px',
                            }}
                        />
                        <Statistic title="Balance" prefix="$" value={3345.08} />
                    </Row>
                </PageHeader>
            </>
        );
    }
};