import React, { PropTypes } from 'react'; /* eslint no-unused-vars:0 */
import { removeHyphen } from '../utils/strings';

import classNames from 'classnames';

export default class Variance extends React.Component {
  render() {
    const { data, weight } = this.props;
    const value = removeHyphen(`${data}% `);

    const computedClasses = classNames('variance', {
      '-strong' : weight === 'strong',
      '-up' : data > 0,
      '-down' : data < 0
    });

    return (
      <span className={computedClasses}>{value}</span>
    );
  }
}

Variance.propTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]).isRequired,
  weight: React.PropTypes.string.isRequired
};

Variance.defaultProps = {
  weight: 'normal'
};
