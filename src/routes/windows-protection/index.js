import React from 'react';
import Layout from '../../components/Layout';
import WindowProtection from './WindowProtection';

const title = 'Window protection';

export default function action() {
  return {
    chunks: ['windows-protection'],
    component: (
      <Layout>
        <WindowProtection title={title} />
      </Layout>
    ),
    title,
  };
}
