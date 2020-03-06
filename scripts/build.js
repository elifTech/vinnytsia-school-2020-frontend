import includes from 'lodash/includes';
import run from './run';
import clean from './clean';
import copy from './copy';
import bundle from './bundle';
import render from './render';

/**
 * Compiles the project from source files into a distributable
 * format and copies it to the output (build) folder.
 */
export default async function build() {
  await run(clean);
  await run(copy);
  await run(bundle);

  if (includes(process.argv, '--static')) {
    await run(render);
  }
}
