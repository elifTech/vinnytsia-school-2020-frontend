import React from 'react';
import Layout from '../../components/Layout';
import WindowsProtection from './WindowsProtection';

const title = 'Windows protection';

export default function action() {
  return {
    chunks: ['windows-protection'],
    component: (
      <Layout>
        <WindowsProtection title={title} />
      </Layout>
    ),
    title,
  };
}
