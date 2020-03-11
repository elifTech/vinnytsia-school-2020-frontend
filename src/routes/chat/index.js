import React from 'react';
import Chat from './Chat';
import Layout from '../../components/Layout';

export default function action() {
  return {
    chunks: ['chat'],
    component: (
      <Layout>
        <Chat />
      </Layout>
    ),
    title: 'Security Chat',
  };
}
