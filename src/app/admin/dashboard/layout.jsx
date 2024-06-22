"use client";

import React, { useState } from "react";
import {
  DesktopOutlined,
  ProfileOutlined,
  ShopOutlined,
  TeamOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import { Avatar, Breadcrumb, ConfigProvider, Layout, Menu, theme } from "antd";
import Link from "next/link";
const { Header, Content, Footer, Sider } = Layout;

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
    "/admin/dashboard/users",
    "Quản lí khách hàng",
    "2",
    <TeamOutlined />
  ),
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
            itemActiveBg: "white", // Màu nền của mục đang hoạt động
            itemSelectedBg: "white", // Màu nền của mục được chọn
            trackPadding: 4, // Khoảng cách giữa các mục
            itemSelectedColor: "black", // Màu chữ của mục được chọn
            itemColor: "white", // Màu chữ của các mục
            itemHoverBg: "orange", // Màu nền khi di chuột lên mục
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
          {/* <Header className="bg-white flex  items-center px-8 py-10">
            <p className="text-4xl font-semibold"></p>
            <div className="min-w-[200px]  ml-auto bg-white border rounded-xl  flex items-center gap-4 px-10">
              <div>
                <Avatar
                  style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                  size={"large"}
                >
                  T
                </Avatar>
              </div>

              <span className="font-bold text-base">Dương Minh Tấn</span>
              <span className="text-xs text-gray-400">Admin</span>
            </div>
          </Header> */}
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              {/* <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
            </Breadcrumb>
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
