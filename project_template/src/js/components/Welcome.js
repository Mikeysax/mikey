import React from 'react';

export default class Welcome extends React.Component {

  render() {
    return (
      <div>
        <h1 className="text-center">
          Mikey Welcomes You!
        </h1>

        <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h2 className="text-center">
            Use the latest web development technologies.
          </h2>
        </div>
      </div>
    );
  }
};
