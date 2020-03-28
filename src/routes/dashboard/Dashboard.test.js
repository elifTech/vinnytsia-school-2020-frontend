import { render } from 'enzyme';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Dashboard from './Dashboard';

const mockStore = configureStore([]);

describe('dashboard route', () => {
  it('matches the snapshot', () => {
    expect.assertions(1);
    const store = mockStore({});
    const dashboard = render(
      <ReduxProvider store={store}>
        <Dashboard />
      </ReduxProvider>,
    );
    expect(dashboard).toMatchInlineSnapshot(`
      <div
        class="root"
      >
        <div
          class="container"
        >
          Smart Security Dashboard
        </div>
        <form
          class="root"
        >
          <label
            class="form-group"
            for="dc"
          >
            Your favourite DC superhero
            <input
              class="form-control form-control"
              name="dc"
              type="text"
            />
          </label>
          <label
            class="form-group"
            for="marvel"
          >
            Your favourite Marvel superhero
            <input
              class="form-control"
              name="marvel"
              type="text"
            />
          </label>
          <button
            class="btn btn-primary"
            type="submit"
          >
            Submit
          </button>
        </form>
        <pre />
      </div>
    `);
  });
});
