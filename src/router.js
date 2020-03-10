import get from 'lodash/get';
import invoke from 'lodash/invoke';
import isFunction from 'lodash/isFunction';
import UniversalRouter from 'universal-router';
import routes from './routes';

const router = new UniversalRouter(routes, {
  async resolveRoute(context, parameters) {
    if (isFunction(get(context, 'route.load'))) {
      const action = await invoke(context, 'route.load');
      return invoke(action, 'default', context, parameters);
    }
    if (isFunction(get(context, 'route.action'))) {
      return invoke(context, 'route.action', context, parameters);
    }
    return undefined;
  },
});

export default router;
