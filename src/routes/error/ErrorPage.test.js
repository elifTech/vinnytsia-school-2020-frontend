import React from 'react';
import { create } from 'react-test-renderer';
import ErrorPage from './ErrorPage';

describe('dashboard route', () => {
  it('matches the snapshot', () => {
    expect.assertions(1);
    const link = create(<ErrorPage />);
    expect(link.toJSON()).toMatchInlineSnapshot(`
      <div>
        <h1>
          Error
        </h1>
        <p>
          Sorry, a critical error occurred on this page.
        </p>
      </div>
    `);
  });
});
