import React from 'react';
import { create } from 'react-test-renderer';
import Link from '.';

describe('link to google', () => {
  it('matches the snapshot', () => {
    expect.assertions(1);
    const link = create(<Link to="https://google.com">Google</Link>);
    expect(link.toJSON()).toMatchInlineSnapshot(`
      <a
        className=""
        href="https://google.com"
        onClick={[Function]}
        target="_blank"
      >
        Google
      </a>
    `);
  });
});

describe('link to dashboard', () => {
  it('matches the snapshot', () => {
    expect.assertions(1);
    const link = create(<Link to="/">Home</Link>);
    expect(link.toJSON()).toMatchInlineSnapshot(`
<a
  className=""
  href="/"
  onClick={[Function]}
>
  Home
</a>
`);
  });
  it('accepts className prop', () => {
    expect.assertions(1);
    const link = create(
      <Link className="custom-class" to="/">
        Home
      </Link>,
    );
    expect(link.toJSON()).toMatchInlineSnapshot(`
<a
  className="custom-class"
  href="/"
  onClick={[Function]}
>
  Home
</a>
`);
  });
});
