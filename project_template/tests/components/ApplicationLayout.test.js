import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ApplicationLayout from '../../src/js/components/ApplicationLayout';

describe('ApplicationLayout Component', () => {
  var appLayoutComponent

  beforeEach(() => {
    appLayoutComponent = shallow(<ApplicationLayout />);
  });

  it('Renders 1 div Tags', () => {
    expect(appLayoutComponent.find('div')).to.have.length(2);
  });
});
