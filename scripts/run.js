import isUndefined from 'lodash/isUndefined';
import replace from 'lodash/replace';
/* eslint-disable promise/prefer-await-to-callbacks */
/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable unicorn/no-process-exit */
export function format(time) {
  return replace(time.toTimeString(), /.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

export default function run(fn, options) {
  const task = isUndefined(fn.default) ? fn : fn.default;
  const start = new Date();
  console.info(
    `[${format(start)}] Starting '${task.name}${
      options ? ` (${options})` : ''
    }'...`,
  );
  return task(options).then(resolution => {
    const end = new Date();
    const time = end.getTime() - start.getTime();
    console.info(
      `[${format(end)}] Finished '${task.name}${
        options ? ` (${options})` : ''
      }' after ${time} ms`,
    );
    return resolution;
  });
}

if (require.main === module && process.argv.length > 2) {
  // eslint-disable-next-line no-underscore-dangle
  delete require.cache[__filename];

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const module = require(`./${process.argv[2]}.js`).default;

  run(module).catch(error => {
    console.error(error.stack);
    process.exit(1);
  });
}
