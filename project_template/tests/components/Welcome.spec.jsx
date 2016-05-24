import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import { expect } from 'chai';
import Welcome from '../../src/js/components/Welcome';

describe('Welcome', () => {

  it('renders Mikey Welcomes You! in a h1 tag', () => {
    const component = renderIntoDocument(
      <Welcome />
    );
    const h1 = scryRenderedDOMComponentsWithTag(component, 'h1');

    expect(h1[0].textContent).to.equal('Mikey Welcomes You!');
  });

  it('renders Use the latest web development technologies. in a h2 tag', () => {
    const component = renderIntoDocument(
      <Welcome />
    );
    const h1 = scryRenderedDOMComponentsWithTag(component, 'h2');

    expect(h1[0].textContent).to.equal('Use the latest web development technologies.');
  });
});
