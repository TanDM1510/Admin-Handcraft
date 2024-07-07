"use client";

import React, { useState } from "react";
import {
  DesktopOutlined,
  ProfileOutlined,
  ShopOutlined,
  TeamOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from "antd";
import Link from "next/link";
const { Content, Footer, Sider } = Layout;

function getItem(href, label, key, icon, children) {
  return {
    label: href ? <Link href={href}>{label}</Link> : label,
    key,
    icon,
    children,
  };
}
const items = [
  getItem("/admin/dashboard", "Bảng điều khiển", "1", <DesktopOutlined />),

  getItem(
    "/admin/dashboard/products",
    "Quản lí sản phẩm",
    "sub1",
    <ShopOutlined />
  ),
  getItem(
    "/admin/dashboard/festivals",
    "Quản lí lễ hội",
    "sub2",
    <ProfileOutlined />
  ),
  getItem(
    "/admin/dashboard/orders",
    "Quản lí đơn hàng",
    "9",
    <TruckOutlined />
  ),
];

const DashBoardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            triggerBg: "white",
            triggerColor: "black",
          },
          Menu: {
            itemActiveBg: "white",
            itemSelectedBg: "white",
            trackPadding: 4,
            itemSelectedColor: "black",
            itemColor: "white",
            itemHoverBg: "orange",
            itemActiveBg: "white",
            groupTitleColor: "white",
          },
        },

        token: {
          fontFamily: "inherit",
        },
      }}
    >
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ backgroundColor: "black", color: "white" }}
        >
          <div className="flex justify-center items-center py-10">
            {!collapsed ? (
              <Link href={"/auth"}>
                <p className="font-bold text-3xl text-center custom-font ">
                  HandCraft
                </p>
              </Link>
            ) : (
              <Link href={"/auth"}>
                <p className="font-bold text-3xl text-center custom-font ">H</p>
              </Link>
            )}
          </div>

          <Menu
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            style={{ backgroundColor: "black", color: "white" }}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            ></Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                height: "86vh",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
              className="overflow-auto"
            >
              {children}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default DashBoardLayout;
