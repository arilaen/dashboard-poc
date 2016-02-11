import React, { PropTypes } from 'react'; /* eslint no-unused-vars:0*/

import classNames from 'classnames';

export default class ProjectSummary extends React.Component {

  render() {
    const { data } = this.props;
    const { title, subtitle, projectStatus, tabData } = data;

    const statusBarClassNames = classNames('colored-status-bar', {
      'at-risk' : projectStatus === 'atRisk',
      'a-concern' : projectStatus === 'aConcern',
      'on-target' : projectStatus === 'onTarget'
    });

    const dataToDisplay = tabData.map((item, i) =>
      <div className="data-block" key={i}>
        <h2 className="value">{item.value}</h2>
        <h4 className="label">{item.label}</h4>
      </div>
    );

    return (
      <div className="project-summary">
      <div className={statusBarClassNames}> </div>
      <div className="header">
          <h4 className="title">{ title }</h4>
          <h5 className="subtitle">{ subtitle }</h5>
        </div>
        <div className="table-data"> { dataToDisplay } </div>
      </div>
    );
  }
}

ProjectSummary.propTypes = {
  data: React.PropTypes.object.isRequired
};
