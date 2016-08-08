import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import NotFound from '../../src/js/components/NotFound';

describe('NotFound Component', () => {
  var notFoundComponent;

  beforeEach(() => {
    notFoundComponent = shallow(<NotFound />);
  });

  it('Renders Not Found in a h1 Tag', () => {
    expect(notFoundComponent.find('h1').text()).to.equal('Not Found');
  });

  it('Renders div Tag', () => {
    expect(notFoundComponent.find('div')).to.have.length(1);
  });

});
