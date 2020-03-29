import React from 'react';
import MovementDetection from './MovementDetection';
import Layout from '../../components/Layout/Layout';

export default function action() {
  return {
    chunks: ['movement-detection'],
    component: (
      <Layout>
        <MovementDetection />
      </Layout>
    ),
    title: 'Movement detection',
  };
}
