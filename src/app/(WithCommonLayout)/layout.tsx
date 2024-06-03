"use client";
import { Layout, Menu, MenuProps } from "antd";
import Link from "next/link";
import { ReactNode } from "react";
const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: "Dashboard",
    label: "Dashboard",
    children: [
      {
        key: "All Projects",
        label: <Link href='/all-projects'>All Projects</Link>,
      },
      {
        key: "Create Project",
        label: <Link href='/create-project'>Create Project</Link>,
      },
      {
        key: "Upload Resume",
        label: <Link href='/upload-resume'>Upload Resume</Link>,
      },
      {
        key:'Create Blog',
        label: <Link href='/create-blog'>Create Blog</Link>,
      },{
        key:'All Blogs',
        label: <Link href='/all-blogs'>All Blogs</Link>,
      }
    ],
  },
];
const HomePage = ({children}:{children:ReactNode}) => {
  return (
    <Layout style={{ backgroundColor: "#008080" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
};

export default HomePage;
