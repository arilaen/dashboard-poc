import React from 'react';
import ReactDOM  from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ProjectSummary from './ProjectSummary';

describe('ProjectSummary Component', () => {
	function renderComponent() {
    const data = {
      budget: 1000000,
      companyName: "ElSevier",
      cpi: 0.94,
      dashboardDetailApiURL: "https://cantina-intranet/projects/9619519",
      harvestID: 9619519,
      harvestURL: "https://cantina.harvestapp.com/projects/9619519",
      percentComplete: 75,
      projectName: "[SOW1 CO4] ElSevier Design and Development",
      projectStatus: "onTarget",
      projectedVariance: 10000,
      stats: {
        Budget: "$1000000",
        cpi: 0.94,
        percent: "75%",
        variance: "$10000",
      }
    };
  	const component = TestUtils.renderIntoDocument(<ProjectSummary data={data}/>);
  	return ReactDOM.findDOMNode(component);
	}

	it('should render', () => {
		const component = renderComponent();
		expect(component.className).toBe('project-summary');
	});

  it('should print the correct title & subtitle', function () {
    const component = renderComponent();
    const title = component.querySelectorAll('.title')[0].innerHTML;
    const subtitle = component.querySelectorAll('.subtitle')[0].innerHTML;
    expect(title).toBe('ElSevier');
    expect(subtitle).toBe('[SOW1 CO4] ElSevier Design and Development');
  });

  it('should print the correct number of data points', function () {
    const component = renderComponent();
    const value = component.querySelectorAll('.value');
    const label = component.querySelectorAll('.label');
    expect(value.length).toBe(4);
    expect(label.length).toBe(4);
  });

  it('should print the correct data', function () {
    const component = renderComponent();
    const value = component.querySelectorAll('.value')[3].innerHTML;
    const label = component.querySelectorAll('.label')[3].innerHTML;
    expect(value).toBe('$10000');
    expect(label).toBe('variance');
  });
});
