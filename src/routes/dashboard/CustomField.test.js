import { render } from 'enzyme';
import React from 'react';
import CustomField from './CustomField';

const customFieldInput = {
  name: 'name',
  onBlur: jest.fn(),
  onChange: jest.fn(),
  onDragStart: jest.fn(),
  onDrop: jest.fn(),
  onFocus: jest.fn(),
};
const customFieldMeta = {
  error: '',
  touched: false,
  warning: '',
};
describe('superheroes form', () => {
  it('matches the snapshot with html component', () => {
    expect.assertions(1);
    const customField = render(
      <CustomField input={customFieldInput} meta={customFieldMeta} />,
    );
    expect(customField).toMatchInlineSnapshot(`
      <label
        class="form-group"
        for="name"
      >
        <input
          class="form-control"
          name="name"
          type="text"
        />
      </label>
    `);
  });
  it('matches the snapshot with custom component', () => {
    expect.assertions(1);
    const link = render(
      <CustomField input={customFieldInput} meta={customFieldMeta} />,
    );
    expect(link).toMatchInlineSnapshot(`
      <label
        class="form-group"
        for="name"
      >
        <input
          class="form-control"
          name="name"
          type="text"
        />
      </label>
    `);
  });
});
