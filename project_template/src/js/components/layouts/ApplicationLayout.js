import React from 'react';

export default class ApplicationLayout extends React.Component {
  render(){
    return (
      <div>
        <div className="main-container">
          <nav className="navbar navbar-default text-center" role="navigation">
            <a href="javascript:void(0);">
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

          {this.props.children}

        </div>
      </div>
    );
  }
}
