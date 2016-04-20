import React from 'react';
import history from '../../helpers/history';

export default class ApplicationLayout extends React.Component {
  render(){
    return (
      <div>
        <div className="main-container">
          <nav className="navbar navbar-default text-center" role="navigation">
            <a href="javascript:void(0);">
              \\Mikey\\
            </a>
            was built by
            <a href="http://mikeysax.com">
              \\Mikeysax\\
            </a>
              Made with love for the <a href="http://theFirehoseProject.com">Firehose Project</a>
          </nav>

          {this.props.children}
        </div>
      </div>
    );
  }
}
