import React from 'react';
import { create } from 'react-test-renderer';
import Dashboard from './Dashboard';

describe('dashboard route', () => {
  it('matches the snapshot', () => {
    expect.assertions(1);
    const link = create(<Dashboard />);
    expect(link.toJSON()).toMatchInlineSnapshot(`
      <div
        className="root"
      >
        <div
          className="container"
        >
          Smart Security Dashboard
        </div>
      </div>
    `);
  });
});
