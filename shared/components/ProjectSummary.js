import React, { PropTypes } from 'react'; /* eslint no-unused-vars:0*/
import DataBlock from './DataBlock';

import classNames from 'classnames';

export default class ProjectSummary extends React.Component {

  renderTableData() {
    const { percentComplete, cpi, budget, variance } = this.props.data;
    const arr = [];

    return (
      <div className="table-data">
        <DataBlock label="complete" value={percentComplete} type="percent" key="0" />
        <DataBlock label="cpi" value={cpi} type="number" key="1" />
        <DataBlock label="budget" value={budget} type="currency" key="2" />
        <DataBlock label="variance" value={variance} type="variance" key="3" />
      </div>
    );
  }

  render() {
    const { data } = this.props;
    const { companyName, projectName, projectStatus } = data;

    const statusBarClassNames = classNames('colored-status-bar', {
      'at-risk' : projectStatus === 'atRisk',
      'a-concern' : projectStatus === 'aConcern',
      'on-target' : projectStatus === 'onTarget'
    });

    return (
      <div className="project-summary">
        <div className={statusBarClassNames}> </div>
        <div className="header">
          <h4 className="title">{ companyName }</h4>
          <h5 className="subtitle">{ projectName }</h5>
        </div>
        { this.renderTableData() }
      </div>
    );
  }
}

ProjectSummary.propTypes = {
  data: React.PropTypes.object.isRequired
};
