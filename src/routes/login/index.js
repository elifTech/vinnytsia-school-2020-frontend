import React from 'react';
import Login from './Login';
import Layout from '../../components/Layout/Layout';

export default function action() {
  return {
    chunks: ['login'],
    component: (
      <Layout>
        <Login />
      </Layout>
    ),
    title: 'Login',
  };
}
