import React, { PropTypes } from 'react'; /* eslint no-unused-vars:0 */

import Variance from './Variance';

export default class OverviewTabs extends React.Component {
  render() {
    const { data } = this.props;

    const classCount = data.length === 2 ?
    ' -half' :
    ' -third';

    const items = data.map((item, i) => {
      return (
        <span key={i} className={`tab${classCount}`}>
          <p className="label">{item.label}:</p>
          <p className="value">
          {item.variance ? <Variance data={item.value} weight="strong" /> : item.value}
          </p>
        </span>
      );
    });

    return (
      <div className="overview-tabs"> { items } </div>
    );
  }
}

OverviewTabs.propTypes = {
  data: React.PropTypes.array.isRequired
};
