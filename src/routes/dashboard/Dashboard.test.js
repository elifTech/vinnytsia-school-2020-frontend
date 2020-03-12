import { render } from 'enzyme';
import React from 'react';
import Dashboard from './Dashboard';

describe('dashboard route', () => {
  it('matches the snapshot', () => {
    expect.assertions(1);
    const link = render(<Dashboard />);
    expect(link).toMatchInlineSnapshot(`
      <div
        class="root"
      >
        <div
          class="container"
        >
          Smart Security Dashboard
        </div>
      </div>
    `);
  });
});
