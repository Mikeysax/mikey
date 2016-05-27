import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import NotFound from '../../src/js/components/NotFound';

describe('NotFound Component', () => {

  it('Renders Not Found in a h1', () => {
    const notFoundComponent = shallow(<NotFound />);
    expect(notFoundComponent.find('h1').text()).to.equal('Not Found');
  });

});
