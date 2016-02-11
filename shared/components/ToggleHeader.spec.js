import React from 'react';
import ReactDOM  from 'react-dom';
import classNames from 'classnames';
import TestUtils from 'react-addons-test-utils';
import ToggableHeader from './ToggableHeader';

describe('ToggleHeader Component', () => {
  function renderComponent() {
    const component = TestUtils.renderIntoDocument(
      <ToggableHeader
      value="Test Header"
      className={ classNames('toggable-header', { hide : false })} />
    );
    return ReactDOM.findDOMNode(component);
  }

  describe('On Render', () => {
    const component = renderComponent();
    it('should print the correct value', () => {
      const value = component.querySelectorAll('.value')[0].innerHTML;
      expect(value).toBe('Test Header');
    });

    it('should display children', () => {
      expect(component.className).toEqual('toggable-header');
    });
  });
});
