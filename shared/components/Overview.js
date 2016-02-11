import React, { PropTypes } from 'react'; /* eslint no-unused-vars:0*/

import OverviewTabs from './OverviewTabs';
import Variance from './Variance';

export default class Overview extends React.Component {

  render() {
    const { data } = this.props;
    const { title, value, date, amount, tabData } = data;
    const string = `as of ${ date }`;

    return (
      <div className="overview">
        <h4 className="label">{ title }</h4>
        <h1 className="value">{ value }</h1>
        <h5 className="date">
          {amount ? <Variance data={amount} /> : null}
          { string }
        </h5>
        <OverviewTabs data={tabData}/>
      </div>
    );
  }
}

Overview.propTypes = {
  data: React.PropTypes.object.isRequired
};
