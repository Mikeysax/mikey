import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Navbar from '../../src/js/components/Navbar';

describe('Navbar Component', () => {
  var navbarComponent;

  beforeEach(() => {
    navbarComponent = shallow(<Navbar />);
  });

  it('Renders 3 anchor Tags', () => {
    expect(navbarComponent.find('a')).to.have.length(3);
  });

  it('Renders div Tag', () => {
    expect(navbarComponent.find('div')).to.have.length(1);
  });

  it('Renders nav Tag', () => {
    expect(navbarComponent.find('nav')).to.have.length(1);
  });

});
