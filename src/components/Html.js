import map from 'lodash/map';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import serialize from 'serialize-javascript';
import config from '../config';
import Style from './Style';

/* eslint-disable react/no-danger */

function Html(props) {
  const { title, description, styles, scripts, app, children } = props;
  const appHtml = useMemo(() => ({ __html: children }), [children]);
  const serializedState = useMemo(
    () => ({ __html: `window.App=${serialize(app)}` }),
    [app],
  );
  const ga = useMemo(
    () => ({
      __html:
        'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
        `ga('create','${config.analytics.googleTrackingId}','auto');ga('send','pageview')`,
    }),
    [],
  );
  return (
    <html className="no-js" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {map(scripts, script => (
          <link key={script} rel="preload" href={script} as="script" />
        ))}
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/icon.png" />
        {map(styles, style => (
          <Style cssText={style.cssText} id={style.id} key={style.id} />
        ))}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={appHtml} />
        <script dangerouslySetInnerHTML={serializedState} />
        {map(scripts, script => (
          <script key={script} src={script} />
        ))}
        {config.analytics.googleTrackingId && (
          <script dangerouslySetInnerHTML={ga} />
        )}
        {config.analytics.googleTrackingId && (
          <script
            src="https://www.google-analytics.com/analytics.js"
            async
            defer
          />
        )}
      </body>
    </html>
  );
}

Html.propTypes = {
  app: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
  styles: PropTypes.arrayOf(
    PropTypes.shape({
      cssText: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ),
  title: PropTypes.string.isRequired,
};

Html.defaultProps = {
  scripts: [],
  styles: [],
};
Html.whyDidYouRender = true;
export default React.memo(Html);
