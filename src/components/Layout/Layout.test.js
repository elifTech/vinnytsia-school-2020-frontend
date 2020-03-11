import React from 'react';
import { create } from 'react-test-renderer';
import Layout from '.';

describe('layout', () => {
  it('matches the snapshot', () => {
    expect.assertions(1);
    const link = create(
      <Layout>
        <h1>Hello!</h1>
      </Layout>,
    );
    expect(link.toJSON()).toMatchInlineSnapshot(`
      <div>
        <h1>
          Hello!
        </h1>
      </div>
    `);
  });
});
