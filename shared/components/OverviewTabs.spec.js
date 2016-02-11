import React from 'react';
import ReactDOM  from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import OverviewTabs from './OverviewTabs';

describe('OverviewTabs Component', () => {

	describe('with two tabs', () => {
		function renderTwoTabComponent() {
        const data = {
          title: "Year To Date Revenue",
          value: "$2.25M",
          date: "5/11/15",
          tabData: [
            {
              label: "2015 Projected",
              value: "$6.10M",
              variance: false
            },
            {
              label: "Progress",
              value: "36%",
              variance : false
            }
          ]
        };

	    	const component = TestUtils.renderIntoDocument(<OverviewTabs data={data.tabData}/>);
	    	return ReactDOM.findDOMNode(component);
	  	};

		it('should render a two tab compenent', () => {
			const component = renderTwoTabComponent();
			const tabs = component.querySelectorAll('.value');

			expect(component.className).toBe('overview-tabs');
			expect(tabs.length).toBe(2);
		});

		it('should render the correct labels & values', () => {
			const component = renderTwoTabComponent();
			const label = component.children[1].children[0].children[0].innerHTML;
			const value = component.children[1].children[1].innerHTML;

			expect(label).toEqual('2015 Projected');
			expect(value).toEqual('$6.10M');
		});
	});

	describe('with three tabs', () => {
	  	function renderThreeTabComponent() {
        const data = {
          title: "Resource Utilization",
          value: "67%",
          amount: 10,
          date: "5/11/15",
          tabData: [
            {
              label: "PM 52%",
              value: 20,
              variance: true
            },
            {
              label: "TECH 80%",
              value: 10,
              variance: true
            },
            {
              label: "XD 62%",
              value: -3,
              variance: true
            }
          ]
        };
	    	const component = TestUtils.renderIntoDocument(<OverviewTabs data={data.tabData}/>);
	    	return ReactDOM.findDOMNode(component);
	  	};

		it('should render a three tab compenent', () => {
			const component = renderThreeTabComponent();
			const tabs = component.querySelectorAll('.value');
			expect(component.className).toBe('overview-tabs');
			expect(tabs.length).toBe(3);
		});

		it('should render the correct labels & values', () => {
			const component = renderThreeTabComponent();
			const label = component.children[2].children[0].children[0].innerHTML;
			expect(label).toEqual('TECH 80%');
		});
	});
});
