import React from 'react';
import OnlineStatus from './Online-status';
import Layout from '../../components/Layout';

export default function action() {
  return {
    chunks: ['online-status'],
    component: (
      <Layout>
        <OnlineStatus />
      </Layout>
    ),
    title: 'Online-status',
  };
}
