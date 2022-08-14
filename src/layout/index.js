import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import Orders from '../pages/orders/orders';
import Order from '../pages/order/order';
import colours from "../lib/colours";


const { Header, Content, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const Loader = (path) => {
  // if (path === "/orders") {
  // }

  var group = path.split("/")[2]
  switch (path) {
    case "/orders":
      return <Orders></Orders>;      
      // break;

    
  
    default:
      return <Order></Order>
      // break;
  }
};

const PrincipalLayout = () => (
  <Layout
    style={{
      height: '100vh',
      borderRight: 0,
    }}>
    <Header className="header">
      <img src='logo.png' style={{ height: "50px" }}/>
      {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
        theme='dark'
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{
            height: '100%',
            borderRight: 0,
          }}
          items={items2}
        />
      </Sider>
      <Layout
        style={{
          padding: '0 24px 24px',
          // backgroundColor: colours.primary.gray
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Open orders</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            maxHeight: "100vh"
          }}
        >
          {Loader(window.location.pathname)}
        </Content>
      </Layout>
    </Layout>
  </Layout>
);

export default PrincipalLayout;