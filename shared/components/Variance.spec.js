import React from 'react';
import ReactDOM  from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Variance from './Variance';

describe('Variance Component', () => {
	describe('with a negative value', function () {

		function renderComponent() {
	    	const component = TestUtils.renderIntoDocument(<Variance data='-10' weight="normal"/>);
	    	return ReactDOM.findDOMNode(component);
	  	}

		it('should render', () => {
			const component = renderComponent();
			expect(component.className).toContain('variance');
		});

		it('should remove minus sign if present', () => {
			const component = renderComponent();
			expect(component.innerHTML).toBe('10% ');
		});

		it('should include a down-arrow icon', () => {
			const component = renderComponent();
			expect(component.className).toBe('variance -down');
		});
	});

	describe('with a positive value', () => {

		function renderComponent() {
	    	const component = TestUtils.renderIntoDocument(<Variance data='10' weight="normal"/>);
	    	return ReactDOM.findDOMNode(component);
	  	}

	  	it('should append a %', () => {
			const component = renderComponent();
			expect(component.innerHTML).toContain('% ');
		});

		it('should include a down-arrow icon', () => {
			const component = renderComponent();
			expect(component.className).toBe('variance -up');
		});
	});

	describe('with a strong weight', () => {

		function renderComponent() {
	    	const component = TestUtils.renderIntoDocument(<Variance data='2' weight="strong"/>);
	    	return ReactDOM.findDOMNode(component);
	  	}

	  	it('should print 2%', () => {
			const component = renderComponent();
			expect(component.innerHTML).toBe('2% ');
		});

		it('should have a class to add emphasis', () => {
			const component = renderComponent();
			expect(component.className).toBe('variance -strong -up');
		});
	});
});
