import React, { PropTypes } from 'react'; /* eslint no-unused-vars:0 */

export default class AtGlance extends React.Component {

  render() {
    const { children } = this.props;

    return (
      <div className="at-glance-container">
        <h1>Cantina At A Glance</h1>
        <div className="dashboard-layout">
          <div className="dashboard-row">
            <div className="dashboard-col -single">
            </div>
            <div className="dashboard-col -double">
            </div>
          </div>
          <div>
            <div className="dashboard-col -single">
            </div>
            <div className="dashboard-col -single">
            </div>
            <div className="dashboard-col -single">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AtGlance.propTypes = {
  children: React.PropTypes.object
};
