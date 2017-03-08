import React from 'react';
import serialize from 'serialize-javascript';

export default class InitialPage extends React.Component {
  render() {
    const {assets, component, store} = this.props;
    const content = component ? component : '';

    return (
      <html lang="en-us">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="google-site-verification" content="-rCSvwdWGopC1M4YSnFiEJoXwBuefSmRtY9-FskxfHg" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
          <script src="https://use.fontawesome.com/2778da33c5.js"></script>
          {/* For Production */}
          {Object.keys(assets.styles).map((style, i) =>
            <link href={assets.styles[style]} key={i} media="screen, projection" rel="stylesheet" type="text/css"/>
          )}
          {/* For Development */}
          { Object.keys(assets.styles).length === 0 ? Object.keys(assets.assets).map((style, key) =>
            <style dangerouslySetInnerHTML={{__html: require(`${style}`)._style}} key={key}/>
          ) : null }
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: content}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__=${serialize(store.getState())};`}} charSet="UTF-8"/>
          <script src={assets.javascript.main} charSet="UTF-8"/>
        </body>
      </html>
    );
  }
}
