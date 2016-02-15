import React, { PropTypes } from 'react'; /* eslint no-unused-vars:0*/
import { formattedNumber } from '../utils/number';

export default class DataBlock extends React.Component {

  render() {
    const { label, value, type } = this.props;

    return (
      <div className="data-block">
        <h2 className="value">{formattedNumber(value, type)}</h2>
        <h4 className="label">{label}</h4>
      </div>
    );
  }
}

DataBlock.propTypes = {
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.number,
  type: React.PropTypes.string
};
