import React from 'react';
import Layout from '../../components/Layout';
import WindowSensors from './WindowSesors';

const title = 'Window Sensors';

export default function action() {
  return {
    chunks: ['window-sensors'],
    component: (
      <Layout>
        <WindowSensors title={title} />
      </Layout>
    ),
    title,
  };
}
