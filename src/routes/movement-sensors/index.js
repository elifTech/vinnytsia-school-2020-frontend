import React from 'react';
import Sensors from './Sensors';
import Layout from '../../components/Layout/Layout';

export default function action() {
  return {
    chunks: ['movement-sensors'],
    component: (
      <Layout>
        <Sensors />
      </Layout>
    ),
    title: 'Movement sensors',
  };
}
