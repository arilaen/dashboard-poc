import React from 'react';
import ReactDOM  from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ProjectSummary from './ProjectSummary';

describe('ProjectSummary Component', () => {
	function renderComponent() {
    const data = {
      title: "ElSevier",
      subtitle: "[SOW1 CO4] ElSevier Design and Development",
      tabData: [
        {
          label: "complete",
          value: "75%",
        },
        {
          label: "CPI",
          value: ".94",
        },
        {
          label: "Budget",
          value: "$1,123,345",
        },
        {
          label: "Variance",
          value: "$10,321",
        }
      ]
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
    expect(value).toBe('$10,321');
    expect(label).toBe('Variance');
  });
});
