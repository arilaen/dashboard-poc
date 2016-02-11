import React, { PropTypes } from 'react'; /* eslint no-unused-vars:0 */

export default class ToggableHeader extends React.Component {
  render() {
    const { value, children, onToggleClick, className } = this.props;
    const angleDown =
      '<svg class="icon icon-angle-down"><use xlink:href="#icon-angle-down"></use></svg>';
    const upCarret =
      '<svg class="icon icon-navicon"><use xlink:href="#icon-navicon"></use></svg>';

    return (
      <div className={className}>
        <h1 className="value">{value}</h1>
        <div className="toggle" onClick={this.props.onToggleClick}>
          <span dangerouslySetInnerHTML={{ __html: angleDown }} />
        </div>
        <div className="children">
        { children }
        </div>
      </div>
    );
  }
}

ToggableHeader.propTypes = {
  value: React.PropTypes.string.isRequired,
  children: React.PropTypes.object,
  onToggleClick: React.PropTypes.func,
  className: React.PropTypes.string
};
