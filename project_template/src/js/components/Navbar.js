import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default text-center" role="navigation">
          <a href="https://www.npmjs.com/package/mikey">
            Mikey
          </a>
          &nbsp;
          was built by
          &nbsp;
          <a href="http://mikeysax.com">
            Mikeysax
          </a>
          &nbsp;Made with love for the <a href="http://theFirehoseProject.com">Firehose Project</a>
        </nav>
      </div>
    );
  }
}
