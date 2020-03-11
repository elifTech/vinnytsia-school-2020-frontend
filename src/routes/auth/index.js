import React from 'react';
import Auth from './Auth';
import Layout from '../../components/Layout';

export default function action() {
  return {
    chunks: ['auth'],
    component: (
      <Layout>
        <Auth />
      </Layout>
    ),
    title: 'Auth',
  };
}
