import React from 'react';
import { Layout } from 'antd';
import { AppHeader, AppMain, SiderBar, AppBreadcrumb } from './components/index'
const Index = () => {
    return (
        <Layout id='components-layout'>
            <SiderBar />
            <Layout className="site-layout">
                <AppHeader />
                <AppBreadcrumb />
                <AppMain />
            </Layout>
        </Layout>
    );
};

export default Index;