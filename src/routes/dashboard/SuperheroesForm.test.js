import { render } from 'enzyme';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SuperheroesForm from './SuperheroesForm';

const mockStore = configureStore([]);

describe('superheroes form', () => {
  it('matches the snapshot', () => {
    expect.assertions(1);
    const store = mockStore({});
    const superheroesForm = render(
      <ReduxProvider store={store}>
        <SuperheroesForm />
      </ReduxProvider>,
    );
    expect(superheroesForm).toMatchInlineSnapshot(`
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
    `);
  });
});
