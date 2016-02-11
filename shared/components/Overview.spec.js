import React from 'react';
import ReactDOM  from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Overview from './Overview';

describe('Overview Component', () => {
  const data = {
    "title": "Year To Date Revenue",
    "value": "$2.25M",
    "date": "5/11/15",
    "tabData": [
      {
        "label": "2015 Projected",
        "value": "$6.10M",
        "variance" : false
      },
      {
        "label": "Progress",
        "value": "36%",
        "variance" : false
      }
    ]
  }

	function renderComponent() {
    	const component = TestUtils.renderIntoDocument(<Overview data={data}/>);
    	return ReactDOM.findDOMNode(component);
  	}

	it('should render', () => {
		const component = renderComponent();
		expect(component.className).toBe('overview');
		expect(component.querySelectorAll('.overview .label').length).toEqual(3);
		expect(component.querySelectorAll('.overview .value').length).toEqual(3);
		expect(component.querySelectorAll('.overview .date').length).toEqual(1);
	});

	it('should print the correct labels & values', function () {
		const component = renderComponent();
		const label = component.querySelectorAll('.label')[0];
		const value = component.querySelectorAll('.value')[0];
		const date = component.querySelectorAll('.date')[0].children[0];

		expect(label.innerHTML).toEqual('Year To Date Revenue');
		expect(value.innerHTML).toEqual('$2.25M');
		expect(date.innerHTML).toEqual('as of 5/11/15');
	});
});
