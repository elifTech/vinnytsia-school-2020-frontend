import React from 'react';
import { create } from 'react-test-renderer';
import NotFound from './NotFound';

describe('dashboard route', () => {
  it('matches the snapshot', () => {
    expect.assertions(1);
    const link = create(<NotFound title="Page Not Found" />);
    expect(link.toJSON()).toMatchInlineSnapshot(`
      <div
        className="root"
      >
        <div
          className="container"
        >
          <h1>
            Page Not Found
          </h1>
          <p>
            Sorry, the page you were trying to view does not exist.
          </p>
        </div>
      </div>
    `);
  });
});
