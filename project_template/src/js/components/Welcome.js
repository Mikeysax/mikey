import React from 'react';
import react_png from '../../img/react.png';
import webpack_png from '../../img/webpack.png';
import bootstrap_png from '../../img/bootstrap.png';
import redux_png from '../../img/redux.png';
import sass_png from '../../img/sass.png';
import lodash_png from '../../img/lodash.png';
import babel_png from '../../img/babel.png';
import es6_png from '../../img/es6.png';

export default class Welcome extends React.Component {
  render() {
    return (
      <div>
        <h1 className="text-center">Mikey Welcomes You</h1>

        <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h2>Use the latest web development technologies.</h2>
          <p className="text-center">
            Leverage the cutting edge technologies to build web applications that transcend the web.
          </p>

          <div className="text-center">
            <img src={bootstrap_png} className="tech-icon-wide" />

            <img src={react_png} className="tech-icon" />
            <img src={webpack_png} className="tech-icon" />
            <img src={redux_png} className="tech-icon" />
            <img src={sass_png} className="tech-icon" />
            <img src={lodash_png} className="tech-icon" />
            <img src={babel_png} className="babel-icon" />
            <img src={es6_png} className="tech-icon" />
          </div>
        </div>
      </div>
    );
  }

}
