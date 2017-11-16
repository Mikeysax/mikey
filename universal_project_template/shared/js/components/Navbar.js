import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <a href="https://www.npmjs.com/package/mikey">
            Mikey
          </a>
          &nbsp;
          was built by
          &nbsp;
          <a href="http://mikeysax.com">
            Mikeysax
          </a>
        </nav>
      </div>
    );
  }
}
