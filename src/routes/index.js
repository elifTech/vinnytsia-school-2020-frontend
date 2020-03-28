import invoke from 'lodash/invoke';
import nth from 'lodash/nth';
// import cookie from 'isomorphic-cookie';

const routes = [
  {
    action({ next }) {
      return next();
    },
    children: [
      {
        load: () => import('./login'),
        path: '/login',
      },
    ],
    path: '',
  },
  {
    async action({ next }) {
      // Execute each child route until one of them return the result
      const route = await next();
      if (
        // !cookie.load('token')
        false // at this time false!!!
      ) {
        route.redirect = '/login';
      }

      // Provide default values for title, description etc.
      route.title = `${route.title || 'Untitled Page'}`;
      route.description = route.description || '';

      return route;
    },
    // Keep in mind, routes are evaluated in order
    children: [
      {
        load: () => import(/* webpackChunkName: 'dashboard' */ './dashboard'),
        path: '',
      },
      {
        load: () => import(/* webpackChunkName: 'login' */ './login'),
        path: '/login',
      },
      // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
      {
        load: () => import(/* webpackChunkName: 'chat' */ './chat'),
        path: '/chat',
      },
      {
        load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
        path: '(.+)',
      },
    ],
    path: '',
    protected: true,
  },
];

// The error page is available by permanent url for development mode
if (__DEV__) {
  invoke(nth(routes, 1), 'children.unshift', {
    // eslint-disable-next-line global-require
    action: require('./error').default,
    path: '/error',
  });
}

export default routes;
