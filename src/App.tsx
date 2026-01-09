import React from "react";
import { Layout } from "antd";
import UserList from "./components/UserList";

const { Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Layout className="h-screen flex flex-col">
      <Content className="p-4 md:p-8 bg-gray-100 flex-grow overflow-auto">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          <UserList />
        </div>
      </Content>
      <Footer className="text-center shrink-0">
        User Management Dashboard ©{new Date().getFullYear()} Created with Ant
        Design & Tailwind CSS
      </Footer>
    </Layout>
  );
};

export default App;
