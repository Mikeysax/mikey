import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import { expect } from 'chai';
import Navbar from '../../src/js/components/Navbar';

describe('Navbar', () => {

  it('renders 3 anchor tags', () => {
    const component = renderIntoDocument(
      <Navbar />
    );
    const anchors = scryRenderedDOMComponentsWithTag(component, 'a');

    expect(anchors.length).to.equal(3);
  });

});
