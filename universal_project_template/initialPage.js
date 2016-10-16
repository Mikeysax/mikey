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
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
          {Object.keys(assets.assets).length !== 0 ?
            Object.keys(assets.assets).map((style, key) =>
              <style dangerouslySetInnerHTML={{__html: require(`${style}`)._style}} key={key}/>
            )
            :
            require('fs').readdir('./shared/css', (err, files) => {
              files.map((file, key) => {
                 <style dangerouslySetInnerHTML={{__html: require(`./shared/css/${file}`)}} key={key}/>
              })
            })
          }
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
