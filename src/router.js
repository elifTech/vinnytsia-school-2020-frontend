import isFunction from 'lodash/isFunction';
import UniversalRouter from 'universal-router';
import routes from './routes';

const router = new UniversalRouter(routes, {
  async resolveRoute(context, parameters) {
    if (isFunction(context.route.load)) {
      const action = await context.route.load();
      return action.default(context, parameters);
    }
    if (isFunction(context.route.action)) {
      return context.route.action(context, parameters);
    }
    return undefined;
  },
});

export default router;
